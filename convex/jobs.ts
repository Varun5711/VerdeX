// convex/jobs.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


/**
 * Note: your schema uses a `JobStatus` validator.
 * For args, we'll accept string status values and rely on schema validation on write.
 */

// ----------------- Mutations -----------------

export const enqueue = mutation({
  args: {
    kind: v.string(),         // e.g., "IMPORT_CSV", "SYNC_CHAIN", ...
    params: v.string(),       // JSON string
    createdBy: v.optional(v.id("users")),
  },
  handler: async (ctx, { kind, params, createdBy }) => {
    const id = await ctx.db.insert("jobs", {
      kind,
      status: "PENDING" as any,
      params,
      createdAt: Date.now(),
      startedAt: undefined,
      finishedAt: undefined,
      error: undefined,
      createdBy,
    });
    return { id };
  },
});

export const start = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => {
    const job = await ctx.db.get(id);
    if (!job) throw new Error("Job not found");
    if (job.status !== "PENDING") return { ok: true };
    await ctx.db.patch(id, { status: "RUNNING" as any, startedAt: Date.now(), error: undefined });
    return { ok: true };
  },
});

export const succeed = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => {
    const job = await ctx.db.get(id);
    if (!job) throw new Error("Job not found");
    await ctx.db.patch(id, { status: "SUCCESS" as any, finishedAt: Date.now(), error: undefined });
    return { ok: true };
  },
});

export const fail = mutation({
  args: { id: v.id("jobs"), error: v.string() },
  handler: async (ctx, { id, error }) => {
    const job = await ctx.db.get(id);
    if (!job) throw new Error("Job not found");
    await ctx.db.patch(id, { status: "FAILED" as any, finishedAt: Date.now(), error });
    return { ok: true };
  },
});

// ----------------- Queries -----------------

export const get = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const listByKind = query({
  args: { kind: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { kind, limit }) => {
    const rows = await ctx.db
      .query("jobs")
      .withIndex("byKind", q => q.eq("kind", kind))
      .take(1000);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 200);
  },
});

export const listByStatus = query({
  args: { status: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { status, limit }) => {
    const rows = await ctx.db
      .query("jobs")
      .withIndex("byStatus", q => q.eq("status", status as any))
      .take(1000);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 200);
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("jobs").take(1000);
    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows.slice(0, limit ?? 200);
  },
});