"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface Meter {
  _id: string;
  meterId: string;
  facilityId: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  installationDate: number;
  lastCalibration: number;
  nextCalibration: number;
  status: "ACTIVE" | "MAINTENANCE" | "CALIBRATION" | "INACTIVE";
  location: string;
  accuracy: string;
  range: string;
  unit: string;
  facility?: {
    name: string;
    facilityId: string;
  };
}

export default function MetersTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const meters = useQuery(api.meters.listByOrg, { orgId: orgId as any });
  const deleteMeter = useMutation(api.meters.deleteMeter);
  
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = async () => {
    if (!selectedMeter || !user) return;
    
    setIsDeleting(true);
    try {
      await deleteMeter({
        clerkUserId: user.id,
        meterId: selectedMeter._id as any,
      });
      setShowDeleteModal(false);
      setSelectedMeter(null);
    } catch (error) {
      console.error("Failed to delete meter:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (meter: Meter) => {
    setSelectedMeter(meter);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      case "CALIBRATION":
        return "bg-blue-100 text-blue-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "🟢";
      case "MAINTENANCE":
        return "🟡";
      case "CALIBRATION":
        return "🔵";
      case "INACTIVE":
        return "⚫";
      default:
        return "❓";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCalibrationStatus = (meter: Meter) => {
    const now = Date.now();
    const daysUntilCalibration = Math.ceil((meter.nextCalibration - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilCalibration < 0) {
      return { status: "Overdue", color: "text-red-600", bg: "bg-red-100" };
    } else if (daysUntilCalibration <= 30) {
      return { status: "Due Soon", color: "text-yellow-600", bg: "bg-yellow-100" };
    } else {
      return { status: "Valid", color: "text-green-600", bg: "bg-green-100" };
    }
  };

  const filteredMeters = meters?.filter(meter => {
    if (filterStatus === "all") return true;
    return meter.status === filterStatus;
  }) || [];

  if (!meters) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading meters...</span>
      </div>
    );
  }

  if (meters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No meters found</h3>
        <p className="text-gray-500">Get started by adding measurement devices to your facilities.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Measurement Devices</h2>
            <p className="text-sm text-gray-500">
              {meters.length} meter{meters.length !== 1 ? 's' : ''} • 
              Active: {meters.filter(m => m.status === "ACTIVE").length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Meters</option>
                <option value="ACTIVE">Active</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="CALIBRATION">Calibration</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Wallet:</span>
              <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calibration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Installation
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMeters.map((meter) => {
              const calibrationStatus = getCalibrationStatus(meter);
              
              return (
                <tr key={meter._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{meter.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{meter.meterId}</div>
                      <div className="text-xs text-gray-400">{meter.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {meter.facility?.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {meter.facility?.facilityId || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {meter.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {meter.manufacturer} {meter.model}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      S/N: {meter.serialNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getStatusIcon(meter.status)}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meter.status)}`}>
                        {meter.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${calibrationStatus.bg} ${calibrationStatus.color}`}>
                        {calibrationStatus.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Due: {formatDate(meter.nextCalibration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(meter.installationDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/dashboard/orgs/${orgId}/meters/${meter._id}`, '_blank')}
                        className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.open(`/dashboard/orgs/${orgId}/meters/${meter._id}/edit`, '_blank')}
                        className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(meter)}
                        className="text-red-600 hover:text-red-900 px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Meter</h3>
              <div className="mt-2 px-7">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedMeter?.name}</strong>? 
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
