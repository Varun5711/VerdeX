"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function OrgForm() {
  const { user } = useUser();
  const createOrg = useMutation(api.orgs.createOrg);
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("PRODUCER"); // ✅ Default type

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    const id = await createOrg({
      clerkUserId: user.id,
      name,
      type, // ✅ Now passing type
    });

    router.push(`/dashboard/orgs/${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Organization name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="PRODUCER">Producer</option>
        <option value="CERTIFIER">Certifier</option>
        <option value="AUTHORITY">Authority</option>
        <option value="BUYER">Buyer</option>
        <option value="AUDITOR">Auditor</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Org
      </button>
    </form>
  );
}