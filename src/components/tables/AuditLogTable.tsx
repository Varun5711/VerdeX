"use client";

import AddressBadge from "../blocks/AddressBadge";

export default function AuditLogTable({ logs }: { logs: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Action</th>
          <th>User</th>
          <th>At</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.action}</td>
            <td>{log.actor && <AddressBadge address={log.actor} />}</td>
            <td>{new Date(log.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}