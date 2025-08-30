"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";

export default function MetersPage() {
  const { facilityId, orgId } = useParams();
  const meters = useQuery(api.meters.listByFacility, { facilityId: facilityId as any });
  const router = useRouter();

  if (!meters) return <div>Loading...</div>;

  return (
    <div>
      <h1>Meters</h1>
      <button onClick={() => router.push(`/dashboard/orgs/${orgId}/meters/${facilityId}/new`)}>+ Add Meter</button>
      <ul>
        {meters.map((m:any) => (
          <li key={m._id}>
            {m.meterId} ({m.kind}) [{m.unit}]
          </li>
        ))}
      </ul>
    </div>
  );
}