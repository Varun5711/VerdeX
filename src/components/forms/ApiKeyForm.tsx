"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface ApiKeyFormData {
  name: string;
  description: string;
  permissions: string[];
  rateLimit: {
    requests: number;
    period: string;
  };
  expiresAt?: string;
  ipRestrictions: string[];
  userAgentRestrictions: string[];
}

const API_PERMISSIONS = [
  "facilities:read",
  "facilities:write",
  "batches:read",
  "batches:write",
  "meters:read",
  "meters:write",
  "certificates:read",
  "certificates:write",
  "retirements:read",
  "retirements:write",
  "docs:read",
  "docs:write",
  "audit:read",
  "users:read",
  "users:write"
];

const RATE_LIMIT_PERIODS = [
  { value: "1m", label: "Per Minute" },
  { value: "1h", label: "Per Hour" },
  { value: "1d", label: "Per Day" },
  { value: "1w", label: "Per Week" }
];

const DEFAULT_RATE_LIMITS = {
  "1m": 100,
  "1h": 1000,
  "1d": 10000,
  "1w": 50000
};

export default function ApiKeyForm({ orgId, onSuccess }: { orgId: string; onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const createApiKey = useMutation(api.apiKeys.create);
  
  const [formData, setFormData] = useState<ApiKeyFormData>({
    name: "",
    description: "",
    permissions: [],
    rateLimit: {
      requests: 100,
      period: "1h"
    },
    expiresAt: "",
    ipRestrictions: [],
    userAgentRestrictions: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ipInput, setIpInput] = useState("");
  const [userAgentInput, setUserAgentInput] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Update rate limit when period changes
  useEffect(() => {
    const defaultLimit = DEFAULT_RATE_LIMITS[formData.rateLimit.period as keyof typeof DEFAULT_RATE_LIMITS];
    if (defaultLimit && formData.rateLimit.requests === 100) {
      setFormData(prev => ({
        ...prev,
        rateLimit: { ...prev.rateLimit, requests: defaultLimit }
      }));
    }
  }, [formData.rateLimit.period]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !address) {
      setError("Please connect your wallet and sign in");
      return;
    }

    if (!formData.name.trim()) {
      setError("API key name is required");
      return;
    }

    if (formData.permissions.length === 0) {
      setError("Please select at least one permission");
      return;
    }

    if (formData.rateLimit.requests <= 0) {
      setError("Rate limit must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create API key on Convex
      await createApiKey({
        clerkUserId: user.id,
        orgId: orgId as any,
        name: formData.name,
        description: formData.description || undefined,
        permissions: formData.permissions,
        rateLimit: formData.rateLimit,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).getTime() : undefined,
        ipRestrictions: formData.ipRestrictions.length > 0 ? formData.ipRestrictions : undefined,
        userAgentRestrictions: formData.userAgentRestrictions.length > 0 ? formData.userAgentRestrictions : undefined,
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        permissions: [],
        rateLimit: {
          requests: 100,
          period: "1h"
        },
        expiresAt: "",
        ipRestrictions: [],
        userAgentRestrictions: []
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create API key");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ApiKeyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const addIpRestriction = () => {
    if (ipInput.trim() && !formData.ipRestrictions.includes(ipInput.trim())) {
      setFormData(prev => ({
        ...prev,
        ipRestrictions: [...prev.ipRestrictions, ipInput.trim()]
      }));
      setIpInput("");
    }
  };

  const removeIpRestriction = (ip: string) => {
    setFormData(prev => ({
      ...prev,
      ipRestrictions: prev.ipRestrictions.filter(ipAddr => ipAddr !== ip)
    }));
  };

  const addUserAgentRestriction = () => {
    if (userAgentInput.trim() && !formData.userAgentRestrictions.includes(userAgentInput.trim())) {
      setFormData(prev => ({
        ...prev,
        userAgentRestrictions: [...prev.userAgentRestrictions, userAgentInput.trim()]
      }));
      setUserAgentInput("");
    }
  };

  const removeUserAgentRestriction = (userAgent: string) => {
    setFormData(prev => ({
      ...prev,
      userAgentRestrictions: prev.userAgentRestrictions.filter(ua => ua !== userAgent)
    }));
  };

  const selectAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissions: [...API_PERMISSIONS]
    }));
  };

  const clearAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissions: []
    }));
  };

  const getPermissionGroup = (permission: string) => {
    if (permission.includes('facilities')) return 'Facilities';
    if (permission.includes('batches')) return 'Batches';
    if (permission.includes('meters')) return 'Meters';
    if (permission.includes('certificates')) return 'Certificates';
    if (permission.includes('retirements')) return 'Retirements';
    if (permission.includes('docs')) return 'Documents';
    if (permission.includes('audit')) return 'Audit';
    if (permission.includes('users')) return 'Users';
    return 'Other';
  };

  const groupedPermissions = API_PERMISSIONS.reduce((groups, permission) => {
    const group = getPermissionGroup(permission);
    if (!groups[group]) groups[group] = [];
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, string[]>);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create API Key</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Production API Key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expires At
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => handleInputChange("expiresAt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for no expiration
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe the purpose and usage of this API key..."
            />
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Permissions</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllPermissions}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAllPermissions}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedPermissions).map(([group, permissions]) => (
              <div key={group} className="space-y-3">
                <h4 className="font-medium text-gray-700">{group}</h4>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {permission.split(':')[1]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Rate Limiting</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requests
              </label>
              <input
                type="number"
                min="1"
                value={formData.rateLimit.requests}
                onChange={(e) => handleInputChange("rateLimit", { 
                  ...formData.rateLimit, 
                  requests: parseInt(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <select
                value={formData.rateLimit.period}
                onChange={(e) => handleInputChange("rateLimit", { 
                  ...formData.rateLimit, 
                  period: e.target.value 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {RATE_LIMIT_PERIODS.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            This key will be limited to {formData.rateLimit.requests} requests per {RATE_LIMIT_PERIODS.find(p => p.value === formData.rateLimit.period)?.label.toLowerCase()}
          </p>
        </div>

        {/* Advanced Security */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Advanced Security</h3>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </button>
          </div>
          
          {showAdvanced && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              {/* IP Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Address Restrictions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="e.g., 192.168.1.1 or 192.168.1.0/24"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={addIpRestriction}
                    className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
                {formData.ipRestrictions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.ipRestrictions.map((ip, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {ip}
                        <button
                          type="button"
                          onClick={() => removeIpRestriction(ip)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to allow all IP addresses
                </p>
              </div>

              {/* User Agent Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Agent Restrictions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={userAgentInput}
                    onChange={(e) => setUserAgentInput(e.target.value)}
                    placeholder="e.g., MyApp/1.0"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={addUserAgentRestriction}
                    className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
                {formData.userAgentRestrictions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.userAgentRestrictions.map((userAgent, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {userAgent}
                        <button
                          type="button"
                          onClick={() => removeUserAgentRestriction(userAgent)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to allow all user agents
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>• API keys provide access to your organization's data</p>
                <p>• Store keys securely and never commit them to version control</p>
                <p>• Monitor usage and revoke keys that are no longer needed</p>
                <p>• Consider using IP restrictions for additional security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Connection Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Wallet Status:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !address}
            className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
              isSubmitting || !address
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create API Key'}
          </button>
        </div>
      </form>
    </div>
  );
}
