// convex/meters.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ---- Role validator (match your schema) ----
const RoleV = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);

// ---- helpers ----
async function requireOrgRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  allowedFunctional: Array<"ADMIN" | "PRODUCER">
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  const ok =
    roles.includes("ADMIN") ||
    (allowedFunctional.includes("PRODUCER") && roles.includes("PRODUCER")) ||
    (allowedFunctional.includes("ADMIN") && roles.includes("ADMIN"));
  if (!ok) throw new Error("Insufficient permissions");
}

function normalize(s?: string | null) {
  return (s ?? "").trim();
}

// ================== METERS (CRUD) ==================

export const create = mutation({
  args: {
    clerkUserId: v.string(),
    facilityId: v.id("facilities"),
    meterId: v.string(), // unique per facility
    unit: v.string(), // "kWh", "kgH2", ...
    kind: v.union(
      v.literal("PRODUCTION"),
      v.literal("ELECTRICITY"),
      v.literal("WATER"),
      v.literal("OTHER")
    ),
    calibrationDoc: v.optional(v.string()), // CID or object key
  },
  handler: async (ctx, args) => {
    const fac = await ctx.db.get(args.facilityId);
    if (!fac) throw new Error("Facility not found");

    await requireOrgRole(ctx, args.clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    const code = normalize(args.meterId);
    if (!code) throw new Error("meterId required");

    // Uniqueness per facility
    const exists = await ctx.db
      .query("meters")
      .withIndex("byFacilityMeter", q => q.eq("facilityId", args.facilityId).eq("meterId", code))
      .unique();
    if (exists) throw new Error("meterId already exists in this facility");

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    const _id = await ctx.db.insert("meters", {
      facilityId: args.facilityId,
      meterId: code,
      unit: normalize(args.unit),
      kind: args.kind,
      calibrationDoc: args.calibrationDoc,
      createdAt: Date.now(),
      createdBy: (me?._id as Id<"users">) ?? undefined,
    });

    return { meterId: _id };
  },
});

export const update = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("meters"),
    unit: v.optional(v.string()),
    kind: v.optional(
      v.union(
        v.literal("PRODUCTION"),
        v.literal("ELECTRICITY"),
        v.literal("WATER"),
        v.literal("OTHER")
      )
    ),
    calibrationDoc: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, id, unit, kind, calibrationDoc }) => {
    const meter = await ctx.db.get(id);
    if (!meter) throw new Error("Meter not found");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    const patch: any = {};
    if (typeof unit !== "undefined") patch.unit = normalize(unit);
    if (typeof kind !== "undefined") patch.kind = kind;
    if (typeof calibrationDoc !== "undefined") patch.calibrationDoc = calibrationDoc;

    if (Object.keys(patch).length) await ctx.db.patch(id, patch);
    return { ok: true };
  },
});

export const remove = mutation({
  args: { clerkUserId: v.string(), id: v.id("meters") },
  handler: async (ctx, { clerkUserId, id }) => {
    const meter = await ctx.db.get(id);
    if (!meter) return { ok: true };
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN"]);

    // prevent deletion if readings exist
    const anyReading = await ctx.db
      .query("meterReadings")
      .withIndex("byMeter", q => q.eq("meterId", id))
      .first();
    if (anyReading) throw new Error("Delete readings first");

    await ctx.db.delete(id);
    return { ok: true };
  },
});

export const get = query({
  args: { id: v.id("meters") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listByFacility = query({
  args: { facilityId: v.id("facilities") },
  handler: async (ctx, { facilityId }) => {
    return await ctx.db
      .query("meters")
      .withIndex("byFacility", q => q.eq("facilityId", facilityId))
      .collect();
  },
});

// ================== READINGS ==================

export const addReading = mutation({
  args: {
    clerkUserId: v.string(),
    meterId: v.id("meters"),
    tsStart: v.number(),
    tsEnd: v.number(),
    value: v.string(), // decimal string
    docRef: v.optional(v.id("docs")),
    hash: v.optional(v.string()), // hex
    flagged: v.optional(v.boolean()),
    flagReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const meter = await ctx.db.get(args.meterId);
    if (!meter) throw new Error("Meter not found");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, args.clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    if (!(args.tsStart < args.tsEnd)) throw new Error("Invalid time range");

    // Prevent exact-duplicate intervals
    const dupe = await ctx.db
      .query("meterReadings")
      .withIndex("byMeterTime", q => q.eq("meterId", args.meterId).gte("tsStart", args.tsStart))
      .filter(q => q.and(q.eq(q.field("tsStart"), args.tsStart), q.eq(q.field("tsEnd"), args.tsEnd)))
      .first();
    if (dupe) throw new Error("Reading for this interval already exists");

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

export const importReadingsBulk = mutation({
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
  },
  handler: async (ctx, { clerkUserId, meterId, rows }) => {
    const meter = await ctx.db.get(meterId);
    if (!meter) throw new Error("Meter not found");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    let inserted = 0;
    for (const r of rows) {
      if (!(r.tsStart < r.tsEnd)) continue;

      const dupe = await ctx.db
        .query("meterReadings")
        .withIndex("byMeterTime", q => q.eq("meterId", meterId).gte("tsStart", r.tsStart))
        .filter(q => q.and(q.eq(q.field("tsStart"), r.tsStart), q.eq(q.field("tsEnd"), r.tsEnd)))
        .first();
      if (dupe) continue;

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

export const listReadings = query({
  args: {
    meterId: v.id("meters"),
    from: v.optional(v.number()),
    to: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { meterId, from, to, limit }) => {
    // If a 'from' is provided, use byMeterTime; else use byMeter
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

export const lockReading = mutation({
  args: {
    clerkUserId: v.string(),
    readingId: v.id("meterReadings"),
    lock: v.boolean(),
  },
  handler: async (ctx, { clerkUserId, readingId, lock }) => {
    const reading = await ctx.db.get(readingId);
    if (!reading) throw new Error("Reading not found");
    const meter = await ctx.db.get(reading.meterId);
    if (!meter) throw new Error("Meter missing");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);
    await ctx.db.patch(readingId, { locked: lock });
    return { ok: true };
  },
});

export const flagReading = mutation({
  args: {
    clerkUserId: v.string(),
    readingId: v.id("meterReadings"),
    flagged: v.boolean(),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, readingId, flagged, reason }) => {
    const reading = await ctx.db.get(readingId);
    if (!reading) throw new Error("Reading not found");
    const meter = await ctx.db.get(reading.meterId);
    if (!meter) throw new Error("Meter missing");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);
    await ctx.db.patch(readingId, { flagged, flagReason: reason });
    return { ok: true };
  },
});