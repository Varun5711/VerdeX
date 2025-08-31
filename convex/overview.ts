// convex/overview.ts
import { query } from "./_generated/server";

export const getGlobalStats = query({
  args: {},
  handler: async (ctx) => {
    // Get all entities
    const facilities = await ctx.db.query("facilities").collect();
    const batches = await ctx.db.query("batches").collect();
    const retirements = await ctx.db.query("retirements").collect();

    // Calculate total credits
    const totalCredits = batches.reduce((sum, batch) => {
      return sum + parseFloat(batch.amount);
    }, 0);

    // Calculate on-chain credits (only issued batches)
    const onChainCredits = batches
      .filter(batch => batch.status === "ISSUED" && batch.chain?.registry)
      .reduce((sum, batch) => {
        return sum + parseFloat(batch.amount);
      }, 0);

    // Calculate total retired credits
    const totalRetired = retirements.reduce((sum, retirement) => {
      return sum + parseFloat(retirement.amount);
    }, 0);

    return {
      facilities: facilities.length,
      batches: batches.length,
      retirements: retirements.length,
      totalCredits,
      onChainCredits,
      totalRetired,
    };
  },
});

export const getOrgStats = query({
  args: { orgId: "string" },
  handler: async (ctx, args) => {
    // Get organization-specific entities
    const facilities = await ctx.db
      .query("facilities")
      .withIndex("byOrg", q => q.eq("orgId", args.orgId))
      .collect();
    
    const batches = await ctx.db
      .query("batches")
      .withIndex("byProducerOrg", q => q.eq("producerOrg", args.orgId))
      .collect();
    
    const meters = await ctx.db
      .query("meters")
      .withIndex("byOrg", q => q.eq("orgId", args.orgId))
      .collect();
    
    const certificates = await ctx.db
      .query("certificates")
      .withIndex("byOrg", q => q.eq("orgId", args.orgId))
      .collect();
    
    const retirements = await ctx.db
      .query("retirements")
      .withIndex("byOrg", q => q.eq("orgId", args.orgId))
      .collect();
    
    const documents = await ctx.db
      .query("docs")
      .withIndex("byOrg", q => q.eq("orgId", args.orgId))
      .collect();

    // Calculate total credits
    const totalCredits = batches.reduce((sum, batch) => {
      return sum + parseFloat(batch.amount);
    }, 0);

    // Calculate on-chain credits (only issued batches)
    const onChainCredits = batches
      .filter(batch => batch.status === "ISSUED" && batch.chain?.registry)
      .reduce((sum, batch) => {
        return sum + parseFloat(batch.amount);
      }, 0);

    // Calculate total retired credits
    const totalRetired = retirements.reduce((sum, retirement) => {
      return sum + parseFloat(retirement.amount);
    }, 0);

    return {
      facilities: facilities.length,
      batches: batches.length,
      meters: meters.length,
      certificates: certificates.length,
      retirements: retirements.length,
      documents: documents.length,
      totalCredits,
      onChainCredits,
      totalRetired,
    };
  },
});

export const getRecentActivity = query({
  args: {},
  handler: async (ctx) => {
    // Get recent audit log entries
    const recentActivity = await ctx.db
      .query("auditLog")
      .withIndex("byActor", q => q.eq("actor", "system"))
      .order("desc")
      .take(20);

    return recentActivity.map(activity => ({
      _id: activity._id,
      action: activity.action,
      targetTable: activity.targetTable,
      targetId: activity.targetId,
      at: activity.at,
      meta: activity.meta,
    }));
  },
});

export const getBatchStats = query({
  args: {},
  handler: async (ctx) => {
    const batches = await ctx.db.query("batches").collect();
    
    // Group by status
    const statusCounts = batches.reduce((acc, batch) => {
      acc[batch.status] = (acc[batch.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by month (last 12 months)
    const monthlyCredits = new Array(12).fill(0);
    const now = Date.now();
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    batches.forEach(batch => {
      if (batch.status === "ISSUED") {
        const monthsAgo = Math.floor((now - batch.issuedAt!) / oneMonth);
        if (monthsAgo < 12) {
          monthlyCredits[11 - monthsAgo] += parseFloat(batch.amount);
        }
      }
    });

    return {
      statusCounts,
      monthlyCredits,
      totalBatches: batches.length,
      totalCredits: batches.reduce((sum, b) => sum + parseFloat(b.amount), 0),
    };
  },
});

export const getFacilityStats = query({
  args: {},
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();
    
    // Group by country
    const countryCounts = facilities.reduce((acc, facility) => {
      acc[facility.location.country] = (acc[facility.location.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by electrolyzer type
    const techCounts = facilities.reduce((acc, facility) => {
      if (facility.tech?.electrolyzerType) {
        acc[facility.tech.electrolyzerType] = (acc[facility.tech.electrolyzerType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Total capacity
    const totalCapacity = facilities.reduce((sum, facility) => {
      return sum + (facility.tech?.capacityMW ? parseFloat(facility.tech.capacityMW) : 0);
    }, 0);

    return {
      countryCounts,
      techCounts,
      totalFacilities: facilities.length,
      totalCapacity,
    };
  },
});