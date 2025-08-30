"use client";

export default function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: "bg-gray-200 text-gray-800",
    PROPOSED: "bg-blue-200 text-blue-800",
    APPROVED: "bg-green-200 text-green-800",
    REJECTED: "bg-red-200 text-red-800",
    ISSUED: "bg-purple-200 text-purple-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || "bg-gray-100"}`}>
      {status}
    </span>
  );
}