"use client";

import AddressBadge from "../blocks/AddressBadge";

export default function RetirementsTable({ rets }: { rets: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Batch</th>
          <th>Amount</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {rets.map((r) => (
          <tr key={r._id}>
            <td>{r.batchId}</td>
            <td>{r.amount}</td>
            <td><AddressBadge address={r.owner} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}