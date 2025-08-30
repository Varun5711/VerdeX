"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "../../../../../../../convex/_generated/dataModel";

export default function MetersPage() {
  const params = useParams();
  const facilityId = params.facilityId as string as Id<"facilities">;

  const meters = useQuery(api.meters.listByFacility, { facilityId });

  if (!meters) return <div>Loading...</div>;

  return (
    <div>
      <h1>Meters</h1>
      <ul>
        {meters.map((m) => (
          <li key={m._id}>
            Meter ID: {m.meterId} | Kind: {m.kind} | Unit: {m.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}