// convex/docs.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ---- enums (mirror your schema) ----
const DocTypeV = v.union(
  v.literal("METER_CSV"),
  v.literal("REC_PROOF"),
  v.literal("AUDIT_PDF"),
  v.literal("GEN_CERT"),
  v.literal("OTHER")
);

const StorageProviderV = v.union(
  v.literal("S3"),
  v.literal("GCS"),
  v.literal("IPFS"),
  v.literal("FILECOIN"),
  v.literal("ARWEAVE"),
  v.literal("OTHER")
);

// simple role gate via users.resolveOrgContext
type Functional = "PRODUCER" | "CERTIFIER" | "AUTHORITY" | "AUDITOR" | "ADMIN";
async function requireFunctionalRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  required: Functional[]
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this org");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok = roles.includes("ADMIN") || required.some(r => roles.includes(r));
  if (!ok) throw new Error("Insufficient permissions");
}
export const listByOrg = query({
  args: { orgId: v.id("orgs") },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("docs")
      .withIndex("byOwner", q => q.eq("ownerOrg", orgId))
      .order("desc")
      .collect();
  },
});
// ===================== CREATE =====================

export const create = mutation({
  args: {
    clerkUserId: v.string(),
    ownerOrg: v.id("orgs"),
    batchId: v.optional(v.id("batches")),
    type: DocTypeV,
    provider: StorageProviderV,
    storageKey: v.string(), // CID or external object key
    hash: v.string(),       // hex string (matches Hex in schema)
    size: v.number(),       // bytes (required in schema)
    mime: v.string(),
    encrypted: v.boolean(),
    enc: v.optional(
      v.object({
        algo: v.string(),
        keyId: v.string(),
        iv: v.optional(v.string()), // hex
      })
    ),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireFunctionalRole(ctx, args.clerkUserId, args.ownerOrg, ["PRODUCER", "CERTIFIER", "ADMIN"]);

    const actor = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!actor) throw new Error("User not found");

    const id = await ctx.db.insert("docs", {
      ownerOrg: args.ownerOrg,
      batchId: args.batchId,
      type: args.type,
      provider: args.provider,
      storageKey: args.storageKey,
      hash: args.hash,
      size: args.size,
      mime: args.mime,
      encrypted: args.encrypted,
      enc: args.enc,
      createdBy: actor._id,
      createdAt: Date.now(),
      label: args.label,
    });

    return { id };
  },
});

// ===================== READ / LIST =====================

export const get = query({
  args: { id: v.id("docs") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/** Uses index: byOwner(ownerOrg) */
export const listByOwner = query({
  args: { ownerOrg: v.id("orgs"), limit: v.optional(v.number()), type: v.optional(DocTypeV) },
  handler: async (ctx, { ownerOrg, limit, type }) => {
    let rows = await ctx.db.query("docs").withIndex("byOwner", q => q.eq("ownerOrg", ownerOrg)).take(1000);
    if (type) rows = rows.filter(r => r.type === type);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 100);
  },
});

/** Uses index: byBatch(batchId) */
export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = await ctx.db.query("docs").withIndex("byBatch", q => q.eq("batchId", batchId)).take(1000);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 100);
  },
});

/**
 * Uses composite index: byType(type, createdAt).
 * We eq on 'type' and can page/sort via createdAt (we’ll sort desc post-fetch for simplicity).
 */
export const listByType = query({
  args: { type: DocTypeV, limit: v.optional(v.number()) },
  handler: async (ctx, { type, limit }) => {
    const rows = await ctx.db.query("docs").withIndex("byType", q => q.eq("type", type)).take(1000);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 100);
  },
});

/** Uses search index: searchLabels(label; filter ownerOrg, type) */
export const searchByLabel = query({
  args: {
    ownerOrg: v.id("orgs"),
    q: v.string(),
    type: v.optional(DocTypeV),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { ownerOrg, q, type, limit }) => {
    const res = await ctx.db
      .query("docs")
      .withSearchIndex("searchLabels", idx => {
        let i = idx.search("label", q).eq("ownerOrg", ownerOrg);
        if (type) i = i.eq("type", type);
        return i;
      })
      .take(limit ?? 50);
    return res;
  },
});

// ===================== UPDATE / LINK =====================

export const updateLabel = mutation({
  args: { clerkUserId: v.string(), id: v.id("docs"), label: v.string() },
  handler: async (ctx, { clerkUserId, id, label }) => {
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Doc not found");
    await requireFunctionalRole(ctx, clerkUserId, doc.ownerOrg, ["PRODUCER", "CERTIFIER", "ADMIN"]);
    await ctx.db.patch(id, { label });
    return { ok: true };
  },
});

export const linkToBatch = mutation({
  args: { clerkUserId: v.string(), id: v.id("docs"), batchId: v.id("batches") },
  handler: async (ctx, { clerkUserId, id, batchId }) => {
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Doc not found");
    await requireFunctionalRole(ctx, clerkUserId, doc.ownerOrg, ["PRODUCER", "CERTIFIER", "ADMIN"]);
    await ctx.db.patch(id, { batchId });
    return { ok: true };
  },
});

// ===================== DELETE =====================

export const remove = mutation({
  args: { clerkUserId: v.string(), id: v.id("docs") },
  handler: async (ctx, { clerkUserId, id }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return { ok: true };
    await requireFunctionalRole(ctx, clerkUserId, doc.ownerOrg, ["CERTIFIER", "ADMIN"]);
    await ctx.db.delete(id);
    return { ok: true };
  },
});