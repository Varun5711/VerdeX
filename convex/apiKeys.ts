// convex/apikeys.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

function sha256hex(s: string) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}
function randKey(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex"); // 64 hex chars
}
async function getUserByClerk(ctx: any, clerkUserId: string) {
  const u = await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q: any) => q.eq("clerkUserId", clerkUserId))
    .unique();
  if (!u) throw new Error("User not found");
  return u;
}

/** optional: ensure creator has admin in org (uses your users.resolveOrgContext) */
async function requireAdminInOrg(ctx: any, clerkUserId: string, orgId: Id<"orgs">) {
  const resolved = await ctx.runQuery(api.users.resolveOrgContext, { clerkUserId, orgId });
  if (!resolved) throw new Error("Not a member of this org");
  const roles = (resolved.roles ?? []) as string[];
  if (!roles.includes("ADMIN")) throw new Error("Insufficient permissions");
}

// ---------------------- Mutations ----------------------

/** Create a key (returns the plaintext once). Name must be unique per org. */
export const create = mutation({
  args: {
    clerkUserId: v.string(),
    ownerOrg: v.id("orgs"),
    name: v.string(),
    scopes: v.array(v.string()),
  },
  handler: async (ctx, { clerkUserId, ownerOrg, name, scopes }) => {
    await requireAdminInOrg(ctx, clerkUserId, ownerOrg);

    // name uniqueness per org
    const dupe = await ctx.db
      .query("apiKeys")
      .withIndex("byName", q => q.eq("ownerOrg", ownerOrg).eq("name", name.trim()))
      .unique();
    if (dupe) throw new Error("Name already in use for this org");

    const creator = await getUserByClerk(ctx, clerkUserId);
    const raw = randKey();
    const hashedKey = sha256hex(raw);

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

/** Rotate (disable old, create new with same name+scopes) */
export const rotate = mutation({
  args: {
    clerkUserId: v.string(),
    id: v.id("apiKeys"),
  },
  handler: async (ctx, { clerkUserId, id }) => {
    const key = await ctx.db.get(id);
    if (!key) throw new Error("Key not found");

    await requireAdminInOrg(ctx, clerkUserId, key.ownerOrg);

    // disable old
    await ctx.db.patch(id, { disabled: true });

    // create new (same name; allow duplicates since old is disabled)
    const creator = await getUserByClerk(ctx, clerkUserId);
    const raw = randKey();
    const hashedKey = sha256hex(raw);
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

/** Enable/disable */
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

/** Touch lastUsedAt (call from your API auth middleware after validation) */
export const markUsed = mutation({
  args: { hashedKey: v.string() },
  handler: async (ctx, { hashedKey }) => {
    const rec = await ctx.db
      .query("apiKeys")
      .withIndex("byName", q => q // no single-key index; fallback byOwner scan
        .eq("ownerOrg", "" as any) // trick to satisfy types; we won't use this result
      )
      .take(0); // no-op, we’ll use byOwner path below

    // since we have .index("byKeyHash") absent, we must scan; add one if you want O(1)
    const rows = await ctx.db.query("apiKeys").collect();
    const found = rows.find(r => r.hashedKey === hashedKey);
    if (found) await ctx.db.patch(found._id, { lastUsedAt: Date.now() });
    return { ok: true };
  },
});

// ---------------------- Queries ----------------------

/** Validate a plaintext key → returns record or null */
export const validate = query({
  args: { apiKey: v.string() },
  handler: async (ctx, { apiKey }) => {
    const hash = sha256hex(apiKey);
    const rows = await ctx.db.query("apiKeys").collect();
    const rec = rows.find(r => r.hashedKey === hash && !r.disabled);
    return rec ?? null;
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