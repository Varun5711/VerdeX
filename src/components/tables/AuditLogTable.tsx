"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface AuditLog {
  _id: string;
  timestamp: number;
  userId: string;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: "AUTH" | "DATA" | "SYSTEM" | "COMPLIANCE" | "BLOCKCHAIN";
  status: "SUCCESS" | "FAILURE" | "PENDING";
  metadata?: Record<string, any>;
}

export default function AuditLogTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const auditLogs = useQuery(api.auditLog.listByOrg, { orgId: orgId as any });
  
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "🚨";
      case "HIGH":
        return "⚠️";
      case "MEDIUM":
        return "⚡";
      case "LOW":
        return "ℹ️";
      default:
        return "❓";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AUTH":
        return "bg-purple-100 text-purple-800";
      case "DATA":
        return "bg-blue-100 text-blue-800";
      case "SYSTEM":
        return "bg-gray-100 text-gray-800";
      case "COMPLIANCE":
        return "bg-emerald-100 text-emerald-800";
      case "BLOCKCHAIN":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "FAILURE":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const openDetailsModal = (log: AuditLog) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const filteredLogs = auditLogs?.filter(log => {
    if (filterCategory !== "all" && log.category !== filterCategory) return false;
    if (filterSeverity !== "all" && log.severity !== filterSeverity) return false;
    if (filterStatus !== "all" && log.status !== filterStatus) return false;
    return true;
  }) || [];

  if (!auditLogs) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading audit logs...</span>
      </div>
    );
  }

  if (auditLogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No audit logs found</h3>
        <p className="text-gray-500">System activity and compliance logs will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">System Audit Log</h2>
            <p className="text-sm text-gray-500">
              {auditLogs.length} log entries • 
              Critical: {auditLogs.filter(l => l.severity === "CRITICAL").length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filters:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Categories</option>
                <option value="AUTH">Authentication</option>
                <option value="DATA">Data Operations</option>
                <option value="SYSTEM">System</option>
                <option value="COMPLIANCE">Compliance</option>
                <option value="BLOCKCHAIN">Blockchain</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Statuses</option>
                <option value="SUCCESS">Success</option>
                <option value="FAILURE">Failure</option>
                <option value="PENDING">Pending</option>
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
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(log.timestamp)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {log.userEmail || log.userId.slice(0, 6) + "..."}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {log.userId.slice(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {log.action}
                  </div>
                  <div className="text-xs text-gray-500 max-w-xs truncate">
                    {log.details}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {log.resource}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {log.resourceId.slice(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                    {log.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getSeverityIcon(log.severity)}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openDetailsModal(log)}
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

      {/* Audit Log Details Modal */}
      {showDetailsModal && selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4xl max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Audit Log Details</h3>
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
                  <h4 className="font-medium text-gray-800 mb-3">Event Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Timestamp:</dt>
                      <dd>{formatDate(selectedLog.timestamp)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Action:</dt>
                      <dd className="font-medium">{selectedLog.action}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Resource:</dt>
                      <dd>{selectedLog.resource}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Resource ID:</dt>
                      <dd className="font-mono">{selectedLog.resourceId}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Classification</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedLog.category)}`}>
                          {selectedLog.category}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Severity:</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedLog.severity)}`}>
                          {selectedLog.severity}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLog.status)}`}>
                          {selectedLog.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Details</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {selectedLog.details}
                </p>
              </div>

              {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3">Additional Metadata</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <pre className="text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Technical Information</h4>
                <dl className="space-y-2 text-sm">
                  {selectedLog.ipAddress && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">IP Address:</dt>
                      <dd className="font-mono">{selectedLog.ipAddress}</dd>
                    </div>
                  )}
                  {selectedLog.userAgent && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">User Agent:</dt>
                      <dd className="text-xs font-mono break-all">{selectedLog.userAgent}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
