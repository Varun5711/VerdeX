"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function BatchDetailPage() {
  const { batchId } = useParams();
  const { user } = useUser();

  const batch = useQuery(api.batches.get, { id: batchId as any });
  const approve = useMutation(api.batches.approve);
  const reject = useMutation(api.batches.reject);
  const issue = useMutation(api.batches.issue);

  if (!batch) return <div>Loading...</div>;

  return (
    <div>
      <h1>Batch {batch.batchId}</h1>
      <p>Status: {batch.status}</p>
      <p>Amount: {batch.amount} units</p>

      {batch.status === "PROPOSED" && (
        <>
          <button onClick={() => approve({ clerkUserId: user?.id!, id: batch._id })}>Approve</button>
          <button onClick={() => reject({ clerkUserId: user?.id!, id: batch._id, reason: "Not valid" })}>Reject</button>
        </>
      )}

      {batch.status === "APPROVED" && (
        <button onClick={() => issue({ clerkUserId: user?.id!, id: batch._id })}>Issue</button>
      )}
    </div>
  );
}