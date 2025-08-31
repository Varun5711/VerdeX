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

/**
 * Create a new retirement record.
 */
export const create = mutation({
  args: {
    clerkUserId: v.string(),
    orgId: v.id("orgs"),
    batchId: v.id("batches"),
    amount: v.string(),
    retiredAtMs: v.number(),
    reason: v.string(),
    location: v.optional(v.string()),
    verificationMethod: v.optional(v.string()),
    verificationNotes: v.optional(v.string()),
    blockchainTxHash: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { clerkUserId, orgId, batchId, amount, retiredAtMs, reason, location, verificationMethod, verificationNotes, blockchainTxHash, metadata } = args;

    // Check if user has permission to create retirements for this org
    const orgMember = await ctx.db
      .query("orgMembers")
      .withIndex("byUserAndOrg", q => q.eq("clerkUserId", clerkUserId).eq("orgId", orgId))
      .unique();

    if (!orgMember) {
      throw new Error("User is not a member of this organization");
    }

    // Check if user has permission to create retirements
    if (!orgMember.roles.includes("admin") && !orgMember.roles.includes("manager")) {
      throw new Error("Insufficient permissions to create retirements");
    }

    // Verify batch exists and belongs to this org
    const batch = await ctx.db.get(batchId);
    if (!batch) {
      throw new Error("Batch not found");
    }

    // Get facility to check org ownership
    const facility = await ctx.db.get(batch.facilityId);
    if (!facility || facility.orgId !== orgId) {
      throw new Error("Batch does not belong to this organization");
    }

    // Generate unique claim reference
    const claimRef = `RET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create retirement record
    const retirementId = await ctx.db.insert("retirements", {
      orgId,
      batchId,
      amount,
      retiredAtMs,
      reason,
      location: location || null,
      verificationMethod: verificationMethod || null,
      verificationNotes: verificationNotes || null,
      blockchainTxHash: blockchainTxHash || null,
      metadata: metadata || {},
      claimRef,
      owner: orgId, // Use orgId as owner for organization-level tracking
      certificateId: null, // Will be linked later if needed
      createdAtMs: Date.now(),
      createdBy: clerkUserId,
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      orgId,
      action: "retirement_created",
      resource: "retirements",
      resourceId: retirementId,
      userId: clerkUserId,
      metadata: {
        batchId,
        amount,
        reason,
        claimRef,
      },
      ipAddress: null,
      userAgent: null,
      timestamp: Date.now(),
    });

    return { id: retirementId, claimRef };
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