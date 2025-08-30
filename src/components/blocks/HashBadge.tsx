"use client";

export default function HashBadge({ hash }: { hash: string }) {
  const short = hash.slice(0, 6) + "..." + hash.slice(-4);
  return (
    <span
      onClick={() => navigator.clipboard.writeText(hash)}
      className="cursor-pointer font-mono bg-gray-100 px-2 py-1 rounded"
      title={hash}
    >
      {short}
    </span>
  );
}