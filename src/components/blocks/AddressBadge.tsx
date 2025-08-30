"use client";

export default function AddressBadge({ address }: { address: string }) {
  const short = address.slice(0, 6) + "..." + address.slice(-4);
  return (
    <span
      onClick={() => navigator.clipboard.writeText(address)}
      className="cursor-pointer font-mono bg-blue-100 px-2 py-1 rounded"
      title={address}
    >
      {short}
    </span>
  );
}