"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

export default function BatchDetailPage() {
  const params = useParams();
  const batchId = params.batchId as string;

  const batch = useQuery(api.batches.get, { id: batchId as any });

  if (!batch) return <div>Loading batch...</div>;

  return (
    <div>
      <h1>Batch {batch._id}</h1>
      <p>Status: {batch.status}</p>
      <p>Produced at Facility: {batch.facilityId}</p>
      <p>Created: {new Date(batch.createdAt).toLocaleString()}</p>
      {/* if you add desc to schema later: */}
      {/* <p>Description: {batch.desc}</p> */}
    </div>
  );
}