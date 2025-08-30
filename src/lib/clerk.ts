"use client";

import { useUser, useOrganization } from "@clerk/nextjs";

export function useClerkUser() {
  const { user } = useUser();
  return user;
}

export function useClerkOrg() {
  const { organization } = useOrganization();
  return organization;
}