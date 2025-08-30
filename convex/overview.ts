// convex/overview.ts
import { query } from "./_generated/server";


export const getGlobalStats = query({
  args: {},
  handler: async (ctx) => {
    // Example: aggregate batches / facilities / retirements
    const facilities = await ctx.db.query("facilities").collect();
    const batches = await ctx.db.query("batches").collect();
    const retirements = await ctx.db.query("retirements").collect();

    return {
      facilities: facilities.length,
      batches: batches.length,
      retirements: retirements.length,
    };
  },
});