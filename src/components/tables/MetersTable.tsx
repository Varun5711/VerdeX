"use client";

export default function MetersTable({ meters }: { meters: any[] }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Meter ID</th>
          <th>Kind</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {meters.map((m) => (
          <tr key={m._id}>
            <td>{m.meterId}</td>
            <td>{m.kind}</td>
            <td>{m.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}