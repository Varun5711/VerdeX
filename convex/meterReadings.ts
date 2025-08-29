// convex/meterReadings.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ---------- Helpers ----------

async function requireOrgRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  allowed: Array<"ADMIN" | "PRODUCER">
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok =
    roles.includes("ADMIN") ||
    (allowed.includes("PRODUCER") && roles.includes("PRODUCER")) ||
    (allowed.includes("ADMIN") && roles.includes("ADMIN"));
  if (!ok) throw new Error("Insufficient permissions");
}

function normalize(s?: string | null) {
  return (s ?? "").trim();
}

/** detect any reading overlapping [start,end) for a given meter */
async function hasOverlap(
  ctx: any,
  meterId: Id<"meters">,
  start: number,
  end: number,
  excludeId?: Id<"meterReadings">
) {
  // Fetch candidates starting before `end` and (optionally) after a window near `start`
  // Use byMeterTime (keyed on meterId, tsStart) then filter by overlap rule.
  const candidates = await ctx.db
    .query("meterReadings")
    .withIndex("byMeterTime", q => q.eq("meterId", meterId).lt("tsStart", end))
    .take(1000);

  for (const r of candidates) {
    if (excludeId && r._id.toString() === excludeId.toString()) continue;
    // overlap if start < r.tsEnd && end > r.tsStart
    if (start < r.tsEnd && end > r.tsStart) return true;
  }
  return false;
}

// ================== Create ==================

export const add = mutation({
  args: {
    clerkUserId: v.string(),
    meterId: v.id("meters"),
    tsStart: v.number(),
    tsEnd: v.number(),
    value: v.string(), // decimal string
    docRef: v.optional(v.id("docs")),
    hash: v.optional(v.string()), // hex of raw slice (optional)
    flagged: v.optional(v.boolean()),
    flagReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!(args.tsStart < args.tsEnd)) throw new Error("Invalid time range");

    const meter = await ctx.db.get(args.meterId);
    if (!meter) throw new Error("Meter not found");
    const facility = await ctx.db.get(meter.facilityId);
    if (!facility) throw new Error("Facility not found");

    await requireOrgRole(ctx, args.clerkUserId, facility.orgId, ["ADMIN", "PRODUCER"]);

    // prevent overlaps
    const overlap = await hasOverlap(ctx, args.meterId, args.tsStart, args.tsEnd);
    if (overlap) throw new Error("Reading overlaps an existing interval");

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    const readingId = await ctx.db.insert("meterReadings", {
      meterId: args.meterId,
      tsStart: args.tsStart,
      tsEnd: args.tsEnd,
      value: normalize(args.value),
      docRef: args.docRef,
      hash: args.hash,
      importedBy: (me?._id as Id<"users">) ?? undefined,
      importedAt: Date.now(),
      locked: false,
      flagged: args.flagged ?? false,
      flagReason: args.flagReason,
    });

    return { readingId };
  },
});

export const importBulk = mutation({
  args: {
    clerkUserId: v.string(),
    meterId: v.id("meters"),
    rows: v.array(
      v.object({
        tsStart: v.number(),
        tsEnd: v.number(),
        value: v.string(),
        docRef: v.optional(v.id("docs")),
        hash: v.optional(v.string()),
      })
    ),
    skipOverlapCheck: v.optional(v.boolean()), // set true if pre-deduped
  },
  handler: async (ctx, { clerkUserId, meterId, rows, skipOverlapCheck }) => {
    const meter = await ctx.db.get(meterId);
    if (!meter) throw new Error("Meter not found");
    const facility = await ctx.db.get(meter.facilityId);
    if (!facility) throw new Error("Facility not found");

    await requireOrgRole(ctx, clerkUserId, facility.orgId, ["ADMIN", "PRODUCER"]);

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    let inserted = 0;
    for (const r of rows) {
      if (!(r.tsStart < r.tsEnd)) continue;

      if (!skipOverlapCheck) {
        const overlap = await hasOverlap(ctx, meterId, r.tsStart, r.tsEnd);
        if (overlap) continue;
      }

      await ctx.db.insert("meterReadings", {
        meterId,
        tsStart: r.tsStart,
        tsEnd: r.tsEnd,
        value: normalize(r.value),
        docRef: r.docRef,
        hash: r.hash,
        importedBy: (me?._id as Id<"users">) ?? undefined,
        importedAt: Date.now(),
        locked: false,
        flagged: false,
        flagReason: undefined,
      });
      inserted++;
    }
    return { inserted };
  },
});

// ================== Update ==================

export const update = mutation({
  args: {
    clerkUserId: v.string(),
    readingId: v.id("meterReadings"),
    // Any field below is optional; only provided keys are patched
    tsStart: v.optional(v.number()),
    tsEnd: v.optional(v.number()),
    value: v.optional(v.string()),
    docRef: v.optional(v.id("docs")),
    hash: v.optional(v.string()),
    flagged: v.optional(v.boolean()),
    flagReason: v.optional(v.string()),
    lock: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const reading = await ctx.db.get(args.readingId);
    if (!reading) throw new Error("Reading not found");
    const meter = await ctx.db.get(reading.meterId);
    if (!meter) throw new Error("Meter missing");
    const facility = await ctx.db.get(meter.facilityId);
    if (!facility) throw new Error("Facility missing");

    await requireOrgRole(ctx, args.clerkUserId, facility.orgId, ["ADMIN", "PRODUCER"]);
    if (reading.locked && args.lock !== false) {
      // if locked, only allow unlocking (lock=false) or flag-related updates
      const allowedOnlyFlagOps =
        typeof args.flagged !== "undefined" ||
        typeof args.flagReason !== "undefined";
      if (!allowedOnlyFlagOps) throw new Error("Reading is locked");
    }

    const nextStart = args.tsStart ?? reading.tsStart;
    const nextEnd = args.tsEnd ?? reading.tsEnd;
    if (!(nextStart < nextEnd)) throw new Error("Invalid time range");

    // overlap check if time window changes
    if (args.tsStart !== undefined || args.tsEnd !== undefined) {
      const overlap = await hasOverlap(ctx, reading.meterId, nextStart, nextEnd, args.readingId);
      if (overlap) throw new Error("Updated interval overlaps another reading");
    }

    const patch: any = {};
    if (args.tsStart !== undefined) patch.tsStart = args.tsStart;
    if (args.tsEnd !== undefined) patch.tsEnd = args.tsEnd;
    if (args.value !== undefined) patch.value = normalize(args.value);
    if (args.docRef !== undefined) patch.docRef = args.docRef;
    if (args.hash !== undefined) patch.hash = args.hash;
    if (args.flagged !== undefined) patch.flagged = args.flagged;
    if (args.flagReason !== undefined) patch.flagReason = args.flagReason;
    if (args.lock !== undefined) patch.locked = args.lock;

    if (Object.keys(patch).length) await ctx.db.patch(args.readingId, patch);
    return { ok: true };
  },
});

// ================== Delete ==================

export const remove = mutation({
  args: { clerkUserId: v.string(), readingId: v.id("meterReadings") },
  handler: async (ctx, { clerkUserId, readingId }) => {
    const reading = await ctx.db.get(readingId);
    if (!reading) return { ok: true };
    const meter = await ctx.db.get(reading.meterId);
    if (!meter) throw new Error("Meter missing");
    const facility = await ctx.db.get(meter.facilityId);
    if (!facility) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, facility.orgId, ["ADMIN"]);
    await ctx.db.delete(readingId);
    return { ok: true };
  },
});

// ================== Get/List ==================

export const get = query({
  args: { readingId: v.id("meterReadings") },
  handler: async (ctx, { readingId }) => {
    return await ctx.db.get(readingId);
  },
});

export const list = query({
  args: {
    meterId: v.id("meters"),
    from: v.optional(v.number()),
    to: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { meterId, from, to, limit }) => {
    // Prefer byMeterTime when 'from' is provided for efficient range scan
    let rows: any[];
    if (from !== undefined) {
      rows = await ctx.db
        .query("meterReadings")
        .withIndex("byMeterTime", q => q.eq("meterId", meterId).gte("tsStart", from))
        .take(1000);
    } else {
      rows = await ctx.db
        .query("meterReadings")
        .withIndex("byMeter", q => q.eq("meterId", meterId))
        .take(1000);
    }
    if (to !== undefined) rows = rows.filter(r => r.tsEnd <= to);
    rows.sort((a, b) => a.tsStart - b.tsStart);
    return rows.slice(0, limit ?? 200);
  },
});