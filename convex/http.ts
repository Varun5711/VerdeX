// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";


const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) throw new Error("Missing CLERK_WEBHOOK_SECRET");

    // Verify RAW payload (not JSON-parsed)
    const headers = {
      "svix-id": request.headers.get("svix-id"),
      "svix-timestamp": request.headers.get("svix-timestamp"),
      "svix-signature": request.headers.get("svix-signature"),
    } as WebhookRequiredHeaders;

    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const payload = await request.text();
    const wh = new Webhook(secret);

    let evt: WebhookEvent;
    try {
      evt = wh.verify(payload, headers) as WebhookEvent;
    } catch (e) {
      console.error("Clerk webhook verify failed:", e);
      return new Response("Bad signature", { status: 400 });
    }

    console.log("📩 Incoming Clerk event:", evt.type);

    try {
      switch (evt.type) {
        // ---------- Users ----------
        case "user.created":
case "user.updated": {
  const d = evt.data as any;

  const primaryEmailId = d.primary_email_address_id;
  const email = (d.email_addresses?.find((e: any) => e.id === primaryEmailId)?.email_address ??
                 d.email_addresses?.[0]?.email_address) ?? undefined;

  const wallet = d.web3_wallets?.[0]?.web3_wallet; // first wallet
  const displayName = [d.first_name ?? "", d.last_name ?? ""].join(" ").trim() ||
                      d.username ||
                      (wallet ? wallet.slice(0,6) + "..." + wallet.slice(-4) : undefined);

  const pictureUrl = d.image_url || d.profile_image_url || undefined;

  await ctx.runMutation(api.users.upsertUserFromClerk, {
    clerkUserId: d.id,
    email,
    displayName,
    pictureUrl,
    wallet,  // 👈 new field
  });
  break;
}

        case "user.deleted": {
          await ctx.runMutation(api.users.deleteUserByClerkId, {
            clerkUserId: (evt.data as any).id,
          });
          break;
        }

        // ---------- Organizations ----------
        case "organization.created":
        case "organization.updated": {
          const d = evt.data as any;
          await ctx.runMutation(api.orgs.upsertOrgFromClerk, {
            clerkOrgId: d.id,
            name: d.name,
          });
          break;
        }

        case "organization.deleted": {
          await ctx.runMutation(api.orgs.deleteOrgByClerkId, {
            clerkOrgId: (evt.data as any).id,
          });
          break;
        }

        // ---------- Org Memberships ----------
        case "organizationMembership.created":
        case "organizationMembership.updated": {
          const m = evt.data as any;
          await ctx.runMutation(api.orgMembers.upsertFromClerk, {
            clerkMembershipId: m.id,
            clerkOrgId: m.organization?.id,
            clerkUserId: m.public_user_data?.user_id,
            clerkRole: m.role, // "org:admin" | "org:member" | maybe "org:owner"
          });
          break;
        }

        case "organizationMembership.deleted": {
          await ctx.runMutation(api.orgMembers.deleteByClerkMembershipId, {
            clerkMembershipId: (evt.data as any).id,
          });
          break;
        }

        default:
          // Acknowledge unhandled events so Clerk doesn’t retry
          break;
      }
    } catch (err) {
      console.error("Webhook handler error:", err);
      return new Response("Handler error", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  }),
});

export default http;