"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  CogIcon,
  ChartBarIcon,
  UserGroupIcon,
  KeyIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  WalletIcon
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  badge?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: HomeIcon,
    roles: ["PRODUCER", "CERTIFIER", "AUTHORITY", "BUYER", "AUDITOR", "ADMIN"]
  },
  {
    name: "Organizations",
    href: "/dashboard/orgs",
    icon: BuildingOfficeIcon,
    roles: ["ADMIN"],
    children: [
      {
        name: "All Organizations",
        href: "/dashboard/orgs",
        icon: BuildingOfficeIcon,
        roles: ["ADMIN"]
      }
    ]
  },
  {
    name: "Facilities",
    href: "/dashboard/orgs/[orgId]/facilities",
    icon: BuildingOfficeIcon,
    roles: ["PRODUCER", "ADMIN"],
    children: [
      {
        name: "Production Sites",
        href: "/dashboard/orgs/[orgId]/facilities",
        icon: BuildingOfficeIcon,
        roles: ["PRODUCER", "ADMIN"]
      },
      {
        name: "Add Facility",
        href: "/dashboard/orgs/[orgId]/facilities/new",
        icon: BuildingOfficeIcon,
        roles: ["PRODUCER", "ADMIN"]
      }
    ]
  },
  {
    name: "Meters",
    href: "/dashboard/orgs/[orgId]/meters",
    icon: ChartBarIcon,
    roles: ["PRODUCER", "ADMIN"],
    children: [
      {
        name: "Measurement Devices",
        href: "/dashboard/orgs/[orgId]/meters",
        icon: ChartBarIcon,
        roles: ["PRODUCER", "ADMIN"]
      },
      {
        name: "Add Meter",
        href: "/dashboard/orgs/[orgId]/meters/new",
        icon: ChartBarIcon,
        roles: ["PRODUCER", "ADMIN"]
      }
    ]
  },
  {
    name: "Batches",
    href: "/dashboard/orgs/[orgId]/batches",
    icon: DocumentTextIcon,
    roles: ["PRODUCER", "CERTIFIER", "AUTHORITY", "ADMIN"],
    children: [
      {
        name: "Credit Batches",
        href: "/dashboard/orgs/[orgId]/batches",
        icon: DocumentTextIcon,
        roles: ["PRODUCER", "CERTIFIER", "AUTHORITY", "ADMIN"]
      },
      {
        name: "Create Batch",
        href: "/dashboard/orgs/[orgId]/batches/new",
        icon: DocumentTextIcon,
        roles: ["PRODUCER", "ADMIN"]
      },
      {
        name: "Pending Review",
        href: "/dashboard/orgs/[orgId]/batches/pending",
        icon: DocumentTextIcon,
        roles: ["CERTIFIER", "AUTHORITY", "ADMIN"]
      }
    ]
  },
  {
    name: "Retirements",
    href: "/dashboard/orgs/[orgId]/retirements",
    icon: ClipboardDocumentListIcon,
    roles: ["BUYER", "AUDITOR", "ADMIN"],
    children: [
      {
        name: "Credit Retirements",
        href: "/dashboard/orgs/[orgId]/retirements",
        icon: ClipboardDocumentListIcon,
        roles: ["BUYER", "AUDITOR", "ADMIN"]
      },
      {
        name: "Retire Credits",
        href: "/dashboard/orgs/[orgId]/retirements/new",
        icon: ClipboardDocumentListIcon,
        roles: ["BUYER", "ADMIN"]
      }
    ]
  },
  {
    name: "Certificates",
    href: "/dashboard/orgs/[orgId]/certificates",
    icon: ShieldCheckIcon,
    roles: ["CERTIFIER", "AUTHORITY", "AUDITOR", "ADMIN"],
    children: [
      {
        name: "All Certificates",
        href: "/dashboard/orgs/[orgId]/certificates",
        icon: ShieldCheckIcon,
        roles: ["CERTIFIER", "AUTHORITY", "AUDITOR", "ADMIN"]
      },
      {
        name: "Issue Certificate",
        href: "/dashboard/orgs/[orgId]/certificates/new",
        icon: ShieldCheckIcon,
        roles: ["AUTHORITY", "ADMIN"]
      }
    ]
  },
  {
    name: "API Keys",
    href: "/dashboard/orgs/[orgId]/apikeys",
    icon: KeyIcon,
    roles: ["ADMIN"],
    children: [
      {
        name: "Manage API Keys",
        href: "/dashboard/orgs/[orgId]/apikeys",
        icon: KeyIcon,
        roles: ["ADMIN"]
      },
      {
        name: "Create API Key",
        href: "/dashboard/orgs/[orgId]/apikeys/new",
        icon: KeyIcon,
        roles: ["ADMIN"]
      }
    ]
  },
  {
    name: "Audit Log",
    href: "/dashboard/orgs/[orgId]/audit",
    icon: ClipboardDocumentListIcon,
    roles: ["AUDITOR", "ADMIN"],
    children: [
      {
        name: "System Audit",
        href: "/dashboard/orgs/[orgId]/audit",
        icon: ClipboardDocumentListIcon,
        roles: ["AUDITOR", "ADMIN"]
      }
    ]
  },
  {
    name: "Settings",
    href: "/dashboard/orgs/[orgId]/settings",
    icon: CogIcon,
    roles: ["ADMIN"],
    children: [
      {
        name: "Organization",
        href: "/dashboard/orgs/[orgId]/settings",
        icon: CogIcon,
        roles: ["ADMIN"]
      },
      {
        name: "Members",
        href: "/dashboard/orgs/[orgId]/settings/members",
        icon: UserGroupIcon,
        roles: ["ADMIN"]
      }
    ]
  }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { address, isConnected } = useAccount();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Get user roles from Clerk (simplified - you'd implement proper role resolution)
  const userRoles = ["PRODUCER", "ADMIN"]; // This should come from your auth system

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const isItemActive = (href: string) => {
    if (href.includes("[orgId]")) {
      // For dynamic routes, check if we're in the right section
      return pathname.includes(href.split("/")[2]);
    }
    return pathname === href;
  };

  const canAccessItem = (item: NavItem) => {
    return item.roles.some(role => userRoles.includes(role));
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    if (!canAccessItem(item)) return null;

    const isActive = isItemActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);

    return (
      <div key={item.name}>
        <div className={`flex items-center justify-between ${level > 0 ? 'ml-4' : ''}`}>
          <Link
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
            {item.name}
            {item.badge && (
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {item.badge}
              </span>
            )}
          </Link>
          
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.name)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <ArrowRightOnRectangleIcon 
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
              />
            </button>
          )}
        </div>

        {/* Render children */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900">VerdeX</h1>
            <p className="text-xs text-gray-500">Green Hydrogen Credits</p>
          </div>
        </div>
      </div>

      {/* Wallet Status */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</span>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
        <div className="text-sm">
          {address ? (
            <div className="font-mono text-gray-900">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <div className="text-gray-500">Not connected</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map(item => renderNavItem(item))}
      </nav>

      {/* User Info */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <UserGroupIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}
            </p>
            <p className="text-xs text-gray-500">
              {userRoles.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
