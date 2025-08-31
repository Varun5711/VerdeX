// convex/facilities.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";


// --- role enum (match schema) ---
const RoleV = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);

// --- helpers ---
async function requireOrgRole(
  ctx: any,
  clerkUserId: string,
  orgId: Id<"orgs">,
  allowed: Array<"ADMIN" | "PRODUCER">
) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this organization");
  const roles: string[] = (resolved.roles ?? []) as string[];
  // allow global ADMIN or org-scoped PRODUCER/ADMIN (per your app policy)
  const ok =
    roles.includes("ADMIN") ||
    (allowed.includes("PRODUCER") && roles.includes("PRODUCER")) ||
    (allowed.includes("ADMIN") && roles.includes("ADMIN"));
  if (!ok) throw new Error("Insufficient permissions");
}

function normalizeStr(s?: string | null) {
  return (s ?? "").trim();
}

// ======================= FACILITIES =======================

export const get = query({
  args: { id: v.id("facilities") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
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
    
    if (memberships.length === 0) return [];
    
    // Get all org IDs the user is a member of
    const userOrgIds = memberships.map(m => m.orgId);
    
    // Filter facilities by user's organizations
    const facilities = await ctx.db
      .query("facilities")
      .withIndex("byOrg", q => q.eq("orgId", userOrgIds[0]))
      .collect();
    
    // If user has multiple orgs, get facilities from all of them
    if (userOrgIds.length > 1) {
      for (let i = 1; i < userOrgIds.length; i++) {
        const additionalFacilities = await ctx.db
          .query("facilities")
          .withIndex("byOrg", q => q.eq("orgId", userOrgIds[i]))
          .collect();
        facilities.push(...additionalFacilities);
      }
    }
    
    return facilities;
  },
});

import { nanoid } from "nanoid";

export const createFacility = mutation({
  args: {
    clerkUserId: v.string(),
    facilityId: v.optional(v.string()),   // 👈 make optional
    orgId: v.id("orgs"),
    name: v.string(),
    location: v.object({
      country: v.string(),
      region: v.optional(v.string()),
      gridZone: v.optional(v.string()),
      lat: v.optional(v.float64()),
      lon: v.optional(v.float64()),
    }),
    tech: v.optional(
      v.object({
        electrolyzerType: v.optional(v.string()),
        capacityMW: v.optional(v.string()),
        renewableSource: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { clerkUserId, facilityId, orgId, name, location, tech }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!user) throw new Error("User not found");

    const id = await ctx.db.insert("facilities", {
      facilityId: facilityId ?? `fac_${nanoid(8)}`, // 👈 fallback auto-generate
      orgId,
      name,
      location,
      tech,
      createdBy: user._id,
      createdAt: Date.now(),
    });

    return id;
  },
});


export const updateFacility = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("facilities"),
    name: v.optional(v.string()),
    location: v.optional(
      v.object({
        country: v.string(),
        region: v.optional(v.string()),
        lat: v.optional(v.number()),
        lon: v.optional(v.number()),
        gridZone: v.optional(v.string()),
      })
    ),
    tech: v.optional(
      v.object({
        electrolyzerType: v.optional(v.string()),
        capacityMW: v.optional(v.string()),
        renewableSource: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { clerkUserId, id, name, location, tech }) => {
    const fac = await ctx.db.get(id);
    if (!fac) throw new Error("Facility not found");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["PRODUCER"]);

    const patch: any = {};
    if (typeof name !== "undefined") patch.name = normalizeStr(name);
    if (typeof location !== "undefined") patch.location = location;
    if (typeof tech !== "undefined") patch.tech = tech;

    if (Object.keys(patch).length === 0) return { ok: true };
    await ctx.db.patch(id, patch);
    return { ok: true };
  },
});

export const deleteFacility = mutation({
  args: { clerkUserId: v.string(), id: v.id("facilities") },
  handler: async (ctx, { clerkUserId, id }) => {
    const fac = await ctx.db.get(id);
    if (!fac) return { ok: true };

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN"]);

    // Safety: prevent deletion if meters or periodLocks/batches exist.
    const meters = await ctx.db.query("meters").withIndex("byFacility", q => q.eq("facilityId", id)).first();
    if (meters) throw new Error("Delete or move meters before deleting facility");

    const anyLocks = await ctx.db.query("periodLocks").withIndex("byFacility", q => q.eq("facilityId", id)).first();
    if (anyLocks) throw new Error("There are period locks for this facility; cannot delete");

    const anyBatches = await ctx.db.query("batches").withIndex("byFacility", q => q.eq("facilityId", id)).first();
    if (anyBatches) throw new Error("There are batches for this facility; cannot delete");

    await ctx.db.delete(id);
    return { ok: true };
  },
});

export const getFacility = query({
  args: { id: v.id("facilities") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getFirst = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("facilities").first();
  },
});

export const listFacilities = query({
  args: { orgId: v.id("orgs"), limit: v.optional(v.number()) },
  handler: async (ctx, { orgId, limit }) => {
    return await ctx.db.query("facilities").withIndex("byOrg", q => q.eq("orgId", orgId)).take(limit ?? 50);
  },
});

// ======================= METERS =======================

export const createMeter = mutation({
  args: {
    clerkUserId: v.string(),
    facilityId: v.id("facilities"),
    meterId: v.string(), // unique per facility
    unit: v.string(), // "kWh", "kgH2", ...
    kind: v.union(v.literal("PRODUCTION"), v.literal("ELECTRICITY"), v.literal("WATER"), v.literal("OTHER")),
    calibrationDoc: v.optional(v.string()), // CID or object key
  },
  handler: async (ctx, args) => {
    const fac = await ctx.db.get(args.facilityId);
    if (!fac) throw new Error("Facility not found");
    await requireOrgRole(ctx, args.clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    const code = normalizeStr(args.meterId);
    if (!code) throw new Error("meterId required");

    // Uniqueness per facility
    const existing = await ctx.db
      .query("meters")
      .withIndex("byFacilityMeter", q => q.eq("facilityId", args.facilityId).eq("meterId", code))
      .unique();
    if (existing) throw new Error("meterId already exists in this facility");

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    const _id = await ctx.db.insert("meters", {
      facilityId: args.facilityId,
      meterId: code,
      unit: normalizeStr(args.unit),
      kind: args.kind,
      calibrationDoc: args.calibrationDoc,
      createdAt: Date.now(),
      createdBy: me?._id as Id<"users">,
    });

    return { meterId: _id };
  },
});

export const updateMeter = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("meters"),
    unit: v.optional(v.string()),
    kind: v.optional(v.union(v.literal("PRODUCTION"), v.literal("ELECTRICITY"), v.literal("WATER"), v.literal("OTHER"))),
    calibrationDoc: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, id, unit, kind, calibrationDoc }) => {
    const meter = await ctx.db.get(id);
    if (!meter) throw new Error("Meter not found");
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");
    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN", "PRODUCER"]);

    const patch: any = {};
    if (typeof unit !== "undefined") patch.unit = normalizeStr(unit);
    if (typeof kind !== "undefined") patch.kind = kind;
    if (typeof calibrationDoc !== "undefined") patch.calibrationDoc = calibrationDoc;

    if (Object.keys(patch).length === 0) return { ok: true };
    await ctx.db.patch(id, patch);
    return { ok: true };
  },
});

export const deleteMeter = mutation({
  args: { clerkUserId: v.string(), id: v.id("meters") },
  handler: async (ctx, { clerkUserId, id }) => {
    const meter = await ctx.db.get(id);
    if (!meter) return { ok: true };
    const fac = await ctx.db.get(meter.facilityId);
    if (!fac) throw new Error("Facility missing");

    await requireOrgRole(ctx, clerkUserId, fac.orgId, ["ADMIN"]);

    // Prevent deletion if readings exist
    const anyReading = await ctx.db.query("meterReadings").withIndex("byMeter", q => q.eq("meterId", id)).first();
    if (anyReading) throw new Error("Delete readings before deleting this meter");

    await ctx.db.delete(id);
    return { ok: true };
  },
});

export const listMeters = query({
  args: { facilityId: v.id("facilities") },
  handler: async (ctx, { facilityId }) => {
    return await ctx.db.query("meters").withIndex("byFacility", q => q.eq("facilityId", facilityId)).collect();
  },
  
});

export const listByOrg = query({
  args: { orgId: v.id("orgs") },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("facilities")
      .withIndex("byOrg", q => q.eq("orgId", orgId))
      .collect();
  },
});

// ======================= READINGS =======================

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

    // Optional: prevent exact-duplicate intervals for this meter
    const exists = await ctx.db
      .query("meterReadings")
      .withIndex("byMeterTime", q => q.eq("meterId", args.meterId).gte("tsStart", args.tsStart))
      .filter(q => q.and(q.eq(q.field("tsStart"), args.tsStart), q.eq(q.field("tsEnd"), args.tsEnd)))
      .first();
    if (exists) throw new Error("Reading for this interval already exists");

    const me = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    const _id = await ctx.db.insert("meterReadings", {
      meterId: args.meterId,
      tsStart: args.tsStart,
      tsEnd: args.tsEnd,
      value: normalizeStr(args.value),
      docRef: args.docRef,
      hash: args.hash,
      importedBy: me?._id as Id<"users">,
      importedAt: Date.now(),
      locked: false,
      flagged: args.flagged ?? false,
      flagReason: args.flagReason,
    });

    return { readingId: _id };
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

    let count = 0;
    for (const r of rows) {
      if (!(r.tsStart < r.tsEnd)) continue;
      // de-dupe exact intervals
      const exists = await ctx.db
        .query("meterReadings")
        .withIndex("byMeterTime", q => q.eq("meterId", meterId).gte("tsStart", r.tsStart))
        .filter(q => q.and(q.eq(q.field("tsStart"), r.tsStart), q.eq(q.field("tsEnd"), r.tsEnd)))
        .first();
      if (exists) continue;

      await ctx.db.insert("meterReadings", {
        meterId,
        tsStart: r.tsStart,
        tsEnd: r.tsEnd,
        value: normalizeStr(r.value),
        docRef: r.docRef,
        hash: r.hash,
        importedBy: me?._id as Id<"users">,
        importedAt: Date.now(),
        locked: false,
        flagged: false,
        flagReason: undefined,
      });
      count++;
    }
    return { inserted: count };
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
    let q = ctx.db.query("meterReadings").withIndex("byMeter", qb => qb.eq("meterId", meterId));
    if (from !== undefined) {
      q = ctx.db.query("meterReadings").withIndex("byMeterTime", qb => qb.eq("meterId", meterId).gte("tsStart", from));
    }
    let rows = await q.take(1000);
    if (to !== undefined) rows = rows.filter(r => r.tsEnd <= to);
    rows.sort((a, b) => a.tsStart - b.tsStart);
    return rows.slice(0, limit ?? 200);
  },
});

export const lockReading = mutation({
  args: { clerkUserId: v.string(), readingId: v.id("meterReadings"), lock: v.boolean() },
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