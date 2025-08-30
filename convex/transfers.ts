// convex/transfers.ts
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

function hexLower(s?: string | null) {
  return (s ?? "").toLowerCase();
}

interface Transfer {
  _id: Id<"chainEvents">;
  chainId: number;
  contract: string;
  txHash: string;
  blockNumber: number;
  blockTimeMs: number;
  from: string;
  to: string;
  amount?: string;   // ERC20 style
  tokenId?: string;  // ERC721/1155 style
  relatedBatchId?: Id<"batches">;
}

/** helper: decode args JSON into a normalized Transfer */
function parseTransfer(ev: any): Transfer | null {
  if (ev.event !== "Transfer") return null;
  let parsed: any;
  try {
    parsed = JSON.parse(ev.args ?? "{}");
  } catch {
    return null;
  }
  const from = hexLower(parsed.from);
  const to = hexLower(parsed.to);
  const value = parsed.value ?? parsed.amount;
  const tokenId = parsed.tokenId ?? parsed.id;
  return {
    _id: ev._id,
    chainId: ev.chainId,
    contract: hexLower(ev.contract),
    txHash: hexLower(ev.txHash),
    blockNumber: ev.blockNumber,
    blockTimeMs: ev.blockTimeMs,
    from,
    to,
    amount: value ? String(value) : undefined,
    tokenId: tokenId ? String(tokenId) : undefined,
    relatedBatchId: ev.relatedBatchId,
  };
}

// =================== Queries ===================

/** list all transfers for a batch (using chainEvents.byRelatedBatch index) */
export const listByBatch = query({
  args: { batchId: v.id("batches"), limit: v.optional(v.number()) },
  handler: async (ctx, { batchId, limit }) => {
    const rows = await ctx.db
      .query("chainEvents")
      .withIndex("byRelatedBatch", q => q.eq("relatedBatchId", batchId))
      .take(1000);
    const transfers = rows.map(parseTransfer).filter(Boolean) as Transfer[];
    transfers.sort((a, b) => b.blockNumber - a.blockNumber);
    return transfers.slice(0, limit ?? 100);
  },
});

/** list transfers by address (from or to) — scan for hackathon scale */
export const listByAddress = query({
  args: { address: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { address, limit }) => {
    const addr = hexLower(address);
    const rows = await ctx.db.query("chainEvents").collect();
    const transfers = rows.map(parseTransfer).filter(
      (t: Transfer | null): t is Transfer => !!t && (t.from === addr || t.to === addr)
    );
    transfers.sort((a, b) => b.blockNumber - a.blockNumber);
    return transfers.slice(0, limit ?? 100);
  },
});

/** get transfers by txHash (unique in chainEvents.byTx index) */
export const getByTx = query({
  args: { txHash: v.string() },
  handler: async (ctx, { txHash }) => {
    const ev = await ctx.db
      .query("chainEvents")
      .withIndex("byTx", q => q.eq("txHash", hexLower(txHash)))
      .unique();
    if (!ev) return null;
    return parseTransfer(ev);
  },
});

/** latest N transfers globally */
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("chainEvents").take(1000);
    const transfers = rows.map(parseTransfer).filter(Boolean) as Transfer[];
    transfers.sort((a, b) => b.blockNumber - a.blockNumber);
    return transfers.slice(0, limit ?? 50);
  },
});