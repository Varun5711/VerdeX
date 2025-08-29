import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upsertUserFromClerk = mutation({
  args: {
    clerkUserId: v.string(),
    email: v.optional(v.string()),
    displayName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, { clerkUserId, email, displayName, pictureUrl }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!existing) {
      await ctx.db.insert("users", {
        clerkUserId,
        clerkPrimaryEmail: email,
        displayName,
        pictureUrl,
        roles: [],                  // start empty; your app assigns later
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        // optional: orgPrimary can be set after first membership arrives
      });
      return;
    }

    await ctx.db.patch(existing._id, {
      clerkPrimaryEmail: email ?? existing.clerkPrimaryEmail,
      displayName: displayName ?? existing.displayName,
      pictureUrl: pictureUrl ?? existing.pictureUrl,
      lastLoginAt: Date.now(),
    });
  },
});

export const deleteUserByClerkId = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId))
      .unique();
    if (user) {
      // Soft-delete pattern is often safer; here we hard delete for brevity.
      await ctx.db.delete(user._id);
    }
  },
});

// ---------- Organizations ----------
export const upsertOrgFromClerk = mutation({
  args: { clerkOrgId: v.string(), name: v.string() },
  handler: async (ctx, { clerkOrgId, name }) => {
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", q => q.eq("clerkOrgId", clerkOrgId))
      .unique();

    if (!org) {
      await ctx.db.insert("orgs", {
        clerkOrgId,
        name,
        type: "PRODUCER", // default; your app can update later
        createdAt: Date.now(),
        createdBy: (await getSystemUser(ctx)), // or a service account id
        meta: {},
      });
      return;
    }
    await ctx.db.patch(org._id, { name });
  },
});

export const deleteOrgByClerkId = mutation({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", q => q.eq("clerkOrgId", clerkOrgId))
      .unique();
    if (org) {
      await ctx.db.delete(org._id);
      // Optionally cascade: orgMembers, facilities, etc. (careful!)
    }
  },
});

// ---------- Org Memberships ----------
export const upsertOrgMembershipFromClerk = mutation({
  args: {
    clerkMembershipId: v.string(),
    clerkOrgId: v.string(),
    clerkUserId: v.string(),
    clerkRole: v.string(),
  },
  handler: async (ctx, { clerkMembershipId, clerkOrgId, clerkUserId, clerkRole }) => {
    const [org, user] = await Promise.all([
      ctx.db.query("orgs").withIndex("byClerkOrgId", q => q.eq("clerkOrgId", clerkOrgId)).unique(),
      ctx.db.query("users").withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId)).unique(),
    ]);
    if (!org || !user) throw new Error("Org or User not found for membership");

    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", q => q.eq("orgId", org._id).eq("userId", user._id))
      .unique();

    const orgRole = clerkRole.includes("admin") ? "ADMIN" : "MEMBER";

    if (!existing) {
      await ctx.db.insert("orgMembers", {
        orgId: org._id,
        userId: user._id,
        clerkOrgId,
        clerkMembershipId,
        clerkRole,
        orgRole,
        roles: [], // app-scoped roles; fill later (e.g., PRODUCER/CERTIFIER)
        invitedBy: user._id, // placeholder; you can store actual inviter if available
        invitedAt: Date.now(),
        acceptedAt: Date.now(),
      });
      return;
    }

    await ctx.db.patch(existing._id, {
      clerkOrgId,
      clerkMembershipId,
      clerkRole,
      orgRole,
      acceptedAt: existing.acceptedAt ?? Date.now(),
    });
  },
});

export const deleteOrgMembershipByClerkId = mutation({
  args: { clerkMembershipId: v.string() },
  handler: async (ctx, { clerkMembershipId }) => {
    const mem = await ctx.db
      .query("orgMembers")
      .withIndex("byClerk", q => q.eq("clerkOrgId", undefined as any).eq("clerkMembershipId", clerkMembershipId))
      .first(); // index uses [clerkOrgId, clerkMembershipId]; we’ll just scan byUser if needed

    // Fallback: search by membership id manually
    const match = mem
      ?? (await ctx.db.query("orgMembers").collect()).find(m => m.clerkMembershipId === clerkMembershipId);

    if (match) await ctx.db.delete(match._id);
  },
});

// Utility: choose a system user for createdBy fields
async function getSystemUser(ctx: any) {
  // You can create a dedicated "system" user row and cache its _id.
  // For hackathon speed, return the first ADMIN user if exists; else null is allowed if field optional.
  const admin = await ctx.db.query("users").collect();
  const first = admin[0]?._id;
  return first ?? undefined;
}