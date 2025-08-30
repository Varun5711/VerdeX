// convex/users.ts
import { mutation, query, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

// ========== Clerk sync & lifecycle ==========

const RoleV = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);

export const upsertUserFromClerk = mutation({
  args: {
    clerkUserId: v.string(),
    email: v.optional(v.string()),
    displayName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (!existing) {
      await ctx.db.insert("users", {
        clerkUserId: args.clerkUserId,
        clerkPrimaryEmail: args.email,
        displayName: args.displayName,
        pictureUrl: args.pictureUrl,
        roles: [],
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
      });
      return;
    }

    await ctx.db.patch(existing._id, {
      clerkPrimaryEmail: args.email ?? existing.clerkPrimaryEmail,
      displayName: args.displayName ?? existing.displayName,
      pictureUrl: args.pictureUrl ?? existing.pictureUrl,
      lastLoginAt: Date.now(),
    });
  },
});

export const deleteUserByClerkId = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});

export const recordLogin = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (user) {
      await ctx.db.patch(user._id, { lastLoginAt: Date.now() });
    }
  },
});

// ========== Profile & session ==========

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", identity.subject))
      .unique();
    if (!user) return null;
    // TODO: resolve org memberships, roles, linked wallets
    return user;
  },
});

export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
  },
});

export const updateProfile = mutation({
  args: {
    clerkUserId: v.string(),
    displayName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, {
      displayName: args.displayName ?? user.displayName,
      pictureUrl: args.pictureUrl ?? user.pictureUrl,
    });
  },
});

export const setActiveOrg = mutation({
  args: { clerkUserId: v.string(), orgId: v.id("orgs") },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");
    // TODO: check membership exists in orgMembers
    await ctx.db.patch(user._id, { orgPrimary: args.orgId });
  },
});

// ========== Wallet linking (SIWE) ==========

export const linkWallet = mutation({
  args: { clerkUserId: v.string(), address: v.string() },
  handler: async (ctx, args) => {
    const addr = args.address.toLowerCase();
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");

    const linked = new Set((user.linkedAddresses ?? []).map(a => a.toLowerCase()));
    linked.add(addr);

    await ctx.db.patch(user._id, {
      linkedAddresses: Array.from(linked),
      primaryAddress: user.primaryAddress ?? addr,
    });
  },
});

export const unlinkWallet = mutation({
  args: { clerkUserId: v.string(), address: v.string() },
  handler: async (ctx, args) => {
    const addr = args.address.toLowerCase();
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");

    const filtered = (user.linkedAddresses ?? []).filter(a => a.toLowerCase() !== addr);
    const primary = user.primaryAddress?.toLowerCase() === addr ? filtered[0] : user.primaryAddress;

    await ctx.db.patch(user._id, {
      linkedAddresses: filtered,
      primaryAddress: primary,
    });
  },
});

export const setPrimaryWallet = mutation({
  args: { clerkUserId: v.string(), address: v.string() },
  handler: async (ctx, args) => {
    const addr = args.address.toLowerCase();
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");
    if (!(user.linkedAddresses ?? []).map(a => a.toLowerCase()).includes(addr)) {
      throw new Error("Address not linked");
    }
    await ctx.db.patch(user._id, { primaryAddress: addr });
  },
});

// ========== Org context & role guards ==========

export const resolveOrgContext = query({
  args: { clerkUserId: v.string(), orgId: v.optional(v.id("orgs")) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) return null;
    // TODO: resolve org + membership + roles
    return { user, orgId: args.orgId ?? user.orgPrimary, roles: user.roles };
  },
});

export const assertRole = internalAction({
  args: { clerkUserId: v.string(), orgId: v.id("orgs"), requiredRoles: v.array(v.string()) },
  handler: async (ctx, args) => {
    const membership = await ctx.runQuery(api.users.resolveOrgContext, {
      clerkUserId: args.clerkUserId,
      orgId: args.orgId,
    });
    if (!membership) throw new Error("Not a member");
    const roles: string[] = membership.roles ?? [];
    const ok = args.requiredRoles.some(r => roles.includes(r));
    if (!ok) throw new Error("Forbidden");
  },
});

// ========== Clerk Orgs sync ==========

export const upsertOrgFromClerk = mutation({
  args: { clerkOrgId: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", q => q.eq("clerkOrgId", args.clerkOrgId))
      .unique();
    if (!existing) {
      await ctx.db.insert("orgs", {
        clerkOrgId: args.clerkOrgId,
        name: args.name,
        type: "PRODUCER",
        createdAt: Date.now(),
        createdBy: null as any, // TODO: set system user id
        meta: {},
      });
    } else {
      await ctx.db.patch(existing._id, { name: args.name });
    }
  },
});

export const deleteOrgByClerkId = mutation({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", q => q.eq("clerkOrgId", args.clerkOrgId))
      .unique();
    if (org) {
      await ctx.db.delete(org._id);
    }
  },
});

export const upsertOrgMembershipFromClerk = mutation({
  args: {
    clerkMembershipId: v.string(),
    clerkOrgId: v.string(),
    clerkUserId: v.string(),
    clerkRole: v.string(), // e.g., "org:admin" | "org:member"
  },
  handler: async (ctx, { clerkMembershipId, clerkOrgId, clerkUserId, clerkRole }) => {
    // 1) Resolve org & user
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", q => q.eq("clerkOrgId", clerkOrgId))
      .unique();
    if (!org) throw new Error("Org not found for clerkOrgId");

    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();
    if (!user) throw new Error("User not found for clerkUserId");

    // 2) Map Clerk role -> app orgRole
    // Clerk sends "org:admin" | "org:member" (and sometimes "org:guest")
    const orgRole: "OWNER" | "ADMIN" | "MEMBER" =
      clerkRole.includes("owner")
        ? "OWNER"
        : clerkRole.includes("admin")
        ? "ADMIN"
        : "MEMBER";

    // 3) Upsert membership keyed by (orgId, userId)
    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", q => q.eq("orgId", org._id).eq("userId", user._id))
      .unique();

    if (!existing) {
      await ctx.db.insert("orgMembers", {
        orgId: org._id,
        userId: user._id,
        clerkOrgId,
        clerkMembershipId,
        clerkRole,
        orgRole,
        roles: [],              // app-scoped roles (e.g., PRODUCER/CERTIFIER) to be assigned later
        invitedBy: user._id,    // placeholder; replace with real inviter if you track it
        invitedAt: Date.now(),
        acceptedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(existing._id, {
        clerkOrgId,
        clerkMembershipId,
        clerkRole,
        orgRole,
        acceptedAt: existing.acceptedAt ?? Date.now(),
      });
    }

    // 4) Optional: if user has no active org, set this as primary
    const me = await ctx.db.get(user._id);
    if (me && !me.orgPrimary) {
      await ctx.db.patch(me._id, { orgPrimary: org._id });
    }
  },
});

export const deleteOrgMembershipByClerkId = mutation({
  args: { clerkMembershipId: v.string() },
  handler: async (ctx, { clerkMembershipId }) => {
    // Our index is (clerkOrgId, clerkMembershipId); Clerk delete event only gives membership id.
    // Fallback: scan orgMembers and delete the matching row (cheap at hackathon scale).
    const all = await ctx.db.query("orgMembers").collect();
    const match = all.find(m => m.clerkMembershipId === clerkMembershipId);
    if (match) {
      await ctx.db.delete(match._id);
    }
  },
});

// ========== Admin utilities ==========

export const listUsers = query({
  args: { limit: v.optional(v.number()), cursor: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users.slice(0, args.limit ?? 20);
  },
});

export const updateGlobalRoles = mutation({
  args: { clerkUserId: v.string(), roles: v.array(RoleV) },
  handler: async (ctx, { clerkUserId, roles }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, { roles });
  },
});



export const disableUser = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (user) await ctx.db.patch(user._id, { disabled: true });
  },
});

export const enableUser = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (user) await ctx.db.patch(user._id, { disabled: false });
  },
});

// ========== Notifications ==========

export const listMyNotifications = query({
  args: { clerkUserId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (!user) return [];
    return await ctx.db
      .query("notifications")
      .withIndex("byUser", q => q.eq("userId", user._id))
      .take(args.limit ?? 20);
  },
});

export const markNotificationRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { readAt: Date.now() });
  },
});