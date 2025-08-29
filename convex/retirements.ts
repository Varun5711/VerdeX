// convex/retirements.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

function hexLower(s: string) {
  return s.toLowerCase();
}
function norm(s: string) {
  return s.trim();
}

// =================== Mutations ===================

/**
 * Record a retirement (usually from an on-chain event).
 */
export const record = mutation({
  args: {
    batchId: v.id("batches"),
    tokenIdHex: v.string(), // 0x...
    owner: v.string(),      // 0x...
    amount: v.string(),     // decimal string
    claimRef: v.string(),
    retiredAtMs: v.number(),
    txHash: v.optional(v.string()),
    certificateId: v.optional(v.id("certificates")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("retirements")
      .withIndex("byClaimRef", q => q.eq("claimRef", norm(args.claimRef)))
      .unique();

    const doc = {
      batchId: args.batchId,
      tokenIdHex: hexLower(args.tokenIdHex),
      owner: hexLower(args.owner),
      amount: norm(args.amount),
      claimRef: norm(args.claimRef),
      retiredAtMs: args.retiredAtMs,
      txHash: args.txHash ? hexLower(args.txHash) : undefined,
      certificateId: args.certificateId,
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc as any);
      return { id: existing._id, updated: true };
    }

    const id = await ctx.db.insert("retirements", doc as any);
    return { id, created: true };
  },
});

/**
 * Link an existing retirement to a certificate.
 */
export const attachCertificate = mutation({
  args: { id: v.id("retirements"), certificateId: v.id("certificates") },
  handler: async (ctx, { id, certificateId }) => {
    await ctx.db.patch(id, { certificateId });
    return { ok: true };
  },
});

// =================== Queries ===================

export const get = query({
  args: { id: v.id("retirements") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const getByClaimRef = query({
  args: { claimRef: v.string() },
  handler: async (ctx, { claimRef }) => {
    return await ctx.db
      .query("retirements")
      .withIndex("byClaimRef", q => q.eq("claimRef", norm(claimRef)))
      .unique();
  },
});

export const listByOwner = query({
  args: { owner: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { owner, limit }) => {
    const rows = await ctx.db
      .query("retirements")
      .withIndex("byOwner", q => q.eq("owner", hexLower(owner)))
      .take(limit ?? 100);
    rows.sort((a, b) => b.retiredAtMs - a.retiredAtMs);
    return rows;
  },
});

export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = await ctx.db
      .query("retirements")
      .withIndex("byBatch", q => q.eq("batchId", batchId))
      .take(limit ?? 200);
    rows.sort((a, b) => b.retiredAtMs - a.retiredAtMs);
    return rows.slice(0, limit ?? 100);
  },
});

/** global recent retirements */
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("retirements").take(500);
    rows.sort((a, b) => b.retiredAtMs - a.retiredAtMs);
    return rows.slice(0, limit ?? 50);
  },
});

/** sum retired amount for a batch (to compute outstanding credits) */
export const totalForBatch = query({
  args: { batchId: v.id("batches") },
  handler: async (ctx, { batchId }) => {
    const rows = await ctx.db
      .query("retirements")
      .withIndex("byBatch", q => q.eq("batchId", batchId))
      .collect();
    let sum = 0n;
    for (const r of rows) {
      try {
        sum += BigInt(r.amount);
      } catch {
        // ignore parse errors for non-integer decimal strings
      }
    }
    return sum.toString();
  },
});