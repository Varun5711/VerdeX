"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface Certificate {
  _id: string;
  certificateId: string;
  batchId: string;
  facilityId: string;
  issuer: string;
  issuedAt: number;
  validFrom: number;
  validUntil: number;
  status: "ACTIVE" | "EXPIRED" | "REVOKED" | "PENDING";
  amount: string;
  standard: string;
  verificationMethod: string;
  blockchainTx?: string;
  batch?: {
    batchId: string;
    amount: string;
    startTs: number;
    endTs: number;
  };
  facility?: {
    name: string;
    facilityId: string;
    location: {
      country: string;
      region?: string;
    };
  };
}

export default function CertificatesTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const certificates = useQuery(api.certificates.listByOrg, { orgId: orgId as any });
  
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "EXPIRED":
        return "bg-red-100 text-red-800";
      case "REVOKED":
        return "bg-gray-100 text-gray-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "✅";
      case "EXPIRED":
        return "⏰";
      case "REVOKED":
        return "❌";
      case "PENDING":
        return "⏳";
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

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} t H2`;
    }
    return `${num} kg H2`;
  };

  const getValidityStatus = (certificate: Certificate) => {
    const now = Date.now();
    if (certificate.status === "REVOKED") {
      return { status: "Revoked", color: "text-red-600", bg: "bg-red-100" };
    }
    if (certificate.status === "PENDING") {
      return { status: "Pending", color: "text-yellow-600", bg: "bg-yellow-100" };
    }
    if (now < certificate.validFrom) {
      return { status: "Future", color: "text-blue-600", bg: "bg-blue-100" };
    }
    if (now > certificate.validUntil) {
      return { status: "Expired", color: "text-red-600", bg: "bg-red-100" };
    }
    const daysUntilExpiry = Math.ceil((certificate.validUntil - now) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 30) {
      return { status: "Expiring Soon", color: "text-yellow-600", bg: "bg-yellow-100" };
    }
    return { status: "Valid", color: "text-green-600", bg: "bg-green-100" };
  };

  const openDetailsModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailsModal(true);
  };

  const filteredCertificates = certificates?.filter(certificate => {
    if (filterStatus === "all") return true;
    return certificate.status === filterStatus;
  }) || [];

  if (!certificates) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading certificates...</span>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
        <p className="text-gray-500">Green hydrogen certificates will appear here once they are issued.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Green Hydrogen Certificates</h2>
            <p className="text-sm text-gray-500">
              {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} • 
              Active: {certificates.filter(c => c.status === "ACTIVE").length}
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
                <option value="all">All Certificates</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="EXPIRED">Expired</option>
                <option value="REVOKED">Revoked</option>
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
                Certificate
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issued
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCertificates.map((certificate) => {
              const validityStatus = getValidityStatus(certificate);
              
              return (
                <tr key={certificate._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        {certificate.certificateId}
                      </div>
                      <div className="text-xs text-gray-500">
                        Standard: {certificate.standard}
                      </div>
                      <div className="text-xs text-gray-400">
                        Issuer: {certificate.issuer.slice(0, 6)}...{certificate.issuer.slice(-4)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {certificate.batch?.batchId || 'Unknown'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {certificate.batch?.startTs && certificate.batch?.endTs ? 
                        `${formatDate(certificate.batch.startTs)} - ${formatDate(certificate.batch.endTs)}` : 
                        'N/A'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {certificate.facility?.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {certificate.facility?.location.country}
                      {certificate.facility?.location.region && `, ${certificate.facility.location.region}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatAmount(certificate.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getStatusIcon(certificate.status)}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                        {certificate.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${validityStatus.bg} ${validityStatus.color}`}>
                        {validityStatus.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(certificate.validFrom)} - {formatDate(certificate.validUntil)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(certificate.issuedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetailsModal(certificate)}
                        className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                      >
                        Details
                      </button>
                      {certificate.status === "ACTIVE" && (
                        <button
                          onClick={() => window.open(`/dashboard/orgs/${orgId}/certificates/${certificate._id}/verify`, '_blank')}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-xs"
                        >
                          Verify
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

      {/* Certificate Details Modal */}
      {showDetailsModal && selectedCertificate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4xl max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Certificate Details</h3>
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
                  <h4 className="font-medium text-gray-800 mb-3">Certificate Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Certificate ID:</dt>
                      <dd className="font-mono">{selectedCertificate.certificateId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Standard:</dt>
                      <dd>{selectedCertificate.standard}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCertificate.status)}`}>
                          {selectedCertificate.status}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Amount:</dt>
                      <dd>{formatAmount(selectedCertificate.amount)}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Validity & Issuance</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Valid From:</dt>
                      <dd>{formatDate(selectedCertificate.validFrom)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Valid Until:</dt>
                      <dd>{formatDate(selectedCertificate.validUntil)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Issued At:</dt>
                      <dd>{formatDate(selectedCertificate.issuedAt)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Verification:</dt>
                      <dd>{selectedCertificate.verificationMethod}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Blockchain Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transaction Hash:</dt>
                    <dd className="font-mono break-all">
                      {selectedCertificate.blockchainTx ? 
                        `${selectedCertificate.blockchainTx.slice(0, 20)}...` : 
                        'Not recorded on-chain'
                      }
                    </dd>
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
