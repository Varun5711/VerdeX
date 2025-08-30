"use client";

import StatusPill from "../blocks/StatusPill";
import HashBadge from "../blocks/HashBadge";

export default function CertificatesTable({ certs }: { certs: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Certificate</th>
          <th>Amount</th>
          <th>Tx Hash</th>
        </tr>
      </thead>
      <tbody>
        {certs.map((c) => (
          <tr key={c._id}>
            <td>{c._id}</td>
            <td>{c.amount}</td>
            <td>{c.txHash && <HashBadge hash={c.txHash} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}