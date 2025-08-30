// convex/auditLog.ts
import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";


/** append an audit log entry (internal; call from server actions/mutations) */
export const append = internalMutation({
  args: {
    actor: v.id("users"),
    action: v.string(),         // e.g., "APIKEY_CREATE"
    targetTable: v.string(),    // "apiKeys" | "batches" | ...
    targetId: v.string(),
    meta: v.string(),           // JSON string payload
  },
  handler: async (ctx, { actor, action, targetTable, targetId, meta }) => {
    await ctx.db.insert("auditLog", {
      actor,
      action,
      targetTable,
      targetId,
      at: Date.now(),
      meta,
    });
  },
});

/** list by target (newest→oldest) */
export const listByTarget = query({
  args: { targetTable: v.string(), targetId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { targetTable, targetId, limit }) => {
    const rows = await ctx.db
      .query("auditLog")
      .withIndex("byTarget", q => q.eq("targetTable", targetTable).eq("targetId", targetId))
      .take(1000);
    rows.sort((a, b) => b.at - a.at);
    return rows.slice(0, limit ?? 200);
  },
});

/** list by actor (newest→oldest) */
export const listByActor = query({
  args: { actor: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, { actor, limit }) => {
    const rows = await ctx.db
      .query("auditLog")
      .withIndex("byActor", q => q.eq("actor", actor))
      .take(1000);
    rows.sort((a, b) => b.at - a.at);
    return rows.slice(0, limit ?? 200);
  },
});

/** recent global (newest→oldest) */
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("auditLog").take(1000);
    rows.sort((a, b) => b.at - a.at);
    return rows.slice(0, limit ?? 200);
  },
});