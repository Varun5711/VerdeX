"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const nav = [
  { href: "facilities", label: "Facilities" },
  { href: "batches", label: "Batches" },
  { href: "certificates", label: "Certificates" },
  { href: "retirements", label: "Retirements" },
  { href: "docs", label: "Docs" },
  { href: "apikeys", label: "API Keys" },
  { href: "audit", label: "Audit Logs" },
  { href: "settings", label: "Settings" },
];

export default function OrgDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { orgId } = useParams();

  return (
    <div className="flex">
      <aside className="w-64 border-r p-4">
        <h3 className="font-semibold mb-2">Organization</h3>
        <nav className="flex flex-col gap-2">
          {nav.map((i) => {
            const href = `/dashboard/orgs/${orgId}/${i.href}`;
            const active = pathname.startsWith(href);
            return (
              <Link key={i.label} href={href} className={active ? "font-bold" : ""}>
                {i.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}