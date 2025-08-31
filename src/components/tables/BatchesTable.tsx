"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface Batch {
  _id: string;
  batchId: string;
  producerOrg: string;
  facilityId: string;
  startTs: number;
  endTs: number;
  amount: string;
  meterHash: string;
  renewableProofHash: string;
  docBundleHash: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  approvedBy?: string;
  approvedAt?: number;
  rejectedBy?: string;
  rejectReason?: string;
  issuedBy?: string;
  issuedAt?: number;
  chain?: {
    chainId?: number;
    registry?: string;
    tokenIdHex?: string;
    issueTx?: string;
  };
}

interface Facility {
  _id: string;
  name: string;
  facilityId: string;
}

export default function BatchesTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const batches = useQuery(api.batches.listByProducerOrg, { producerOrg: orgId as any });
  const facilities = useQuery(api.facilities.listByOrg, { orgId: orgId as any });
  
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "PROPOSED":
        return "bg-blue-100 text-blue-800";
      case "NEEDS_FIX":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "ISSUED":
        return "bg-emerald-100 text-emerald-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "📝";
      case "PROPOSED":
        return "📤";
      case "NEEDS_FIX":
        return "⚠️";
      case "APPROVED":
        return "✅";
      case "ISSUED":
        return "🎯";
      case "REJECTED":
        return "❌";
      default:
        return "❓";
    }
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

  const formatDuration = (startTs: number, endTs: number) => {
    const duration = endTs - startTs;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} t H2`;
    }
    return `${num} kg H2`;
  };

  const getBlockchainStatus = (batch: Batch) => {
    if (batch.status === "ISSUED" && batch.chain?.registry) {
      return {
        status: "On-Chain",
        color: "text-green-600",
        icon: "🔗",
        details: `Token ID: ${batch.chain.tokenIdHex?.slice(0, 10)}...`
      };
    } else if (batch.status === "APPROVED") {
      return {
        status: "Ready for Issue",
        color: "text-blue-600",
        icon: "⏳",
        details: "Pending blockchain issuance"
      };
    } else {
      return {
        status: "Off-Chain",
        color: "text-gray-600",
        icon: "📄",
        details: "In review process"
      };
    }
  };

  const openDetailsModal = (batch: Batch) => {
    setSelectedBatch(batch);
    setShowDetailsModal(true);
  };

  if (!batches || !facilities) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading batches...</span>
      </div>
    );
  }

  if (batches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No batches found</h3>
        <p className="text-gray-500">Create your first credit batch to get started.</p>
      </div>
    );
  }

  // Create facility lookup map
  const facilityMap = new Map(facilities.map(f => [f._id, f]));

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Credit Batches</h2>
            <p className="text-sm text-gray-500">
              {batches.length} batch{batches.length !== 1 ? 'es' : ''} • 
              Total Credits: {batches.reduce((sum, b) => sum + parseFloat(b.amount), 0).toFixed(1)} kg H2
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Wallet:</span>
              <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              On-Chain: {batches.filter(b => b.chain?.registry).length}
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
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blockchain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {batches.map((batch) => {
              const facility = facilityMap.get(batch.facilityId);
              const blockchainStatus = getBlockchainStatus(batch);
              
              return (
                <tr key={batch._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        {batch.batchId}
                      </div>
                      <div className="text-xs text-gray-500">
                        Created {formatDate(batch.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {facility ? facility.name : 'Unknown Facility'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {facility ? facility.facilityId : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(batch.startTs)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Duration: {formatDuration(batch.startTs, batch.endTs)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatAmount(batch.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getStatusIcon(batch.status)}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    {batch.rejectReason && (
                      <div className="text-xs text-red-600 mt-1">
                        {batch.rejectReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{blockchainStatus.icon}</span>
                      <div>
                        <div className={`text-sm font-medium ${blockchainStatus.color}`}>
                          {blockchainStatus.status}
                        </div>
                        <div className="text-xs text-gray-500">
                          {blockchainStatus.details}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(batch.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetailsModal(batch)}
                        className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                      >
                        Details
                      </button>
                      {batch.status === "APPROVED" && batch.chain?.registry && (
                        <button
                          onClick={() => window.open(`/dashboard/orgs/${orgId}/batches/${batch._id}/issue`, '_blank')}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-xs"
                        >
                          Issue
                        </button>
                      )}
                      {batch.status === "ISSUED" && (
                        <button
                          onClick={() => window.open(`/dashboard/orgs/${orgId}/batches/${batch._id}/transfer`, '_blank')}
                          className="text-purple-600 hover:text-purple-900 px-2 py-1 rounded text-xs"
                        >
                          Transfer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Batch Details Modal */}
      {showDetailsModal && selectedBatch && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4xl max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Batch Details</h3>
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
                  <h4 className="font-medium text-gray-800 mb-3">Basic Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Batch ID:</dt>
                      <dd className="font-mono">{selectedBatch.batchId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBatch.status)}`}>
                          {selectedBatch.status}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Amount:</dt>
                      <dd>{formatAmount(selectedBatch.amount)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Period:</dt>
                      <dd>{formatDate(selectedBatch.startTs)} - {formatDate(selectedBatch.endTs)}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Blockchain Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Registry:</dt>
                      <dd className="font-mono">
                        {selectedBatch.chain?.registry ? 
                          `${selectedBatch.chain.registry.slice(0, 6)}...${selectedBatch.chain.registry.slice(-4)}` : 
                          'Not issued'
                        }
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Token ID:</dt>
                      <dd className="font-mono">
                        {selectedBatch.chain?.tokenIdHex ? 
                          `${selectedBatch.chain.tokenIdHex.slice(0, 10)}...` : 
                          'N/A'
                        }
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Issue TX:</dt>
                      <dd className="font-mono">
                        {selectedBatch.chain?.issueTx ? 
                          `${selectedBatch.chain.issueTx.slice(0, 10)}...` : 
                          'N/A'
                        }
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Document Hashes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Meter Data:</dt>
                    <dd className="font-mono">{selectedBatch.meterHash.slice(0, 20)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Renewable Proof:</dt>
                    <dd className="font-mono">{selectedBatch.renewableProofHash.slice(0, 20)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Document Bundle:</dt>
                    <dd className="font-mono">{selectedBatch.docBundleHash.slice(0, 20)}...</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
