// convex/certificates.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

// ---------- helpers ----------
function hexLower(s?: string | null) {
  return (s ?? "").toLowerCase();
}
function norm(s?: string | null) {
  return (s ?? "").trim();
}
async function requireAuthorityOrAdmin(ctx: any, clerkUserId: string, orgId: Id<"orgs">) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok = roles.includes("ADMIN") || roles.includes("AUTHORITY");
  if (!ok) throw new Error("Insufficient permissions");
}
async function getUserByClerk(ctx: any, clerkUserId: string) {
  const u = await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q: any) => q.eq("clerkUserId", clerkUserId))
    .unique();
  if (!u) throw new Error("User not found");
  return u;
}

// ========================== ISSUE / UPSERT ==========================

/**
 * Issue a certificate anchored to a retirement (retireId) and batch.
 * Uniqueness keyed by `publicSlug` (indexed) — if slug exists, we patch.
 */
export const issue = mutation({
  args: {
    clerkUserId: v.string(),
    retireId: v.id("retirements"),
    batchId: v.id("batches"),
    buyerOrg: v.optional(v.id("orgs")),
    claimRef: v.string(),
    amount: v.string(),     // decimal string
    pdfKey: v.string(),     // CID or external key
    pdfHash: v.string(),    // hex
    publicSlug: v.string(), // unique public slug
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, a) => {
    // Authorization: AUTHORITY or ADMIN in the producer org of the batch
    const batch = await ctx.db.get(a.batchId);
    if (!batch) throw new Error("Batch not found");
    await requireAuthorityOrAdmin(ctx, a.clerkUserId, batch.producerOrg);

    // resolve actor
    const actor = await getUserByClerk(ctx, a.clerkUserId);

    // check uniqueness by slug (indexed)
    const existing = await ctx.db
      .query("certificates")
      .withIndex("bySlug", q => q.eq("publicSlug", norm(a.publicSlug)))
      .unique();

    const doc = {
      retireId: a.retireId,
      batchId: a.batchId,
      buyerOrg: a.buyerOrg,
      claimRef: norm(a.claimRef),
      amount: norm(a.amount),
      pdfKey: norm(a.pdfKey),
      pdfHash: hexLower(a.pdfHash),
      createdAt: a.createdAt ?? Date.now(),
      createdBy: actor._id as Id<"users">,
      publicSlug: norm(a.publicSlug),
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc as any);
      return { id: existing._id, updated: true };
    }

    const id = await ctx.db.insert("certificates", doc as any);
    return { id, created: true };
  },
});

// lightweight edits

export const setBuyerOrg = mutation({
  args: { id: v.id("certificates"), buyerOrg: v.optional(v.id("orgs")) },
  handler: async (ctx, { id, buyerOrg }) => {
    await ctx.db.patch(id, { buyerOrg });
    return { ok: true };
  },
});

export const replacePdf = mutation({
  args: { id: v.id("certificates"), pdfKey: v.string(), pdfHash: v.string() },
  handler: async (ctx, { id, pdfKey, pdfHash }) => {
    await ctx.db.patch(id, { pdfKey: norm(pdfKey), pdfHash: hexLower(pdfHash) });
    return { ok: true };
  },
});

export const setSlug = mutation({
  args: { id: v.id("certificates"), publicSlug: v.string() },
  handler: async (ctx, { id, publicSlug }) => {
    // ensure slug uniqueness
    const existing = await ctx.db
      .query("certificates")
      .withIndex("bySlug", q => q.eq("publicSlug", norm(publicSlug)))
      .unique();
    if (existing && existing._id.toString() !== id.toString()) {
      throw new Error("publicSlug already in use");
    }
    await ctx.db.patch(id, { publicSlug: norm(publicSlug) });
    return { ok: true };
  },
});

// optional delete (rare; generally avoid deleting certificates)
export const remove = mutation({
  args: { clerkUserId: v.string(), id: v.id("certificates") },
  handler: async (ctx, { clerkUserId, id }) => {
    const cert = await ctx.db.get(id);
    if (!cert) return { ok: true };
    const batch = await ctx.db.get(cert.batchId as Id<"batches">);
    if (!batch) throw new Error("Parent batch missing");
    await requireAuthorityOrAdmin(ctx, clerkUserId, batch.producerOrg);
    await ctx.db.delete(id);
    return { ok: true };
  },
});

// ========================== VERIFY (PUBLIC) ==========================

/**
 * Public verifier — given slug and expected pdfHash, confirm certificate integrity.
 * Optionally also check `claimRef` and `amount`.
 */
export const verify = query({
  args: {
    publicSlug: v.string(),
    pdfHash: v.string(),
    claimRef: v.optional(v.string()),
    amount: v.optional(v.string()),
  },
  handler: async (ctx, { publicSlug, pdfHash, claimRef, amount }) => {
    const cert = await ctx.db
      .query("certificates")
      .withIndex("bySlug", q => q.eq("publicSlug", norm(publicSlug)))
      .unique();
    if (!cert) return { ok: false, reason: "NOT_FOUND" };
    if (cert.pdfHash !== hexLower(pdfHash)) return { ok: false, reason: "HASH_MISMATCH" };
    if (claimRef && norm(cert.claimRef) !== norm(claimRef)) return { ok: false, reason: "CLAIMREF_MISMATCH" };
    if (amount && norm(cert.amount) !== norm(amount)) return { ok: false, reason: "AMOUNT_MISMATCH" };
    return { ok: true, id: cert._id, batchId: cert.batchId, retireId: cert.retireId, buyerOrg: cert.buyerOrg };
  },
});

// ========================== QUERIES ==========================

export const get = query({
  args: { id: v.id("certificates") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const getBySlug = query({
  args: { publicSlug: v.string() },
  handler: async (ctx, { publicSlug }) => {
    return await ctx.db
      .query("certificates")
      .withIndex("bySlug", q => q.eq("publicSlug", norm(publicSlug)))
      .unique();
  },
});

export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = await ctx.db
      .query("certificates")
      .withIndex("byBatch", q => q.eq("batchId", batchId))
      .take(limit ?? 100);
    // stable display: newest first, then slug
    rows.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0) || (a.publicSlug ?? "").localeCompare(b.publicSlug ?? ""));
    return rows;
  },
});

export const listByBuyer = query({
  args: { buyerOrg: v.id("orgs"), limit: v.optional(v.number()) },
  handler: async (ctx, { buyerOrg, limit }) => {
    const rows = await ctx.db
      .query("certificates")
      .withIndex("byBuyer", q => q.eq("buyerOrg", buyerOrg))
      .take(limit ?? 100);
    rows.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    return rows;
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("certificates").take(200);
    rows.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    return rows.slice(0, limit ?? 50);
  },
});