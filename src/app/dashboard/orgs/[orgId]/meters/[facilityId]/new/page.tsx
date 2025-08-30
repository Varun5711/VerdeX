
"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function NewMeterPage() {
  const { orgId, facilityId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const createMeter = useMutation(api.meters.create);

  const [meterId, setMeterId] = useState("");
  const [unit, setUnit] = useState("kWh");
  const [kind, setKind] = useState<"PRODUCTION" | "ELECTRICITY" | "WATER" | "OTHER">("PRODUCTION");

  return (
    <div>
      <h1>New Meter</h1>
      <input placeholder="Meter ID" value={meterId} onChange={e => setMeterId(e.target.value)} />
      <input placeholder="Unit (e.g. kWh)" value={unit} onChange={e => setUnit(e.target.value)} />
      <select value={kind} onChange={e => setKind(e.target.value as any)}>
        <option value="PRODUCTION">Production</option>
        <option value="ELECTRICITY">Electricity</option>
        <option value="WATER">Water</option>
        <option value="OTHER">Other</option>
      </select>
      <button
        onClick={async () => {
          if (!user) return;
          await createMeter({ facilityId: facilityId as any, meterId, unit, kind, clerkUserId: user.id });
          router.push(`/dashboard/orgs/${orgId}/meters/${facilityId}`);
        }}
      >
        Save
      </button>
    </div>
  );
}