"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function NewFacilityPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const createFacility = useMutation(api.facilities.createFacility);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("India"); // default for now
  const [region, setRegion] = useState("");

  if (!orgId || Array.isArray(orgId)) {
    return <div>Invalid org</div>;
  }

  return (
    <div>
      <h1>Create Facility</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Facility name"
      />
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
      />
      <input
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="Region (optional)"
      />
      <button
        onClick={async () => {
          if (!user) return;
          await createFacility({
            orgId: orgId as any, // cast for Convex
            clerkUserId: user.id,
            name,
            facilityId: crypto.randomUUID(),
            location: {
              country,
              region: region || undefined,
            },
          });
          router.push(`/dashboard/orgs/${orgId}/facilities`);
        }}
      >
        Save
      </button>
    </div>
  );
}