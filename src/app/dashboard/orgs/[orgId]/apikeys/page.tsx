"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function ApiKeysPage() {
  const params = useParams();
  const orgId = params.orgId as string | undefined;

  const keys = useQuery(
    api.apiKeys.listByOwner,
    orgId ? { ownerOrg: orgId as any } : "skip"
  );

  if (!orgId) return <div>Invalid org</div>;
  if (keys === undefined) return <div>Loading...</div>;

  return (
    <div>
      <h1>API Keys</h1>
      <ul>
        {keys.map((k) => (
          <li key={k._id}>
            {k.name} {k.disabled ? "(disabled)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}