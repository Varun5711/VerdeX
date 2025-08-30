"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function CertifierBatchesPage() {
  const { orgId } = useParams();
  const { user } = useUser();
  const clerkUserId = user?.id ?? "";

  // 🔎 Fetch PROPOSED batches for this org
  const proposedBatches = useQuery(api.batches.listByOrg, {
    orgId: orgId as any,
    status: "PROPOSED",
  });

  const approveBatch = useMutation(api.batches.approve);
  const rejectBatch = useMutation(api.batches.reject);

  const [rejectReason, setRejectReason] = useState("");

  if (!proposedBatches) return <div>Loading...</div>;

  return (
    <div>
      <h1>📋 Certifier Review — Proposed Batches</h1>

      {proposedBatches.length === 0 ? (
        <p>No proposed batches to review.</p>
      ) : (
        <ul className="space-y-4">
          {proposedBatches.map((batch:any) => (
            <li key={batch._id} className="border p-4 rounded">
              <p>
                <strong>Batch ID:</strong> {batch.batchId}
              </p>
              <p>
                <strong>Amount:</strong> {batch.amount} units
              </p>
              <p>
                <strong>Status:</strong> {batch.status}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(batch.startTs).toLocaleDateString()} →{" "}
                {new Date(batch.endTs).toLocaleDateString()}
              </p>

              {/* ✅ Approve Button */}
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                onClick={async () =>
                  await approveBatch({
                    clerkUserId: user?.id!,
                    id: batch._id,
                  })
                }
              >
                Approve
              </button>

              {/* ❌ Reject with reason */}
              <input
                className="border px-2 py-1 mr-2"
                placeholder="Reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={async () =>
                  await rejectBatch({
                    clerkUserId,
                    id: batch._id,
                    reason: rejectReason,
                  })
                }
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}