"use client";

import { useState } from "react";
import { Award, Calendar, Download, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

interface Certificate {
  _id: string;
  batchId: string;
  amount: string;
  publicSlug: string;
  status?: string;
  createdAt: number;
  issuedAt?: number;
  issuedBy?: string;
}

interface CertificatesTableProps {
  certificates: Certificate[];
  onView?: (certificate: Certificate) => void;
  onDownload?: (certificate: Certificate) => void;
}

export default function CertificatesTable({ 
  certificates, 
  onView, 
  onDownload 
}: CertificatesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter certificates based on search term and status
  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.publicSlug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.batchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || certificate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status?: string) => {
    switch (status) {
      case "ISSUED":
        return {
          icon: CheckCircle,
          color: "text-green-400",
          bgColor: "bg-green-900/20",
          borderColor: "border-green-800"
        };
      case "PENDING":
        return {
          icon: Clock,
          color: "text-orange-400",
          bgColor: "bg-orange-900/20",
          borderColor: "border-orange-800"
        };
      case "REVOKED":
        return {
          icon: XCircle,
          color: "text-red-400",
          bgColor: "bg-red-900/20",
          borderColor: "border-red-800"
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-400",
          bgColor: "bg-gray-900/20",
          borderColor: "border-gray-800"
        };
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return `${num.toFixed(2)} kg H₂`;
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Table Header with Search and Filters */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">Certificates</h3>
            <p className="text-gray-400 text-sm">
              {filteredCertificates.length} of {certificates.length} certificates
            </p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Status</option>
              <option value="ISSUED">Issued</option>
              <option value="PENDING">Pending</option>
              <option value="REVOKED">Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Award size={14} />
                  Certificate
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Batch ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  Issued Date
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => {
                const statusConfig = getStatusConfig(certificate.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={certificate._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <Award size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {certificate.publicSlug}
                          </div>
                          <div className="text-sm text-gray-400">
                            ID: {certificate._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white font-mono">
                        {certificate.batchId.slice(0, 12)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {formatAmount(certificate.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.borderColor} border ${statusConfig.color}`}>
                        <StatusIcon size={12} />
                        {certificate.status || "PENDING"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {certificate.issuedAt ? formatDate(certificate.issuedAt) : "Pending"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(certificate)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                            title="View certificate"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        {onDownload && certificate.status === "ISSUED" && (
                          <button
                            onClick={() => onDownload(certificate)}
                            className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors"
                            title="Download certificate"
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Award className="text-gray-500" size={48} />
                    <div>
                      <p className="text-gray-400 font-medium">No certificates found</p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "Certificates will appear here once issued"}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}