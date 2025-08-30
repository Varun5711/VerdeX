"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";


export default function OrgPage() {
  const { orgId } = useParams();

  if (!orgId || Array.isArray(orgId)) {
    return <div>Invalid org</div>;
  }

  const facilities = useQuery(api.facilities.listByOrg, {
    orgId: orgId as any, // cast for Convex Id<"orgs">
  });

  if (facilities === undefined) return <div>Loading...</div>;

  return (
    <div>
      <h1>Org {orgId}</h1>
      <h2>Facilities</h2>
      <ul>
        {facilities.map((f: any) => (
          <li key={f._id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}