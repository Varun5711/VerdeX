// convex/chainEvents.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";


// ---- helpers ----
function hexLower(s?: string | null) {
  return (s ?? "").toLowerCase();
}
function norm(s?: string | null) {
  return (s ?? "").trim();
}

// =================== Mutations ===================

/**
 * Record a chain event (idempotent by txHash).
 * Caller: background indexer / authority / admin.
 */
export const record = mutation({
  args: {
    chainId: v.number(),
    contract: v.string(), // hex address
    event: v.string(),
    txHash: v.string(),
    blockNumber: v.number(),
    blockTimeMs: v.number(),
    args: v.string(), // JSON string of decoded args
    relatedBatchId: v.optional(v.id("batches")),
  },
  handler: async (ctx, args) => {
    const tx = hexLower(args.txHash);

    // Idempotent upsert by txHash
    const existing = await ctx.db
      .query("chainEvents")
      .withIndex("byTx", (q) => q.eq("txHash", tx))
      .unique();

    const doc = {
      chainId: args.chainId,
      contract: hexLower(args.contract),
      event: norm(args.event),
      txHash: tx,
      blockNumber: args.blockNumber,
      blockTimeMs: args.blockTimeMs,
      args: args.args,
      relatedBatchId: args.relatedBatchId,
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc as any);
      return { id: existing._id, updated: true };
    }

    const id = await ctx.db.insert("chainEvents", doc as any);
    return { id, created: true };
  },
});

/** link an existing event to a batch */
export const linkToBatch = mutation({
  args: { id: v.id("chainEvents"), batchId: v.id("batches") },
  handler: async (ctx, { id, batchId }) => {
    const ev = await ctx.db.get(id);
    if (!ev) throw new Error("Event not found");
    await ctx.db.patch(id, { relatedBatchId: batchId });
    return { ok: true };
  },
});

/** unlink batch */
export const unlinkBatch = mutation({
  args: { id: v.id("chainEvents") },
  handler: async (ctx, { id }) => {
    const ev = await ctx.db.get(id);
    if (!ev) return { ok: true };
    await ctx.db.patch(id, { relatedBatchId: undefined });
    return { ok: true };
  },
});

// =================== Queries ===================

export const get = query({
  args: { id: v.id("chainEvents") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/** byTx index */
export const getByTx = query({
  args: { txHash: v.string() },
  handler: async (ctx, { txHash }) => {
    return await ctx.db
      .query("chainEvents")
      .withIndex("byTx", (q) => q.eq("txHash", hexLower(txHash)))
      .unique();
  },
});

/** byRelatedBatch index */
export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = await ctx.db
      .query("chainEvents")
      .withIndex("byRelatedBatch", (q) => q.eq("relatedBatchId", batchId))
      .take(limit ?? 100);
    rows.sort((a, b) => b.blockNumber - a.blockNumber);
    return rows;
  },
});

/** byContract index */
export const listByContract = query({
  args: {
    contract: v.string(),
    fromBlock: v.optional(v.number()),
    toBlock: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { contract, fromBlock, toBlock, limit }) => {
    const addr = contract.toLowerCase();

    const q = ctx.db.query("chainEvents").withIndex("byContract", (qb) => {
      if (fromBlock !== undefined && toBlock !== undefined) {
        return qb
          .eq("contract", addr)
          .gte("blockNumber", fromBlock)
          .lte("blockNumber", toBlock);
      } else if (fromBlock !== undefined) {
        return qb.eq("contract", addr).gte("blockNumber", fromBlock);
      } else if (toBlock !== undefined) {
        return qb.eq("contract", addr).lte("blockNumber", toBlock);
      } else {
        return qb.eq("contract", addr);
      }
    });

    // Already ordered by (contract, blockNumber) via the index
    return await q.take(limit ?? 200);
  },
});
/** get latest events globally */
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("chainEvents").take(1000);
    rows.sort((a, b) => b.blockNumber - a.blockNumber);
    return rows.slice(0, limit ?? 100);
  },
});
