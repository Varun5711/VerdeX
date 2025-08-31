"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface ApiKey {
  _id: string;
  keyId: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: number;
  lastUsed?: number;
  expiresAt?: number;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "REVOKED";
  usageCount: number;
  rateLimit?: {
    requests: number;
    period: string;
  };
  createdBy: string;
  ipRestrictions?: string[];
  userAgentRestrictions?: string[];
}

export default function ApiKeysTable({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const apiKeys = useQuery(api.apiKeys.listByOrg, { orgId: orgId as any });
  const deleteApiKey = useMutation(api.apiKeys.deleteApiKey);
  const revokeApiKey = useMutation(api.apiKeys.revokeApiKey);
  
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = async () => {
    if (!selectedApiKey || !user) return;
    
    setIsDeleting(true);
    try {
      await deleteApiKey({
        clerkUserId: user.id,
        keyId: selectedApiKey._id as any,
      });
      setShowDeleteModal(false);
      setSelectedApiKey(null);
    } catch (error) {
      console.error("Failed to delete API key:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRevoke = async () => {
    if (!selectedApiKey || !user) return;
    
    setIsRevoking(true);
    try {
      await revokeApiKey({
        clerkUserId: user.id,
        keyId: selectedApiKey._id as any,
      });
      setShowRevokeModal(false);
      setSelectedApiKey(null);
    } catch (error) {
      console.error("Failed to revoke API key:", error);
    } finally {
      setIsRevoking(false);
    }
  };

  const openDeleteModal = (apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setShowDeleteModal(true);
  };

  const openRevokeModal = (apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setShowRevokeModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "EXPIRED":
        return "bg-red-100 text-red-800";
      case "REVOKED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "🟢";
      case "INACTIVE":
        return "⚫";
      case "EXPIRED":
        return "⏰";
      case "REVOKED":
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

  const getExpiryStatus = (apiKey: ApiKey) => {
    if (!apiKey.expiresAt) {
      return { status: "No Expiry", color: "text-gray-600", bg: "bg-gray-100" };
    }
    
    const now = Date.now();
    if (apiKey.expiresAt < now) {
      return { status: "Expired", color: "text-red-600", bg: "bg-red-100" };
    }
    
    const daysUntilExpiry = Math.ceil((apiKey.expiresAt - now) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 7) {
      return { status: "Expiring Soon", color: "text-yellow-600", bg: "bg-yellow-100" };
    }
    
    return { status: "Valid", color: "text-green-600", bg: "bg-green-100" };
  };

  const filteredApiKeys = apiKeys?.filter(apiKey => {
    if (filterStatus === "all") return true;
    return apiKey.status === filterStatus;
  }) || [];

  if (!apiKeys) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading API keys...</span>
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys found</h3>
        <p className="text-gray-500">Create your first API key to start integrating with the VerdeX platform.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
            <p className="text-sm text-gray-500">
              {apiKeys.length} key{apiKeys.length !== 1 ? 's' : ''} • 
              Active: {apiKeys.filter(k => k.status === "ACTIVE").length}
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
                <option value="all">All Keys</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
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
                API Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
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
            {filteredApiKeys.map((apiKey) => {
              const expiryStatus = getExpiryStatus(apiKey);
              
              return (
                <tr key={apiKey._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{apiKey.keyId}</div>
                      {apiKey.description && (
                        <div className="text-xs text-gray-400 max-w-xs truncate">
                          {apiKey.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.slice(0, 3).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {permission}
                        </span>
                      ))}
                      {apiKey.permissions.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{apiKey.permissions.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getStatusIcon(apiKey.status)}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                        {apiKey.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${expiryStatus.bg} ${expiryStatus.color}`}>
                        {expiryStatus.status}
                      </span>
                    </div>
                    {apiKey.expiresAt && (
                      <div className="text-xs text-gray-500">
                        {formatDate(apiKey.expiresAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {apiKey.usageCount.toLocaleString()} requests
                    </div>
                    {apiKey.lastUsed && (
                      <div className="text-xs text-gray-500">
                        Last: {formatDate(apiKey.lastUsed)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(apiKey.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/dashboard/orgs/${orgId}/apikeys/${apiKey._id}`, '_blank')}
                        className="text-emerald-600 hover:text-emerald-900 px-2 py-1 rounded text-xs"
                      >
                        View
                      </button>
                      {apiKey.status === "ACTIVE" && (
                        <button
                          onClick={() => openRevokeModal(apiKey)}
                          className="text-yellow-600 hover:text-yellow-900 px-2 py-1 rounded text-xs"
                        >
                          Revoke
                        </button>
                      )}
                      <button
                        onClick={() => openDeleteModal(apiKey)}
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
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete API Key</h3>
              <div className="mt-2 px-7">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedApiKey?.name}</strong>? 
                  This action cannot be undone and will immediately revoke access.
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

      {/* Revoke Confirmation Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Revoke API Key</h3>
              <div className="mt-2 px-7">
                <p className="text-sm text-gray-500">
                  Are you sure you want to revoke <strong>{selectedApiKey?.name}</strong>? 
                  This will immediately disable the key but preserve it for audit purposes.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowRevokeModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRevoke}
                  disabled={isRevoking}
                  className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    isRevoking 
                      ? 'bg-yellow-400 cursor-not-allowed' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {isRevoking ? 'Revoking...' : 'Revoke'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
