import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";


// --- Helpers using WebCrypto (browser-safe) ---


async function sha256hex(s: string): Promise<string> {
  const buf = new TextEncoder().encode(s);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function randKey(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getUserByClerk(ctx: any, clerkUserId: string) {
  const u = await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q: any) => q.eq("clerkUserId", clerkUserId))
    .unique();
  if (!u) throw new Error("User not found");
  return u;
}

async function requireAdminInOrg(ctx: any, clerkUserId: string, orgId: Id<"orgs">) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this org");
  const roles = (resolved.roles ?? []) as string[];
  if (!roles.includes("ADMIN")) throw new Error("Insufficient permissions");
}

// ---------------------- Mutations ----------------------

export const create = mutation({
  args: {
    clerkUserId: v.string(),
    ownerOrg: v.id("orgs"),
    name: v.string(),
    scopes: v.array(v.string()),
  },
  handler: async (ctx, { clerkUserId, ownerOrg, name, scopes }) => {
    await requireAdminInOrg(ctx, clerkUserId, ownerOrg);

    const dupe = await ctx.db
      .query("apiKeys")
      .withIndex("byName", q => q.eq("ownerOrg", ownerOrg).eq("name", name.trim()))
      .unique();
    if (dupe) throw new Error("Name already in use for this org");

    const creator = await getUserByClerk(ctx, clerkUserId);
    const raw = randKey();
    const hashedKey = await sha256hex(raw);

    const id = await ctx.db.insert("apiKeys", {
      ownerOrg,
      name: name.trim(),
      hashedKey,
      scopes,
      createdAt: Date.now(),
      createdBy: creator._id,
      lastUsedAt: undefined,
      disabled: false,
    });

    return { id, apiKey: raw };
  },
});

export const rotate = mutation({
  args: { clerkUserId: v.string(), id: v.id("apiKeys") },
  handler: async (ctx, { clerkUserId, id }) => {
    const key = await ctx.db.get(id);
    if (!key) throw new Error("Key not found");
    await requireAdminInOrg(ctx, clerkUserId, key.ownerOrg);

    await ctx.db.patch(id, { disabled: true });

    const creator = await getUserByClerk(ctx, clerkUserId);
    const raw = randKey();
    const hashedKey = await sha256hex(raw);

    const newId = await ctx.db.insert("apiKeys", {
      ownerOrg: key.ownerOrg,
      name: key.name,
      hashedKey,
      scopes: key.scopes,
      createdAt: Date.now(),
      createdBy: creator._id,
      lastUsedAt: undefined,
      disabled: false,
    });

    return { id: newId, apiKey: raw };
  },
});

export const setDisabled = mutation({
  args: { clerkUserId: v.string(), id: v.id("apiKeys"), disabled: v.boolean() },
  handler: async (ctx, { clerkUserId, id, disabled }) => {
    const key = await ctx.db.get(id);
    if (!key) return { ok: true };
    await requireAdminInOrg(ctx, clerkUserId, key.ownerOrg);
    await ctx.db.patch(id, { disabled });
    return { ok: true };
  },
});

export const markUsed = mutation({
  args: { hashedKey: v.string() },
  handler: async (ctx, { hashedKey }) => {
    const rows = await ctx.db.query("apiKeys").collect();
    const found = rows.find(r => r.hashedKey === hashedKey);
    if (found) await ctx.db.patch(found._id, { lastUsedAt: Date.now() });
    return { ok: true };
  },
});

export const deleteApiKey = mutation({
  args: { clerkUserId: v.string(), id: v.id("apiKeys") },
  handler: async (ctx, { clerkUserId, id }) => {
    const key = await ctx.db.get(id);
    if (!key) return { ok: true };
    await requireAdminInOrg(ctx, clerkUserId, key.ownerOrg);
    await ctx.db.delete(id);
    return { ok: true };
  },
});

export const revokeApiKey = mutation({
  args: { clerkUserId: v.string(), id: v.id("apiKeys") },
  handler: async (ctx, { clerkUserId, id }) => {
    const key = await ctx.db.get(id);
    if (!key) return { ok: true };
    await requireAdminInOrg(ctx, clerkUserId, key.ownerOrg);
    await ctx.db.patch(id, { disabled: true });
    return { ok: true };
  },
});

// ---------------------- Queries ----------------------

export const validate = query({
  args: { apiKey: v.string() },
  handler: async (ctx, { apiKey }) => {
    const hash = await sha256hex(apiKey);
    const rows = await ctx.db.query("apiKeys").collect();
    return rows.find(r => r.hashedKey === hash && !r.disabled) ?? null;
  },
});

export const listByOwner = query({
  args: { ownerOrg: v.id("orgs") },
  handler: async (ctx, { ownerOrg }) => {
    return await ctx.db.query("apiKeys").withIndex("byOwner", q => q.eq("ownerOrg", ownerOrg)).collect();
  },
});

export const getByName = query({
  args: { ownerOrg: v.id("orgs"), name: v.string() },
  handler: async (ctx, { ownerOrg, name }) => {
    return await ctx.db
      .query("apiKeys")
      .withIndex("byName", q => q.eq("ownerOrg", ownerOrg).eq("name", name.trim()))
      .unique();
  },
});