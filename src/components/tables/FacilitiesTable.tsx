"use client";

import { Id } from "../../../convex/_generated/dataModel";

export default function FacilitiesTable({ facilities }: { facilities: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {facilities.map((f) => (
          <tr key={f._id}>
            <td>{f.name}</td>
            <td>{f.location?.region || "Unknown"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}