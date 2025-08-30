// convex/periodLocks.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ---- functional roles in your app (match schema) ----
type Functional = "PRODUCER" | "CERTIFIER" | "AUTHORITY" | "AUDITOR" | "ADMIN";

/** Require that clerkUserId has at least one of the functional roles in the org of the facility */
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

function intervalsOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && aEnd > bStart;
}

/** fast overlap check using indexes */
async function hasActiveOverlap(
  ctx: any,
  facilityId: Id<"facilities">,
  startTs: number,
  endTs: number,
  excludeId?: Id<"periodLocks">
) {
  // We fetch all locks for the facility (quick with byFacility) and filter.
  const locks = await ctx.db
    .query("periodLocks")
    .withIndex("byFacility", q => q.eq("facilityId", facilityId))
    .collect();

  for (const L of locks) {
    if (excludeId && L._id.toString() === excludeId.toString()) continue;
    if (L.releasedAt) continue;
    if (intervalsOverlap(startTs, endTs, L.startTs, L.endTs)) return true;
  }
  return false;
}

// ========================= QUERIES =========================

export const get = query({
  args: { id: v.id("periodLocks") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listByFacility = query({
  args: { facilityId: v.id("facilities"), includeReleased: v.optional(v.boolean()) },
  handler: async (ctx, { facilityId, includeReleased }) => {
    const rows = await ctx.db
      .query("periodLocks")
      .withIndex("byFacility", q => q.eq("facilityId", facilityId))
      .collect();
    return includeReleased ? rows : rows.filter(r => !r.releasedAt);
  },
});

export const checkOverlap = query({
  args: {
    facilityId: v.id("facilities"),
    startTs: v.number(),
    endTs: v.number(),
    excludeId: v.optional(v.id("periodLocks")),
  },
  handler: async (ctx, { facilityId, startTs, endTs, excludeId }) => {
    if (!(startTs < endTs)) throw new Error("Invalid time range");
    const overlap = await hasActiveOverlap(ctx, facilityId, startTs, endTs, excludeId);
    return { overlap };
  },
});

// ========================= MUTATIONS =========================

/**
 * Create a manual lock. Intended for compliance workflows (CERTIFIER/AUTHORITY/ADMIN).
 * Producers generally get locks automatically when proposing a batch.
 */
export const create = mutation({
  args: {
    clerkUserId: v.string(),
    facilityId: v.id("facilities"),
    startTs: v.number(),
    endTs: v.number(),
    reason: v.optional(v.string()),
    batchRef: v.optional(v.id("batches")),
  },
  handler: async (ctx, { clerkUserId, facilityId, startTs, endTs, reason, batchRef }) => {
    if (!(startTs < endTs)) throw new Error("Invalid time range");

    const facility = await ctx.db.get(facilityId);
    if (!facility) throw new Error("Facility not found");

    // Only CERTIFIER / AUTHORITY / ADMIN can create manual locks
    await requireFunctionalRole(ctx, clerkUserId, facility.orgId, ["CERTIFIER", "AUTHORITY", "ADMIN"]);

    const clash = await hasActiveOverlap(ctx, facilityId, startTs, endTs);
    if (clash) throw new Error("Time period overlaps an existing active lock");

    const actor = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    const id = await ctx.db.insert("periodLocks", {
      facilityId,
      startTs,
      endTs,
      batchRef,
      reason: reason ?? "manual-lock",
      createdBy: (actor?._id as Id<"users">) ?? undefined,
      createdAt: Date.now(),
      releasedAt: undefined,
    });

    return { id };
  },
});

/** Update the window of an existing (unreleased) lock. */
export const updateWindow = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("periodLocks"),
    startTs: v.number(),
    endTs: v.number(),
  },
  handler: async (ctx, { clerkUserId, id, startTs, endTs }) => {
    if (!(startTs < endTs)) throw new Error("Invalid time range");

    const lock = await ctx.db.get(id);
    if (!lock) throw new Error("Lock not found");
    if (lock.releasedAt) throw new Error("Cannot modify a released lock");

    const facility = await ctx.db.get(lock.facilityId);
    if (!facility) throw new Error("Facility not found");

    // Same permissions as create
    await requireFunctionalRole(ctx, clerkUserId, facility.orgId, ["CERTIFIER", "AUTHORITY", "ADMIN"]);

    const clash = await hasActiveOverlap(ctx, lock.facilityId, startTs, endTs, id);
    if (clash) throw new Error("Updated window overlaps another active lock");

    await ctx.db.patch(id, { startTs, endTs });
    return { ok: true };
  },
});

/** Release (end) a lock */
export const release = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("periodLocks"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, id, reason }) => {
    const lock = await ctx.db.get(id);
    if (!lock) return { ok: true };
    if (lock.releasedAt) return { ok: true };

    const facility = await ctx.db.get(lock.facilityId);
    if (!facility) throw new Error("Facility not found");

    // Allow CERTIFIER / AUTHORITY / ADMIN
    await requireFunctionalRole(ctx, clerkUserId, facility.orgId, ["CERTIFIER", "AUTHORITY", "ADMIN"]);

    await ctx.db.patch(id, { releasedAt: Date.now(), reason: reason ?? lock.reason });
    return { ok: true };
  },
});

/** Release all locks tied to a batchRef (e.g., on rejection) */
export const releaseByBatch = mutation({
  args: { clerkUserId: v.string(), batchId: v.id("batches") },
  handler: async (ctx, { clerkUserId, batchId }) => {
    const batch = await ctx.db.get(batchId);
    if (!batch) throw new Error("Batch not found");

    const facility = await ctx.db.get(batch.facilityId);
    if (!facility) throw new Error("Facility not found");

    await requireFunctionalRole(ctx, clerkUserId, facility.orgId, ["CERTIFIER", "AUTHORITY", "ADMIN"]);

    const locks = await ctx.db
      .query("periodLocks")
      .withIndex("byFacility", q => q.eq("facilityId", batch.facilityId))
      .filter(q => q.eq(q.field("batchRef"), batchId))
      .collect();

    for (const L of locks) {
      if (!L.releasedAt) {
        await ctx.db.patch(L._id, { releasedAt: Date.now(), reason: "batch-released" });
      }
    }
    return { released: locks.length };
  },
});

/** Ensure a lock exists for a batch window (idempotent). Useful if you re-sync batches. */
export const ensureForBatch = mutation({
  args: {
    clerkUserId: v.string(),
    batchId: v.id("batches"),
  },
  handler: async (ctx, { clerkUserId, batchId }) => {
    const batch = await ctx.db.get(batchId);
    if (!batch) throw new Error("Batch not found");

    const facility = await ctx.db.get(batch.facilityId);
    if (!facility) throw new Error("Facility not found");

    // Allow PRODUCER to ensure (during propose/update), and CERTIFIER/AUTHORITY/ADMIN
    await requireFunctionalRole(ctx, clerkUserId, facility.orgId, ["PRODUCER", "CERTIFIER", "AUTHORITY", "ADMIN"]);

    const existing = await ctx.db
      .query("periodLocks")
      .withIndex("byFacility", q => q.eq("facilityId", batch.facilityId))
      .filter(q => q.eq(q.field("batchRef"), batchId))
      .first();

    if (existing && !existing.releasedAt) {
      // keep it fresh with the batch window
      const clash = await hasActiveOverlap(ctx, batch.facilityId, batch.startTs, batch.endTs, existing._id);
      if (clash) throw new Error("Batch window conflicts with another active lock");
      await ctx.db.patch(existing._id, { startTs: batch.startTs, endTs: batch.endTs });
      return { id: existing._id, updated: true };
    }

    // otherwise create a new active lock
    const actor = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    const clash = await hasActiveOverlap(ctx, batch.facilityId, batch.startTs, batch.endTs);
    if (clash) throw new Error("Batch window conflicts with another active lock");

    const id = await ctx.db.insert("periodLocks", {
      facilityId: batch.facilityId,
      startTs: batch.startTs,
      endTs: batch.endTs,
      batchRef: batchId,
      reason: "batch-proposal",
      createdBy: (actor?._id as Id<"users">) ?? undefined,
      createdAt: Date.now(),
      releasedAt: undefined,
    });

    return { id, created: true };
  },
});