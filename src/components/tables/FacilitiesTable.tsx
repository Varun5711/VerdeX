"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { Id } from "../../../convex/_generated/dataModel";

interface Facility {
  _id: string;
  facilityId: string;
  name: string;
  location: {
    country: string;
    region?: string;
    lat?: number;
    lon?: number;
    gridZone?: string;
  };
  tech?: {
    electrolyzerType?: string;
    capacityMW?: string;
    renewableSource?: string;
  };
  createdAt: number;
  createdBy: string;
}

  export default function FacilitiesTable({ orgId }: { orgId: Id<"orgs"> }) {
  const { user } = useUser();
  const { address } = useAccount();
  const facilities = useQuery(api.facilities.listByOrg, { orgId: orgId });
  const deleteFacility = useMutation(api.facilities.deleteFacility);
  
  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (!selectedFacility || !user) return;
    
    setIsDeleting(true);
    try {
      await deleteFacility({
        clerkUserId: user.id,
        id: selectedFacility._id as any,
      });
      setShowDeleteModal(false);
      setSelectedFacility(null);
    } catch (error) {
      console.error("Failed to delete facility:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (facility: any) => {
    setSelectedFacility(facility);
    setShowDeleteModal(true);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCapacity = (capacity: string) => {
    const num = parseFloat(capacity);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} GW`;
    }
    return `${num} MW`;
  };

  const getStatusColor = (facility: any) => {
    // Check if facility has recent activity (within last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    if (facility.createdAt > thirtyDaysAgo) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (!facilities) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading facilities...</span>
      </div>
    );
  }

  if (facilities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
        <p className="text-gray-500">Get started by creating your first hydrogen production facility.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Production Facilities</h2>
            <p className="text-sm text-gray-500">
              {facilities.length} facility{facilities.length !== 1 ? 's' : ''} • 
              Total Capacity: {facilities.reduce((sum, f) => sum + (f.tech?.capacityMW ? parseFloat(f.tech.capacityMW) : 0), 0).toFixed(1)} MW
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Wallet:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Technology
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facilities.map((facility) => (
              <tr key={facility._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                    <div className="text-sm text-gray-500 font-mono">{facility._id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div>{facility.location.country}</div>
                    {facility.location.region && (
                      <div className="text-gray-500">{facility.location.region}</div>
                    )}
                    {facility.location.lat && facility.location.lon && (
                      <div className="text-xs text-gray-400 font-mono">
                        {facility.location.lat.toFixed(4)}, {facility.location.lon.toFixed(4)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {facility.tech?.electrolyzerType ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {facility.tech.electrolyzerType}
                        </span>
                        {facility.tech.renewableSource && (
                          <span className="text-xs text-gray-500">
                            {facility.tech.renewableSource}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not specified</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {facility.tech?.capacityMW ? (
                      <span className="font-medium">{formatCapacity(facility.tech.capacityMW)}</span>
                    ) : (
                      <span className="text-gray-400">Not specified</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(facility as any)}`}>
                    {facility.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(facility.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => window.open(`/dashboard/orgs/${orgId}/facilities/${facility._id}`, '_blank')}
                      className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => window.open(`/dashboard/orgs/${orgId}/facilities/${facility._id}/edit`, '_blank')}
                      className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(facility as any)}
                      className="text-red-600 hover:text-red-900 px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Facility</h3>
              <div className="mt-2 px-7">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedFacility?.name}</strong>? 
                  This action cannot be undone and will remove all associated data.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    isDeleting 
                      ? 'bg-red-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
