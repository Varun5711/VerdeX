"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface Retirement {
  _id: string;
  batchId: string;
  tokenIdHex: string;
  owner: string;
  amount: string;
  claimRef: string;
  retiredAtMs: number;
  txHash: string;
  reason?: string;
  batch?: {
    batchId: string;
    amount: string;
    facilityId: string;
  };
  facility?: {
    name: string;
    facilityId: string;
  };
}

export default function RetirementsTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const retirements = useQuery(api.retirements.listByOrg, { orgId: orgId as any });
  
  const [selectedRetirement, setSelectedRetirement] = useState<Retirement | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (retirement: Retirement) => {
    // Check if retirement is recent (within last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (retirement.retiredAtMs > sevenDaysAgo) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} t H2`;
    }
    return `${num} kg H2`;
  };

  const openDetailsModal = (retirement: Retirement) => {
    setSelectedRetirement(retirement);
    setShowDetailsModal(true);
  };

  const filteredRetirements = retirements?.filter(retirement => {
    if (filterStatus === "all") return true;
    if (filterStatus === "recent") {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return retirement.retiredAtMs > sevenDaysAgo;
    }
    return true;
  }) || [];

  if (!retirements) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading retirements...</span>
      </div>
    );
  }

  if (retirements.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No retirements found</h3>
        <p className="text-gray-500">Retired credits will appear here once they are processed.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Credit Retirements</h2>
            <p className="text-sm text-gray-500">
              {retirements.length} retirement{retirements.length !== 1 ? 's' : ''} • 
              Total Retired: {retirements.reduce((sum, r) => sum + parseFloat(r.amount), 0).toFixed(1)} kg H2
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
                <option value="all">All Retirements</option>
                <option value="recent">Recent (7 days)</option>
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
                Retirement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retired At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRetirements.map((retirement) => (
              <tr key={retirement._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 font-mono">
                      {retirement.claimRef}
                    </div>
                    <div className="text-xs text-gray-500">
                      Token: {retirement.tokenIdHex.slice(0, 10)}...
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {retirement.batch?.batchId || 'Unknown'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {retirement.batch?.amount ? formatAmount(retirement.batch.amount) : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {retirement.facility?.name || 'Unknown'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {retirement.facility?.facilityId || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatAmount(retirement.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {retirement.owner.slice(0, 6)}...{retirement.owner.slice(-4)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(retirement)}`}>
                    {retirement.retiredAtMs > Date.now() - 7 * 24 * 60 * 60 * 1000 ? 'Recent' : 'Processed'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(retirement.retiredAtMs)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openDetailsModal(retirement)}
                    className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Retirement Details Modal */}
      {showDetailsModal && selectedRetirement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4xl max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Retirement Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Retirement Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Claim Reference:</dt>
                      <dd className="font-mono">{selectedRetirement.claimRef}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Amount Retired:</dt>
                      <dd>{formatAmount(selectedRetirement.amount)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Retired At:</dt>
                      <dd>{formatDate(selectedRetirement.retiredAtMs)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Owner:</dt>
                      <dd className="font-mono">{selectedRetirement.owner}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Blockchain Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Token ID:</dt>
                      <dd className="font-mono">{selectedRetirement.tokenIdHex}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Transaction Hash:</dt>
                      <dd className="font-mono break-all">
                        {selectedRetirement.txHash.slice(0, 20)}...
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Batch ID:</dt>
                      <dd className="font-mono">
                        {selectedRetirement.batch?.batchId || 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {selectedRetirement.reason && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3">Retirement Reason</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedRetirement.reason}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
