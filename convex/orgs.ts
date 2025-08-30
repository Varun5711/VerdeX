// convex/orgs.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";


/**
 * Returns a stable "system" user _id to use for createdBy fields
 * when a webhook doesn't include a human creator.
 * - Prefer any ADMIN user.
 * - Else prefer the first user in DB.
 * - Else create a synthetic "system" user.
 */
async function ensureSystemUser(ctx: any): Promise<Id<"users">> {
  // 1) try any ADMIN user
  const all = await ctx.db.query("users").collect();
  const admin = all.find((u: any) => (u.roles ?? []).includes("ADMIN"));
  if (admin) return admin._id;

  // 2) fallback: first available user
  if (all[0]?._id) return all[0]._id as Id<"users">;

  // 3) create a synthetic system user (safe default)
  const sysId = await ctx.db.insert("users", {
    clerkUserId: "system",
    clerkPrimaryEmail: undefined,
    displayName: "System",
    pictureUrl: undefined,
    roles: ["ADMIN"], // give it ADMIN so it can be used for ownership
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  });
  return sysId;
}

// ---------- Org lifecycle ----------

export const upsertOrgFromClerk = mutation({
  args: { clerkOrgId: v.string(), name: v.string() },
  handler: async (ctx, { clerkOrgId, name }) => {
    const existing = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", (q) => q.eq("clerkOrgId", clerkOrgId))
      .unique();

    if (!existing) {
      const creator = await ensureSystemUser(ctx);
      await ctx.db.insert("orgs", {
        clerkOrgId,
        name,
        type: "PRODUCER", // default; your UI can change later
        createdAt: Date.now(),
        createdBy: creator,
        meta: {},
      });
    } else {
      await ctx.db.patch(existing._id, { name });
    }
  },
});

export const deleteOrgByClerkId = mutation({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", (q) => q.eq("clerkOrgId", clerkOrgId))
      .unique();
    if (!org) return;

    // delete memberships belonging to this org (simple cascade)
    const members = await ctx.db
      .query("orgMembers")
      .withIndex("byOrg", (q) => q.eq("orgId", org._id))
      .collect();
    await Promise.all(members.map((m: any) => ctx.db.delete(m._id)));

    // NOTE: you might also want to clear users.orgPrimary if it points to this org.
    const users = await ctx.db.query("users").collect();
    await Promise.all(
      users
        .filter(
          (u: any) =>
            u.orgPrimary && u.orgPrimary.toString() === org._id.toString()
        )
        .map((u: any) => ctx.db.patch(u._id, { orgPrimary: undefined }))
    );

    await ctx.db.delete(org._id);
  },
});

// ---------- Membership lifecycle ----------

export const upsertOrgMembershipFromClerk = mutation({
  args: {
    clerkMembershipId: v.string(),
    clerkOrgId: v.string(),
    clerkUserId: v.string(),
    clerkRole: v.string(), // "org:admin" | "org:member" | maybe "org:owner"
  },
  handler: async (
    ctx,
    { clerkMembershipId, clerkOrgId, clerkUserId, clerkRole }
  ) => {
    // 1) resolve org + user
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", (q) => q.eq("clerkOrgId", clerkOrgId))
      .unique();
    if (!org) throw new Error("Org not found for clerkOrgId");

    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();
    if (!user) throw new Error("User not found for clerkUserId");

    // 2) map Clerk role → app orgRole
    const orgRole: "OWNER" | "ADMIN" | "MEMBER" = clerkRole.includes("owner")
      ? "OWNER"
      : clerkRole.includes("admin")
        ? "ADMIN"
        : "MEMBER";

    // 3) upsert membership by composite (orgId, userId)
    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", (q) =>
        q.eq("orgId", org._id).eq("userId", user._id)
      )
      .unique();

    if (!existing) {
      await ctx.db.insert("orgMembers", {
        orgId: org._id,
        userId: user._id,
        clerkOrgId,
        clerkMembershipId,
        clerkRole,
        orgRole,
        roles: [], // app functional roles (PRODUCER/CERTIFIER/etc.) assigned later
        invitedBy: user._id, // placeholder; replace with true inviter if you track it
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

    // 4) set user's primary org if they don't have one
    if (!user.orgPrimary) {
      await ctx.db.patch(user._id, { orgPrimary: org._id });
    }
  },
});

export const deleteOrgMembershipByClerkId = mutation({
  args: { clerkMembershipId: v.string() },
  handler: async (ctx, { clerkMembershipId }) => {
    // direct lookup via index
    const membershipDoc = await ctx.db
      .query("orgMembers")
      .withIndex("byClerkMembershipId", (q) =>
        q.eq("clerkMembershipId", clerkMembershipId)
      )
      .unique();

    if (!membershipDoc) return;

    const orgId = membershipDoc.orgId as Id<"orgs">;
    const userId = membershipDoc.userId as Id<"users">;

    // delete the membership
    await ctx.db.delete(membershipDoc._id);

    // if user’s active org == this org, and no other membership in that org remains → clear it
    const user = await ctx.db.get(userId);
    if (user?.orgPrimary && user.orgPrimary.toString() === orgId.toString()) {
      const stillMember = await ctx.db
        .query("orgMembers")
        .withIndex("byUser", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("orgId"), orgId))
        .first();
      if (!stillMember) {
        await ctx.db.patch(userId, { orgPrimary: undefined });
      }
    }
  },
});

// ---------- Queries ----------

export const listOrgs = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    return await ctx.db.query("orgs").take(limit ?? 20);
  },
});

export const listMembers = query({
  args: { orgId: v.id("orgs") },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("orgMembers")
      .withIndex("byOrg", (q) => q.eq("orgId", orgId))
      .collect();
  },
});

export const listUserMemberships = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();
    if (!user) return [];
    return await ctx.db
      .query("orgMembers")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const getDefault = query({
  args: {},
  handler: async (ctx) => {
    // For now just return the first org
    return await ctx.db.query("orgs").first();
  },
});

export const createOrg = mutation({
  args: {
    clerkUserId: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("PRODUCER"),
      v.literal("BUYER"),
    ),
  },
  handler: async (ctx, { clerkUserId, name, type }) => {
    // Resolve convex user
    const user = await ctx.runQuery(api.users.getUserByClerkId, { clerkUserId });
    if (!user) throw new Error("User not found");

    // Insert org
    const orgId = await ctx.db.insert("orgs", {
      name,
      type,
      createdAt: Date.now(),
      createdBy: user._id,
    });

    // Figure out functional roles to assign
    const defaultRoles: Array<"PRODUCER" | "BUYER" | "CERTIFIER" | "AUTHORITY" | "AUDITOR" | "ADMIN"> = [
      "ADMIN", // always admin of org
    ];

    if (type === "PRODUCER") {
      defaultRoles.push("PRODUCER");
    }
    if (type === "BUYER") {
      defaultRoles.push("BUYER");
    }

    // Create org membership with those roles
    await ctx.db.insert("orgMembers", {
      orgId,
      userId: user._id,
      roles: defaultRoles,
      orgRole: "ADMIN",
      invitedBy: user._id,
      invitedAt: Date.now(),
    });

    return orgId;
  },
});