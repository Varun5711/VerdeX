"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";

export default function FacilityForm() {
  const { user } = useUser();
  const { orgId } = useParams(); // dynamic org
  const router = useRouter();
  const createFacility = useMutation(api.facilities.createFacility);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("India");
  const [region, setRegion] = useState("");
  const [electrolyzerType, setElectrolyzerType] = useState("");
  const [capacityMW, setCapacityMW] = useState("");
  const [renewableSource, setRenewableSource] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    await createFacility({
      orgId: orgId as any,
      clerkUserId: user.id,
      name,
      location: { country, region },
      tech: { electrolyzerType, capacityMW, renewableSource },
    });

    router.push(`/dashboard/orgs/${orgId}/facilities`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Create Facility</h2>

      <input
        type="text"
        placeholder="Facility name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Electrolyzer Type"
        value={electrolyzerType}
        onChange={(e) => setElectrolyzerType(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Capacity (MW)"
        value={capacityMW}
        onChange={(e) => setCapacityMW(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Renewable Source (e.g. Solar, Wind)"
        value={renewableSource}
        onChange={(e) => setRenewableSource(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Facility
      </button>
    </form>
  );
}