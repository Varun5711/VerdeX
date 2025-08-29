// convex/attestations.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ---------- helpers ----------
type Functional = "PRODUCER" | "CERTIFIER" | "AUTHORITY" | "AUDITOR" | "ADMIN";

async function requireFunctionalRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  required: Functional[]
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok = roles.includes("ADMIN") || required.some(r => roles.includes(r));
  if (!ok) throw new Error("Insufficient permissions");
}

function normalizeHexLower(s: string) {
  return s.trim().toLowerCase();
}

// ---------- create / upsert ----------

/**
 * Attach an attestation to a batch.
 * Policy: PRODUCER (or ADMIN) of the batch's producerOrg may add; others blocked.
 */
export const add = mutation({
  args: {
    clerkUserId: v.string(),
    batchId: v.id("batches"),
    signer: v.string(),         // 0x address or DID, stored as-lowercase string
    typedDataHash: v.string(),  // 0x... hash of typed data
    signature: v.string(),      // 0x... signature bytes
    payload: v.string(),        // JSON string of typed data or note
    verified: v.optional(v.boolean()),
  },
  handler: async (ctx, { clerkUserId, batchId, signer, typedDataHash, signature, payload, verified }) => {
    const batch = await ctx.db.get(batchId);
    if (!batch) throw new Error("Batch not found");

    // Only producer org members (or admin) can attach attestations to their batch
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["PRODUCER", "ADMIN"]);

    const attestationId = await ctx.db.insert("attestations", {
      batchId,
      signer: normalizeHexLower(signer),
      typedDataHash: normalizeHexLower(typedDataHash),
      signature: normalizeHexLower(signature),
      payload,
      verified: verified ?? false,
      createdAt: Date.now(),
    });

    return { id: attestationId };
  },
});

/**
 * Idempotent upsert keyed by (batchId, signer, typedDataHash).
 * Useful if clients may retry the same post.
 */
export const upsert = mutation({
  args: {
    clerkUserId: v.string(),
    batchId: v.id("batches"),
    signer: v.string(),
    typedDataHash: v.string(),
    signature: v.string(),
    payload: v.string(),
    verified: v.optional(v.boolean()),
  },
  handler: async (ctx, { clerkUserId, batchId, signer, typedDataHash, signature, payload, verified }) => {
    const batch = await ctx.db.get(batchId);
    if (!batch) throw new Error("Batch not found");
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["PRODUCER", "ADMIN"]);

    const s = normalizeHexLower(signer);
    const h = normalizeHexLower(typedDataHash);

    // scan + match (fine for hackathon scale)
    const existing = (await ctx.db.query("attestations").collect()).find(
      a => a.batchId?.toString() === batchId.toString() && a.signer === s && a.typedDataHash === h
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        signature: normalizeHexLower(signature),
        payload,
        verified: verified ?? existing.verified ?? false,
      });
      return { id: existing._id, updated: true };
    }

    const id = await ctx.db.insert("attestations", {
      batchId,
      signer: s,
      typedDataHash: h,
      signature: normalizeHexLower(signature),
      payload,
      verified: verified ?? false,
      createdAt: Date.now(),
    });
    return { id, created: true };
  },
});

// ---------- verify / remove ----------

/**
 * Mark an attestation verified/unverified.
 * Policy: CERTIFIER or ADMIN in the producer org can flip verified.
 */
export const setVerified = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("attestations"),
    verified: v.boolean(),
  },
  handler: async (ctx, { clerkUserId, id, verified }) => {
    const att = await ctx.db.get(id);
    if (!att) throw new Error("Attestation not found");
    const batch = await ctx.db.get(att.batchId as Id<"batches">);
    if (!batch) throw new Error("Parent batch missing");

    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["CERTIFIER", "ADMIN"]);
    await ctx.db.patch(id, { verified });
    return { ok: true };
  },
});

/**
 * Remove an attestation.
 * Policy: CERTIFIER or ADMIN of the producer org.
 */
export const remove = mutation({
  args: { clerkUserId: v.string(), id: v.id("attestations") },
  handler: async (ctx, { clerkUserId, id }) => {
    const att = await ctx.db.get(id);
    if (!att) return { ok: true };
    const batch = await ctx.db.get(att.batchId as Id<"batches">);
    if (!batch) return { ok: true };

    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["CERTIFIER", "ADMIN"]);
    await ctx.db.delete(id);
    return { ok: true };
  },
});

// ---------- queries ----------

export const get = query({
  args: { id: v.id("attestations") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = (await ctx.db.query("attestations").collect()).filter(
      a => a.batchId?.toString() === batchId.toString()
    );
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 100);
  },
});

export const listBySigner = query({
  args: { signer: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { signer, limit }) => {
    const s = normalizeHexLower(signer);
    const rows = (await ctx.db.query("attestations").collect()).filter(a => a.signer === s);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 100);
  },
});