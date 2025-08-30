"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { address } = useAccount();

  // hydration fix: detect client-side render
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold mb-4">Green-H2</h2>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard/overview"
            className={pathname.startsWith("/dashboard/overview") ? "font-bold" : ""}
          >
            Overview
          </Link>
        </nav>
      </aside>

      {/* Main + Header */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex justify-between items-center px-4">
          <span>Dashboard</span>
          <div className="flex gap-3 text-sm">
            {user?.primaryEmailAddress?.emailAddress ?? "No email"}
            {mounted ? (
              address ? (
                <span className="font-mono">{address}</span>
              ) : (
                <span className="text-gray-500">Wallet not connected</span>
              )
            ) : (
              // during SSR: render nothing (avoids mismatch)
              <span className="text-gray-400">...</span>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}