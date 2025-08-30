"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api"
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function NewBatchPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const propose = useMutation(api.batches.propose);

  // 🔽 Fetch facilities for this org
  const facilities = useQuery(api.facilities.listByOrg, { orgId: orgId as any });

  const [facilityId, setFacilityId] = useState("");
  const [amount, setAmount] = useState("");
  const [startTs, setStartTs] = useState("");
  const [endTs, setEndTs] = useState("");
  const [meterHash, setMeterHash] = useState("");
  const [renewableProofHash, setRenewableProofHash] = useState("");
  const [docBundleHash, setDocBundleHash] = useState("");

  if (!facilities) return <div>Loading facilities...</div>;

  return (
    <div>
      <h1>Propose Batch</h1>

      {/* Facility dropdown */}
      <select value={facilityId} onChange={(e) => setFacilityId(e.target.value)}>
        <option value="">Select Facility</option>
        {facilities.map((f: any) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>

      <input placeholder="Amount (kg)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Start Time (ms)" value={startTs} onChange={(e) => setStartTs(e.target.value)} />
      <input placeholder="End Time (ms)" value={endTs} onChange={(e) => setEndTs(e.target.value)} />
      <input placeholder="Meter Hash" value={meterHash} onChange={(e) => setMeterHash(e.target.value)} />
      <input placeholder="Renewable Proof Hash" value={renewableProofHash} onChange={(e) => setRenewableProofHash(e.target.value)} />
      <input placeholder="Doc Bundle Hash" value={docBundleHash} onChange={(e) => setDocBundleHash(e.target.value)} />

      <button
        disabled={!facilityId}
        onClick={async () => {
          await propose({
            clerkUserId: user?.id!,
            producerOrg: orgId as any,
            facilityId: facilityId as any, // ✅ now picked from dropdown
            batchId: crypto.randomUUID(),
            startTs: Number(startTs),
            endTs: Number(endTs),
            amount,
            meterHash,
            renewableProofHash,
            docBundleHash,
            status: "PROPOSED",
          });
          router.push(`/dashboard/orgs/${orgId}/batches`);
        }}
      >
        Submit
      </button>
    </div>
  );
}