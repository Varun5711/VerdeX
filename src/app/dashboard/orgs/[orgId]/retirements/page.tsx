"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function RetirementsPage() {
  const { orgId } = useParams();
  const retirements = useQuery(api.retirements.listByOrg, { owner: String(orgId) });

  if (!retirements) return <div>Loading...</div>;

  return (
    <div>
      <h1>Retirements</h1>
      <ul>
        {retirements.map((r: any) => (
          <li key={r._id}>
            {r.amount} credits retired from batch {r.batchId} at{" "}
            {new Date(r.retiredAtMs).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}