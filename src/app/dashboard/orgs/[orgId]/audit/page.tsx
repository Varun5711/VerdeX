"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function AuditPage() {
  const params = useParams();
  const orgId = params.orgId as string | undefined;

  const logs = useQuery(
    api.auditLog.listByTarget,
    orgId ? { targetTable: "orgs", targetId: orgId as any } : "skip"
  );

  if (!orgId) return <div>Invalid org</div>;
  if (logs === undefined) return <div>Loading...</div>;

  return (
    <div>
      <h1>Audit Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            [{new Date(log.at).toLocaleString()}]{" "}
            {log.actor} did <b>{log.action}</b> on {log.targetTable}/{log.targetId}
          </li>
        ))}
      </ul>
    </div>
  );
}