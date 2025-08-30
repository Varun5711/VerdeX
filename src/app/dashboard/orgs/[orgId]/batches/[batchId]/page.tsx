"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function BatchDetailPage() {
  const { batchId } = useParams(); // external string
  const { user } = useUser();

  // ✅ fetch by external batchId
  const batch = useQuery(api.batches.getByBatchId, { batchId: batchId as string });

  const approve = useMutation(api.batches.approve);
  const reject = useMutation(api.batches.reject);
  const issue = useMutation(api.batches.issue);

  if (batch === undefined) return <div>Loading...</div>;
  if (batch === null) return <div>Batch not found</div>;

  return (
    <div>
      <h1>Batch {batch.batchId}</h1>
      <p>Status: {batch.status}</p>
      <p>Amount: {batch.amount} units</p>

      {batch.status === "PROPOSED" && (
        <>
          <button
            onClick={() =>
              approve({ clerkUserId: user?.id!, id: batch._id }) // ✅ now we have Convex _id
            }
          >
            Approve
          </button>
          <button
            onClick={() =>
              reject({ clerkUserId: user?.id!, id: batch._id, reason: "Not valid" })
            }
          >
            Reject
          </button>
        </>
      )}

      {batch.status === "APPROVED" && (
        <button
          onClick={() => issue({ clerkUserId: user?.id!, id: batch._id })}
        >
          Issue
        </button>
      )}
    </div>
  );
}