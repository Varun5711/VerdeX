"use client";

import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

export default function TopbarUser() {
  const { user } = useUser();
  const { address, isConnected } = useAccount();

  return (
    <div className="flex items-center gap-4">
      {user && (
        <span className="text-sm">
          {user.fullName || user.username || user.primaryEmailAddress?.emailAddress}
        </span>
      )}
      {isConnected ? (
        <span className="text-sm font-mono">{address}</span>
      ) : (
        <span className="text-sm text-gray-500">Wallet not connected</span>
      )}
    </div>
  );
}