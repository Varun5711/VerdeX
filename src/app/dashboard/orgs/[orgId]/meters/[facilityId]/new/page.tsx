"use client";

import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


export default function NewMeterPage() {
  const params = useParams();
  const facilityId = params.facilityId as string | undefined;
  const { user } = useUser();

  const createMeter = useMutation(api.meters.create);

  const [unit, setUnit] = useState("");
  const [kind, setKind] = useState<"PRODUCTION" | "ELECTRICITY" | "WATER" | "OTHER">("PRODUCTION");

  if (!facilityId) return <div>Invalid facility</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    await createMeter({
      clerkUserId: user.id,
      facilityId: facilityId as any, // ✅ safe cast for Convex
      meterId: crypto.randomUUID(),
      unit,
      kind,
    });

    alert("Meter created!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Meter</h1>
      <label>
        Unit:
        <input value={unit} onChange={(e) => setUnit(e.target.value)} />
      </label>
      <label>
        Kind:
        <select value={kind} onChange={(e) => setKind(e.target.value as any)}>
          <option value="PRODUCTION">Production</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="WATER">Water</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <button type="submit">Create Meter</button>
    </form>
  );
}