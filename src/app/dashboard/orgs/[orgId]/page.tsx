"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import Link from "next/link";
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

interface OrgStats {
  facilities: number;
  batches: number;
  meters: number;
  certificates: number;
  retirements: number;
  documents: number;
  totalCredits: number;
  onChainCredits: number;
  totalRetired: number;
}

export default function OrganizationPage({ params }: { params: { orgId: string } }) {
  const { user } = useUser();
  const { address } = useAccount();
  const org = useQuery(api.orgs.getById, { orgId: params.orgId as any });
  const stats = useQuery(api.overview.getOrgStats, { orgId: params.orgId as any });

  if (!org || !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading organization...</span>
      </div>
    );
  }

  const formatCredits = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} t H2`;
    }
    return `${amount} kg H2`;
  };

  const navigationSections = [
    {
      title: "Production Management",
      description: "Manage facilities, meters, and production data",
      icon: BuildingOfficeIcon,
      items: [
        { name: "Facilities", href: `/dashboard/orgs/${params.orgId}/facilities`, count: stats.facilities },
        { name: "Meters", href: `/dashboard/orgs/${params.orgId}/meters`, count: stats.meters },
      ]
    },
    {
      title: "Credit Operations",
      description: "Handle credit batches, certificates, and retirements",
      icon: DocumentTextIcon,
      items: [
        { name: "Batches", href: `/dashboard/orgs/${params.orgId}/batches`, count: stats.batches },
        { name: "Certificates", href: `/dashboard/orgs/${params.orgId}/certificates`, count: stats.certificates },
        { name: "Retirements", href: `/dashboard/orgs/${params.orgId}/retirements`, count: stats.retirements },
      ]
    },
    {
      title: "Compliance & Audit",
      description: "Document management and audit trails",
      icon: ShieldCheckIcon,
      items: [
        { name: "Documents", href: `/dashboard/orgs/${params.orgId}/docs`, count: stats.documents },
        { name: "Audit Log", href: `/dashboard/orgs/${params.orgId}/audit`, count: 0 },
      ]
    },
    {
      title: "Integration & Security",
      description: "API keys and system configuration",
      icon: KeyIcon,
      items: [
        { name: "API Keys", href: `/dashboard/orgs/${params.orgId}/apikeys`, count: 0 },
        { name: "Settings", href: `/dashboard/orgs/${params.orgId}/settings`, count: 0 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{org.name}</h1>
            <p className="text-gray-600 mt-2">{org.description || "Green hydrogen credit management organization"}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span>Organization ID: {org.orgId}</span>
              <span>•</span>
              <span>Created: {new Date(org.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Wallet Status</div>
            <div className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Facilities</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.facilities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Credits</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCredits(stats.totalCredits)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">On-Chain</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCredits(stats.onChainCredits)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Retired</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCredits(stats.totalRetired)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-6">
        {navigationSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <section.icon className="w-6 h-6 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
              <p className="text-sm text-gray-500 mt-1">{section.description}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-emerald-700">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.count} {item.name.toLowerCase()}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/dashboard/orgs/${params.orgId}/facilities/new`}
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏭</div>
                <div className="text-sm font-medium text-gray-900">Add Facility</div>
                <div className="text-xs text-gray-500">Create new production site</div>
              </div>
            </Link>
            
            <Link
              href={`/dashboard/orgs/${params.orgId}/batches/new`}
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📦</div>
                <div className="text-sm font-medium text-gray-900">Create Batch</div>
                <div className="text-xs text-gray-500">Propose new credit batch</div>
              </div>
            </Link>
            
            <Link
              href={`/dashboard/orgs/${params.orgId}/docs/upload`}
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📄</div>
                <div className="text-sm font-medium text-gray-900">Upload Documents</div>
                <div className="text-xs text-gray-500">Add compliance documents</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}