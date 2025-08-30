"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function NewBatchPage() {
  const { orgId, facilityId } = useParams();
  const { userId } = useAuth();

  const proposeBatch = useMutation(api.batches.propose);
  const [amount, setAmount] = useState("");
  const router = useRouter();

  return (
    <div>
      <h1>Create Batch Proposal</h1>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Hydrogen amount (kg)"
      />
      <button
        onClick={async () => {
          await proposeBatch({
            clerkUserId: userId!,
            producerOrg: orgId as any,
            facilityId: facilityId as any,
            batchId: crypto.randomUUID(), // unique client-side id
            startTs: Date.now(),
            endTs: Date.now() + 3600 * 1000, // +1 hour (example)
            amount,
            meterHash: "0x...",          // TODO: from file hash or reading
            renewableProofHash: "0x...", // TODO
            docBundleHash: "0x...",      // TODO
            status: "DRAFT",             // or "PROPOSED"
          });
          router.push(`/dashboard/orgs/${orgId}/batches`);
        }}
      >
        Save
      </button>
    </div>
  );
}