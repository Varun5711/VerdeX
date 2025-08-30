"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

export default function BatchesPage() {
  const { orgId } = useParams();
  const router = useRouter();

  const batches = useQuery(api.batches.listByOrg, { orgId: orgId as any });

  if (!batches) return <div>Loading...</div>;

  return (
    <div>
      <h1>Batches</h1>
      <button onClick={() => router.push(`/dashboard/orgs/${orgId}/batches/new`)}>➕ New Batch</button>
      <ul>
        {batches.map((b: any) => (
          <li key={b._id}>
            <a href={`/dashboard/orgs/${orgId}/batches/${b._id}`}>
              Batch {b.batchId} — {b.status} — {b.amount} units
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}