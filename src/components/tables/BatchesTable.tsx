"use client";

import StatusPill from "../blocks/StatusPill";
import HashBadge from "../blocks/HashBadge";

export default function BatchesTable({ batches }: { batches: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Batch</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Meter Hash</th>
        </tr>
      </thead>
      <tbody>
        {batches.map((b) => (
          <tr key={b._id}>
            <td>{b.batchId}</td>
            <td>{b.amount}</td>
            <td><StatusPill status={b.status} /></td>
            <td>{b.meterHash && <HashBadge hash={b.meterHash} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}