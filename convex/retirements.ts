// convex/retirements.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
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

    // Use BigInt safely
    let sum = BigInt(0);
    for (const r of rows) {
      try {
        // works if amount is integer string
        sum += BigInt(r.amount);
      } catch {
        // fallback if it's decimal string
        const parsed = Number(r.amount);
        if (!isNaN(parsed)) sum += BigInt(Math.floor(parsed));
      }
    }

    return sum.toString();
  },
});

export const listByOrg = query({
  args: { owner: v.string() }, // wallet address or user/org id
  handler: async (ctx, { owner }) => {
    return await ctx.db
      .query("retirements")
      .withIndex("byOwner", q => q.eq("owner", owner))
      .order("desc")
      .collect();
  },
});

// Add listForUser function for dashboard data
export const listForUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", identity.subject))
      .unique();
    
    if (!user) return [];
    
    // Get user's organization memberships
    const memberships = await ctx.db
      .query("orgMembers")
      .withIndex("byUser", q => q.eq("userId", user._id))
      .collect();
    
    // Get all org IDs the user is a member of
    const userOrgIds = memberships.map(m => m.orgId);
    
    // Get retirements by user's wallet address (if they have one)
    let userRetirements = [];
    if (user.wallet) {
      const walletRetirements = await ctx.db
        .query("retirements")
        .withIndex("byOwner", q => q.eq("owner", user.wallet!.toLowerCase()))
        .collect();
      userRetirements.push(...walletRetirements);
    }
    
    // Get retirements by user's organizations through batch relationships
    const allRetirements = await ctx.db.query("retirements").collect();
    for (const retirement of allRetirements) {
      const batch = await ctx.db.get(retirement.batchId);
      if (batch && userOrgIds.includes(batch.producerOrg)) {
        // Avoid duplicates if already added by wallet
        const alreadyAdded = userRetirements.some(r => r._id.toString() === retirement._id.toString());
        if (!alreadyAdded) {
          userRetirements.push(retirement);
        }
      }
    }
    
    // Sort by retirement date (newest first)
    userRetirements.sort((a, b) => b.retiredAtMs - a.retiredAtMs);
    
    return userRetirements;
  },
});