"use client";


import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default function FacilitiesPage() {
  const params = useParams();
  const orgId = params.orgId;

  // Ensure orgId is a string and not an array/undefined
  if (!orgId || Array.isArray(orgId)) {
    return <div>Invalid org</div>;
  }

  const facilities = useQuery(api.facilities.listByOrg, {
    orgId: orgId as Id<"orgs">,  // ✅ Safe cast
  });

  if (!facilities) return <div>Loading...</div>;

  return (
    <div>
      <h1>Facilities</h1>
      <ul>
        {facilities.map((f:any) => (
          <li key={f._id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}