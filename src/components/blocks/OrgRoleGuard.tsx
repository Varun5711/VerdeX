"use client";

import { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type Props = {
  orgId: Id<"orgs">;
  roles: Array<"ADMIN" | "PRODUCER" | "CERTIFIER" | "AUTHORITY" | "BUYER" | "AUDITOR">;
  children: ReactNode;
};

export default function OrgRoleGuard({ orgId, roles, children }: Props) {
  const { user } = useUser();
  const ctx = useQuery(api.users.resolveOrgContext, {
    orgId,
    clerkUserId: user?.id || "",
  });

  if (!ctx) return null; // loading

  const hasRole = roles.some((r) => ctx.roles?.includes(r));
  if (!hasRole) return null;

  return <>{children}</>;
}