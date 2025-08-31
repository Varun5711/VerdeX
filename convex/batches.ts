// convex/batches.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";


// ---------- Role validator (functional roles in your app) ----------
const RoleV = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);

// ---------- Helpers ----------
async function requireFunctionalRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  required: Array<"PRODUCER" | "CERTIFIER" | "AUTHORITY" | "ADMIN">
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok =
    roles.includes("ADMIN") ||
    required.some(r => roles.includes(r));
  if (!ok) throw new Error("Insufficient permissions");
}

function normalize(s?: string | null) {
  return (s ?? "").trim();
}

function intervalsOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && aEnd > bStart;
}

async function hasActiveLockOverlap(
  ctx: any,
  facilityId: Id<"facilities">,
  startTs: number,
  endTs: number,
  excludeLockId?: Id<"periodLocks">
) {
  const locks = await ctx.db
    .query("periodLocks")
    .withIndex("byFacility", q => q.eq("facilityId", facilityId))
    .collect();

  for (const L of locks) {
    if (excludeLockId && L._id.toString() === excludeLockId.toString()) continue;
    if (L.releasedAt) continue;
    if (intervalsOverlap(startTs, endTs, L.startTs, L.endTs)) return true;
  }
  return false;
}

async function getUserByClerk(ctx: any, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
    .unique();
}

// ====================== PROPOSE / UPDATE / REJECT ======================

export const propose = mutation({
  args: {
    clerkUserId: v.string(),
    producerOrg: v.id("orgs"),
    facilityId: v.id("facilities"),
    batchId: v.string(),                 // deterministic id generated client-side
    startTs: v.number(),
    endTs: v.number(),
    amount: v.string(),                  // decimal string
    meterHash: v.string(),               // 0x...
    renewableProofHash: v.string(),      // 0x...
    docBundleHash: v.string(),           // 0x...
    status: v.optional(
      v.union(
        v.literal("DRAFT"),
        v.literal("PROPOSED")
      )
    ), // default PROPOSED (DRAFT won't create a lock)
  },
  handler: async (ctx, args) => {
    if (!(args.startTs < args.endTs)) throw new Error("Invalid time range");

    // Auth: only PRODUCER (or ADMIN) of producerOrg can propose
    await requireFunctionalRole(ctx, args.clerkUserId, args.producerOrg, ["PRODUCER", "ADMIN"]);

    // Facility must belong to this org
    const facility = await ctx.db.get(args.facilityId);
    if (!facility || facility.orgId.toString() !== args.producerOrg.toString()) {
      throw new Error("Facility does not belong to the producer org");
    }

    // Uniqueness on batchId
    const dup = await ctx.db.query("batches").withIndex("byBatchId", q => q.eq("batchId", args.batchId)).unique();
    if (dup) throw new Error("Batch with this batchId already exists");

    const creator = await getUserByClerk(ctx, args.clerkUserId);

    const status = args.status ?? "PROPOSED";

    // If PROPOSED, enforce locks (no overlapping active lock)
    if (status === "PROPOSED") {
      const overlaps = await hasActiveLockOverlap(ctx, args.facilityId, args.startTs, args.endTs);
      if (overlaps) throw new Error("Time period overlaps an existing locked batch");
    }

    const batchIdDb = await ctx.db.insert("batches", {
      batchId: args.batchId,
      producerOrg: args.producerOrg,
      facilityId: args.facilityId,
      startTs: args.startTs,
      endTs: args.endTs,
      amount: normalize(args.amount),
      meterHash: args.meterHash,
      renewableProofHash: args.renewableProofHash,
      docBundleHash: args.docBundleHash,
      status,
      createdBy: creator?._id as Id<"users">,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      approvedBy: undefined,
      approvedAt: undefined,
      rejectedBy: undefined,
      rejectReason: undefined,
      issuedBy: undefined,
      issuedAt: undefined,
      chain: undefined,
    });

    // Create a period lock only for PROPOSED (DRAFT has none)
    if (status === "PROPOSED") {
      await ctx.db.insert("periodLocks", {
        facilityId: args.facilityId,
        startTs: args.startTs,
        endTs: args.endTs,
        batchRef: batchIdDb,
        reason: "batch-proposal",
        createdBy: creator?._id as Id<"users">,
        createdAt: Date.now(),
        releasedAt: undefined,
      });
    }

    return { id: batchIdDb };
  },
});

export const update = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("batches"),
    // fields allowed to update before approval
    startTs: v.optional(v.number()),
    endTs: v.optional(v.number()),
    amount: v.optional(v.string()),
    meterHash: v.optional(v.string()),
    renewableProofHash: v.optional(v.string()),
    docBundleHash: v.optional(v.string()),
    status: v.optional(v.union(v.literal("DRAFT"), v.literal("PROPOSED"))), // can toggle between DRAFT/PROPOSED
  },
  handler: async (ctx, args) => {
    const batch = await ctx.db.get(args.id);
    if (!batch) throw new Error("Batch not found");

    // Only editable in DRAFT/PROPOSED
    if (batch.status !== "DRAFT" && batch.status !== "PROPOSED") {
      throw new Error("Batch can no longer be edited");
    }

    await requireFunctionalRole(ctx, args.clerkUserId, batch.producerOrg, ["PRODUCER", "ADMIN"]);

    const nextStart = args.startTs ?? batch.startTs;
    const nextEnd = args.endTs ?? batch.endTs;
    if (!(nextStart < nextEnd)) throw new Error("Invalid time range");

    // Manage lock transitions
    // 1) find existing lock (if any) for this batch
    const existingLock = await ctx.db
      .query("periodLocks")
      .withIndex("byFacility", q => q.eq("facilityId", batch.facilityId))
      .filter(q => q.eq(q.field("batchRef"), args.id))
      .first();

    // If target status is PROPOSED, ensure an active lock matches new interval
    const targetStatus = args.status ?? batch.status;

    if (targetStatus === "PROPOSED") {
      // check overlap vs other active locks (exclude our own lock id if present)
      const overlap = await hasActiveLockOverlap(
        ctx,
        batch.facilityId,
        nextStart,
        nextEnd,
        existingLock?._id
      );
      if (overlap) throw new Error("Time period overlaps an existing locked batch");

      if (!existingLock) {
        // create a new lock
        const me = await getUserByClerk(ctx, args.clerkUserId);
        await ctx.db.insert("periodLocks", {
          facilityId: batch.facilityId,
          startTs: nextStart,
          endTs: nextEnd,
          batchRef: args.id,
          reason: "batch-proposal",
          createdBy: me?._id as Id<"users">,
          createdAt: Date.now(),
          releasedAt: undefined,
        });
      } else {
        // update lock window
        await ctx.db.patch(existingLock._id, { startTs: nextStart, endTs: nextEnd, releasedAt: undefined });
      }
    } else {
      // target is DRAFT: if there is a lock, release it
      if (existingLock && !existingLock.releasedAt) {
        await ctx.db.patch(existingLock._id, { releasedAt: Date.now() });
      }
    }

    const patch: any = { updatedAt: Date.now(), status: targetStatus };
    if (args.startTs !== undefined) patch.startTs = nextStart;
    if (args.endTs !== undefined) patch.endTs = nextEnd;
    if (args.amount !== undefined) patch.amount = normalize(args.amount);
    if (args.meterHash !== undefined) patch.meterHash = args.meterHash;
    if (args.renewableProofHash !== undefined) patch.renewableProofHash = args.renewableProofHash;
    if (args.docBundleHash !== undefined) patch.docBundleHash = args.docBundleHash;

    await ctx.db.patch(args.id, patch);
    return { ok: true };
  },
});

export const reject = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("batches"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, id, reason }) => {
    const batch = await ctx.db.get(id);
    if (!batch) throw new Error("Batch not found");

    // Only CERTIFIER (or ADMIN) can reject
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["CERTIFIER", "ADMIN"]);

    // Release lock, set status REJECTED
    const lock = await ctx.db
      .query("periodLocks")
      .withIndex("byFacility", q => q.eq("facilityId", batch.facilityId))
      .filter(q => q.eq(q.field("batchRef"), id))
      .first();
    if (lock && !lock.releasedAt) {
      await ctx.db.patch(lock._id, { releasedAt: Date.now(), reason: "rejected" });
    }

    const actor = await getUserByClerk(ctx, clerkUserId);
    await ctx.db.patch(id, {
      status: "REJECTED",
      rejectedBy: actor?._id as Id<"users">,
      rejectReason: reason,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

// ====================== APPROVE / ISSUE ======================

export const approve = mutation({
  args: { clerkUserId: v.string(), id: v.id("batches") },
  handler: async (ctx, { clerkUserId, id }) => {
    const batch = await ctx.db.get(id);
    if (!batch) throw new Error("Batch not found");

    // Only CERTIFIER (or ADMIN)
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["CERTIFIER", "ADMIN"]);

    if (batch.status !== "PROPOSED") throw new Error("Batch must be PROPOSED to approve");

    // Basic completeness checks
    if (!batch.meterHash || !batch.renewableProofHash || !batch.docBundleHash) {
      throw new Error("Missing evidence hashes");
    }

    const actor = await getUserByClerk(ctx, clerkUserId);
    await ctx.db.patch(id, {
      status: "APPROVED",
      approvedBy: actor?._id as Id<"users">,
      approvedAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Keep the lock active — prevents double counting while awaiting issuance
    return { ok: true };
  },
});

export const issue = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("batches"),
    // optional chain binding for when you wire web3 later
    chain: v.optional(
      v.object({
        chainId: v.optional(v.number()),
        registry: v.optional(v.string()),
        tokenIdHex: v.optional(v.string()),
        issueTx: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { clerkUserId, id, chain }) => {
    const batch = await ctx.db.get(id);
    if (!batch) throw new Error("Batch not found");

    // Only AUTHORITY (or ADMIN) can issue
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["AUTHORITY", "ADMIN"]);

    if (batch.status !== "APPROVED") throw new Error("Batch must be APPROVED to issue");

    const actor = await getUserByClerk(ctx, clerkUserId);
    await ctx.db.patch(id, {
      status: "ISSUED",
      issuedBy: actor?._id as Id<"users">,
      issuedAt: Date.now(),
      updatedAt: Date.now(),
      chain: chain ?? batch.chain,
    });

    // Keep the lock *unreleased* as a permanent occupancy of that time window.
    // This ensures no future batches overlap the already-issued period.
    return { ok: true };
  },
});

// ====================== ATTESTATIONS (optional) ======================

export const addAttestation = mutation({
  args: {
    clerkUserId: v.string(),
    batchId: v.id("batches"),
    signer: v.string(),           // 0x...
    typedDataHash: v.string(),    // 0x...
    signature: v.string(),        // 0x...
    payload: v.string(),          // JSON string
    verified: v.optional(v.boolean()), // set true if you verified client-side
  },
  handler: async (ctx, { clerkUserId, batchId, signer, typedDataHash, signature, payload, verified }) => {
    const batch = await ctx.db.get(batchId);
    if (!batch) throw new Error("Batch not found");

    // Only producer org members (or admin) should add attestations
    await requireFunctionalRole(ctx, clerkUserId, batch.producerOrg, ["PRODUCER", "ADMIN"]);

    await ctx.db.insert("attestations", {
      batchId,
      signer: signer.toLowerCase(),
      typedDataHash,
      signature,
      payload,
      verified: verified ?? false,
      createdAt: Date.now(),
    });

    return { ok: true };
  },
});

/**
 * Create a new batch record.
 */
export const create = mutation({
  args: {
    clerkUserId: v.string(),
    orgId: v.id("orgs"),
    facilityId: v.id("facilities"),
    batchId: v.string(),
    startTs: v.number(),
    endTs: v.number(),
    amount: v.string(),
    meterHash: v.string(),
    renewableProofHash: v.string(),
    docBundleHash: v.string(),
    description: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { clerkUserId, orgId, facilityId, batchId, startTs, endTs, amount, meterHash, renewableProofHash, docBundleHash, description, metadata } = args;

    if (!(startTs < endTs)) {
      throw new Error("Invalid time range");
    }

    // Check if user has permission to create batches for this org
    const orgMember = await ctx.db
      .query("orgMembers")
      .withIndex("byUserAndOrg", q => q.eq("clerkUserId", clerkUserId).eq("orgId", orgId))
      .unique();

    if (!orgMember) {
      throw new Error("User is not a member of this organization");
    }

    // Check if user has permission to create batches
    if (!orgMember.roles.includes("admin") && !orgMember.roles.includes("producer")) {
      throw new Error("Insufficient permissions to create batches");
    }

    // Verify facility exists and belongs to this org
    const facility = await ctx.db.get(facilityId);
    if (!facility || facility.orgId !== orgId) {
      throw new Error("Facility does not belong to this organization");
    }

    // Check for overlapping time periods
    const hasOverlap = await hasActiveLockOverlap(ctx, facilityId, startTs, endTs);
    if (hasOverlap) {
      throw new Error("Time period overlaps with existing batch or lock");
    }

    // Get user
    const user = await getUserByClerk(ctx, clerkUserId);

    // Create batch record
    const batchId_db = await ctx.db.insert("batches", {
      producerOrg: orgId,
      facilityId,
      batchId: normalize(batchId),
      startTs,
      endTs,
      amount: normalize(amount),
      meterHash: hexLower(meterHash),
      renewableProofHash: hexLower(renewableProofHash),
      docBundleHash: hexLower(docBundleHash),
      description: description || null,
      metadata: metadata || {},
      status: "DRAFT",
      createdAt: Date.now(),
      createdBy: user._id,
      updatedAt: Date.now(),
      approvedBy: null,
      approvedAt: null,
      issuedBy: null,
      issuedAt: null,
      chain: null,
    });

    // Create period lock to prevent double counting
    await ctx.db.insert("periodLocks", {
      facilityId,
      batchId: batchId_db,
      startTs,
      endTs,
      createdAt: Date.now(),
      createdBy: user._id,
      releasedAt: null,
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      orgId,
      action: "batch_created",
      resource: "batches",
      resourceId: batchId_db,
      userId: clerkUserId,
      metadata: {
        facilityId,
        batchId,
        amount,
        startTs,
        endTs,
      },
      ipAddress: null,
      userAgent: null,
      timestamp: Date.now(),
    });

    return { id: batchId_db };
  },
});

// ====================== QUERIES ======================

export const get = query({
  args: { id: v.id("batches") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getByBatchId = query({
  args: { batchId: v.string() },
  handler: async (ctx, { batchId }) => {
    return await ctx.db.query("batches").withIndex("byBatchId", q => q.eq("batchId", batchId)).unique();
  },
});

export const listByOrg = query({
  args: { orgId: v.id("orgs"), status: v.optional(v.string()), limit: v.optional(v.number()) },
  handler: async (ctx, { orgId, status, limit }) => {
    let q = ctx.db.query("batches").withIndex("byProducerOrg", qb => qb.eq("producerOrg", orgId));
    const rows = await q.take(1000);
    const filtered = status ? rows.filter(r => r.status === status) : rows;
    filtered.sort((a, b) => b.createdAt - a.createdAt);
    return filtered.slice(0, limit ?? 100);
  },
});

export const listByFacility = query({
  args: { facilityId: v.id("facilities"), limit: v.optional(v.number()) },
  handler: async (ctx, { facilityId, limit }) => {
    const rows = await ctx.db.query("batches").withIndex("byFacility", q => q.eq("facilityId", facilityId)).take(1000);
    rows.sort((a, b) => a.startTs - b.startTs);
    return rows.slice(0, limit ?? 100);
  },
});

export const listByStatus = query({
  args: { status: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { status, limit }) => {
    return await ctx.db.query("batches").withIndex("byStatus", q => q.eq("status", status as any)).take(limit ?? 100);
  },
});

export const listByProducerOrg = query({
  args: { producerOrg: v.id("orgs"), status: v.optional(v.string()), limit: v.optional(v.number()) },
  handler: async (ctx, { producerOrg, status, limit }) => {
    let q = ctx.db.query("batches").withIndex("byProducerOrg", qb => qb.eq("producerOrg", producerOrg));
    const rows = await q.take(1000);
    const filtered = status ? rows.filter(r => r.status === status) : rows;
    filtered.sort((a, b) => b.createdAt - a.createdAt);
    return filtered.slice(0, limit ?? 100);
  },
});