"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";


export default function DocsPage() {
  const params = useParams();
  const orgId = params.orgId as string; // ✅ explicitly cast

  const docs = useQuery(api.docs.listByOrg, { orgId: orgId as any }); 
  // 👆 if you generated Convex types, you can cast to Id<"orgs"> instead of any

  if (!docs) return <div>Loading...</div>;

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {docs.map((d: any) => (
          <li key={d._id}>{d.label ?? "Untitled"} ({d.type})</li>
        ))}
      </ul>
    </div>
  );
}