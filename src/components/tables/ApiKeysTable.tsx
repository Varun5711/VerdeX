"use client";

import HashBadge from "../blocks/HashBadge";

export default function ApiKeysTable({ keys }: { keys: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Scopes</th>
          <th>Key Hash</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((k) => (
          <tr key={k._id}>
            <td>{k.name}</td>
            <td>{k.scopes.join(", ")}</td>
            <td><HashBadge hash={k.hashedKey} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}