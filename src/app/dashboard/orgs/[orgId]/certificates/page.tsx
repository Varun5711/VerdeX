"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";

export default function CertificatesPage() {
  const { orgId } = useParams();

  if (!orgId) return <div>Invalid organization</div>;

  const certs = useQuery(api.certificates.listByOrg, {
    orgId: orgId as any,
  });

  if (certs === undefined) return <div>Loading...</div>;

  return (
    <div>
      <h1>Certificates</h1>
      <ul>
        {certs.map((c: any) => (
          <li key={c._id}>
            Cert #{c._id} — {c.amount} units (ClaimRef: {c.claimRef})
          </li>
        ))}
      </ul>
    </div>
  );
}