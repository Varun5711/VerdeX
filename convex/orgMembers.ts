// convex/orgMembers.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";


// --- App enums (match your schema) ---
const RoleV = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);

const OrgRoleV = v.union(
  v.literal("OWNER"),
  v.literal("ADMIN"),
  v.literal("MEMBER")
);

// ---------- Helpers ----------

async function getUserByClerkId(ctx: any, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q: any) => q.eq("clerkUserId", clerkUserId))
    .unique();
}

async function requireMember(ctx: any, orgId: Id<"orgs">, userId: Id<"users">) {
  const mem = await ctx.db
    .query("orgMembers")
    .withIndex("byOrgUser", (q: any) => q.eq("orgId", orgId).eq("userId", userId))
    .unique();
  if (!mem) throw new Error("Not a member of this org");
  return mem;
}

function isElevated(orgRole: "OWNER" | "ADMIN" | "MEMBER") {
  return orgRole === "OWNER" || orgRole === "ADMIN";
}

// ---------- Create / Invite / Accept ----------

/**
 * Invite a user (by Clerk user id) into an org with a given orgRole.
 * Requires the inviter to be OWNER/ADMIN of that org.
 */
export const inviteMember = mutation({
  args: {
    clerkUserId: v.string(),       // inviter (caller)
    orgId: v.id("orgs"),
    inviteeClerkUserId: v.string(),
    orgRole: OrgRoleV,             // OWNER/Admin/Member (usually ADMIN or MEMBER)
    roles: v.optional(v.array(RoleV)), // functional roles (PRODUCER, CERTIFIER, ...)
  },
  handler: async (ctx, { clerkUserId, orgId, inviteeClerkUserId, orgRole, roles }) => {
    const inviter = await getUserByClerkId(ctx, clerkUserId);
    if (!inviter) throw new Error("Inviter not found");

    const inviterMem = await requireMember(ctx, orgId, inviter._id);
    if (!isElevated(inviterMem.orgRole)) throw new Error("Forbidden");

    const invitee = await getUserByClerkId(ctx, inviteeClerkUserId);
    if (!invitee) throw new Error("Invitee not found");

    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", (q: any) => q.eq("orgId", orgId).eq("userId", invitee._id))
      .unique();
    if (existing) {
      // Already a member: patch roles/orgRole if needed
      await ctx.db.patch(existing._id, {
        orgRole,
        roles: roles ?? existing.roles ?? [],
      });
      return { membershipId: existing._id };
    }

    const membershipId = await ctx.db.insert("orgMembers", {
      orgId,
      userId: invitee._id,
      clerkOrgId: undefined,
      clerkMembershipId: undefined,
      clerkRole: undefined,
      orgRole,
      roles: roles ?? [],
      invitedBy: inviter._id,
      invitedAt: Date.now(),
      acceptedAt: undefined,
    });

    return { membershipId };
  },
});

/**
 * Accept an invite (or self-join if policy allows).
 * The caller is the invitee (by Clerk user id).
 */
export const acceptInvite = mutation({
  args: {
    clerkUserId: v.string(),
    orgId: v.id("orgs"),
  },
  handler: async (ctx, { clerkUserId, orgId }) => {
    const user = await getUserByClerkId(ctx, clerkUserId);
    if (!user) throw new Error("User not found");

    const mem = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", (q: any) => q.eq("orgId", orgId).eq("userId", user._id))
      .unique();

    if (!mem) throw new Error("No pending membership to accept");
    if (mem.acceptedAt) return { membershipId: mem._id, accepted: true };

    await ctx.db.patch(mem._id, { acceptedAt: Date.now() });

    // If user has no active org, set this one
    if (!user.orgPrimary) {
      await ctx.db.patch(user._id, { orgPrimary: orgId });
    }

    return { membershipId: mem._id, accepted: true };
  },
});

// ---------- Updates (orgRole & functional roles) ----------

export const setOrgRole = mutation({
  args: {
    clerkUserId: v.string(),    // actor
    orgId: v.id("orgs"),
    targetUserId: v.id("users"),
    orgRole: OrgRoleV,
  },
  handler: async (ctx, { clerkUserId, orgId, targetUserId, orgRole }) => {
    const actor = await getUserByClerkId(ctx, clerkUserId);
    if (!actor) throw new Error("Actor not found");

    const actorMem = await requireMember(ctx, orgId, actor._id);
    if (!isElevated(actorMem.orgRole)) throw new Error("Forbidden");

    const targetMem = await requireMember(ctx, orgId, targetUserId);
    await ctx.db.patch(targetMem._id, { orgRole, acceptedAt: targetMem.acceptedAt ?? Date.now() });

    return { membershipId: targetMem._id, orgRole };
  },
});

export const setFunctionalRoles = mutation({
  args: {
    clerkUserId: v.string(),    // actor
    orgId: v.id("orgs"),
    targetUserId: v.id("users"),
    roles: v.array(RoleV),      // replaces the list
  },
  handler: async (ctx, { clerkUserId, orgId, targetUserId, roles }) => {
    const actor = await getUserByClerkId(ctx, clerkUserId);
    if (!actor) throw new Error("Actor not found");

    const actorMem = await requireMember(ctx, orgId, actor._id);
    if (!isElevated(actorMem.orgRole)) throw new Error("Forbidden");

    const targetMem = await requireMember(ctx, orgId, targetUserId);
    await ctx.db.patch(targetMem._id, { roles, acceptedAt: targetMem.acceptedAt ?? Date.now() });

    return { membershipId: targetMem._id, roles };
  },
});

// ---------- Removal ----------

/**
 * Remove a member from an org.
 * Requires OWNER/ADMIN. If removing self, allow MEMBER to leave.
 */
export const removeMember = mutation({
  args: {
    clerkUserId: v.string(),    // actor
    orgId: v.id("orgs"),
    targetUserId: v.id("users"),
  },
  handler: async (ctx, { clerkUserId, orgId, targetUserId }) => {
    const actor = await getUserByClerkId(ctx, clerkUserId);
    if (!actor) throw new Error("Actor not found");

    const actorMem = await requireMember(ctx, orgId, actor._id);
    const isSelf = actor._id.toString() === targetUserId.toString();
    if (!isSelf && !isElevated(actorMem.orgRole)) throw new Error("Forbidden");

    const targetMem = await requireMember(ctx, orgId, targetUserId);
    await ctx.db.delete(targetMem._id);

    // If the removed user's active org is this org, clear it (or you could auto-switch)
    const user = await ctx.db.get(targetUserId);
    if (user?.orgPrimary && user.orgPrimary.toString() === orgId.toString()) {
      await ctx.db.patch(targetUserId, { orgPrimary: undefined });
    }

    return { ok: true };
  },
});

// ---------- Lookups / Lists ----------

export const getMembership = query({
  args: { orgId: v.id("orgs"), userId: v.id("users") },
  handler: async (ctx, { orgId, userId }) => {
    return await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", (q: any) => q.eq("orgId", orgId).eq("userId", userId))
      .unique();
  },
});

export const listMembers = query({
  args: { orgId: v.id("orgs") },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("orgMembers")
      .withIndex("byOrg", (q: any) => q.eq("orgId", orgId))
      .collect();
  },
});

export const listUserMemberships = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await getUserByClerkId(ctx, clerkUserId);
    if (!user) return [];
    return await ctx.db
      .query("orgMembers")
      .withIndex("byUser", (q: any) => q.eq("userId", user._id))
      .collect();
  },
});

// ---------- Clerk sync (mirror membership) ----------

/**
 * Upsert from Clerk org membership webhook.
 * Maps Clerk role → orgRole and ensures a membership exists.
 */
export const upsertFromClerk = mutation({
  args: {
    clerkMembershipId: v.string(),
    clerkOrgId: v.string(),
    clerkUserId: v.string(),
    clerkRole: v.string(), // "org:admin" | "org:member" | possibly "org:owner"
  },
  handler: async (ctx, { clerkMembershipId, clerkOrgId, clerkUserId, clerkRole }) => {
    const org = await ctx.db
      .query("orgs")
      .withIndex("byClerkOrgId", (q: any) => q.eq("clerkOrgId", clerkOrgId))
      .unique();
    if (!org) throw new Error("Org not found");

    const user = await getUserByClerkId(ctx, clerkUserId);
    if (!user) throw new Error("User not found");

    const orgRole: "OWNER" | "ADMIN" | "MEMBER" =
      clerkRole.includes("owner")
        ? "OWNER"
        : clerkRole.includes("admin")
        ? "ADMIN"
        : "MEMBER";

    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("byOrgUser", (q: any) => q.eq("orgId", org._id).eq("userId", user._id))
      .unique();

    if (!existing) {
      await ctx.db.insert("orgMembers", {
        orgId: org._id,
        userId: user._id,
        clerkOrgId,
        clerkMembershipId,
        clerkRole,
        orgRole,
        roles: [], // app functional roles assigned later by your app
        invitedBy: user._id, // webhook has no inviter — placeholder
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

    // set primary org if not set
    if (!user.orgPrimary) {
      await ctx.db.patch(user._id, { orgPrimary: org._id });
    }

    return { ok: true };
  },
});

/**
 * Delete from Clerk org membership webhook using the membership id.
 * Requires the index: orgMembers.byClerkMembershipId(["clerkMembershipId"])
 */
export const deleteByClerkMembershipId = mutation({
  args: { clerkMembershipId: v.string() },
  handler: async (ctx, { clerkMembershipId }) => {
    const membershipDoc = await ctx.db
      .query("orgMembers")
      .withIndex("byClerkMembershipId", (q: any) =>
        q.eq("clerkMembershipId", clerkMembershipId)
      )
      .unique();

    if (!membershipDoc) return { ok: true };

    const orgId = membershipDoc.orgId as Id<"orgs">;
    const userId = membershipDoc.userId as Id<"users">;

    await ctx.db.delete(membershipDoc._id);

    // clear user's active org if it pointed to this org and no other membership remains in it
    const user = await ctx.db.get(userId);
    if (user?.orgPrimary && user.orgPrimary.toString() === orgId.toString()) {
      const stillMember = await ctx.db
        .query("orgMembers")
        .withIndex("byUser", (q: any) => q.eq("userId", userId))
        .filter((q: any) => q.eq(q.field("orgId"), orgId))
        .first();
      if (!stillMember) {
        await ctx.db.patch(userId, { orgPrimary: undefined });
      }
    }

    return { ok: true };
  },
});

export const listByOrg = query({
  args: { orgId: v.id("orgs") },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("orgMembers")
      .withIndex("byOrg", q => q.eq("orgId", orgId))
      .collect();
  },
});