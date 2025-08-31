// convex/auditLogs.ts
import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";



/**
 * append an audit log entry
 * - internal only (call from your mutations when sensitive ops happen)
 * - meta: JSON string for extra info
 */
export const append = internalMutation({
  args: {
    actor: v.id("users"),
    action: v.string(),         // e.g., "APIKEY_CREATE", "BATCH_ISSUED"
    targetTable: v.string(),    // e.g., "apiKeys", "batches"
    targetId: v.string(),       // string (hex, docId, etc.)
    meta: v.string(),           // JSON-encoded
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

// ================== Queries ==================

/** get a single entry */
export const get = query({
  args: { id: v.id("auditLog") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

/** list entries for a given target (newest → oldest) */
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

/** list entries by actor (newest → oldest) */
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

/** recent global log entries */
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("auditLog").take(1000);
    rows.sort((a, b) => b.at - a.at);
    return rows.slice(0, limit ?? 200);
  },
});

/** list entries for a given organization */
export const listByOrg = query({
  args: { orgId: v.id("orgs"), limit: v.optional(v.number()) },
  handler: async (ctx, { orgId, limit }) => {
    const rows = await ctx.db
      .query("auditLog")
      .withIndex("byOrg", q => q.eq("orgId", orgId))
      .take(1000);
    rows.sort((a, b) => b.timestamp - a.timestamp);
    return rows.slice(0, limit ?? 200);
  },
});