"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel";

export default function RoleForm() {
  const { user } = useUser();
  const { orgId } = useParams(); // string
  const assignRole = useMutation(api.orgMembers.assignRole);

  const [role, setRole] = useState<"CERTIFIER" | "AUTHORITY">("CERTIFIER");
  const [secret, setSecret] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await assignRole({
        orgId: orgId as Id<"orgs">,  // ✅ cast string → Id<"orgs">
        clerkUserId: user!.id,
        role,
        secret,
      });
      setMsg(`✅ Role ${role} granted`);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <label>
        Select Role
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="CERTIFIER">Certifier</option>
          <option value="AUTHORITY">Authority</option>
        </select>
      </label>

      <label>
        Secret Code
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
      </label>

      <button type="submit">Request Role</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}