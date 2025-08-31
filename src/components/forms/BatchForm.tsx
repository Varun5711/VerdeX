"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface BatchFormData {
  batchId: string;
  facilityId: string;
  startTs: string;
  endTs: string;
  amount: string;
  meterHash: string;
  renewableProofHash: string;
  docBundleHash: string;
  status: "DRAFT" | "PROPOSED";
}

interface Facility {
  _id: string;
  facilityId: string;
  name: string;
}

export default function BatchForm({ orgId, onSuccess }: { orgId: string; onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const proposeBatch = useMutation(api.batches.propose);
  const facilities = useQuery(api.facilities.listByOrg, { orgId: orgId as any });
  
  const [formData, setFormData] = useState<BatchFormData>({
    batchId: "",
    facilityId: "",
    startTs: "",
    endTs: "",
    amount: "",
    meterHash: "",
    renewableProofHash: "",
    docBundleHash: "",
    status: "PROPOSED",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedBatchId, setGeneratedBatchId] = useState<string>("");

  // Generate deterministic batch ID
  useEffect(() => {
    if (formData.facilityId && formData.startTs && formData.endTs) {
      const facility = facilities?.find(f => f._id === formData.facilityId);
      if (facility) {
        const timestamp = `${formData.startTs}_${formData.endTs}`;
        const hash = ethers.keccak256(ethers.toUtf8Bytes(`${facility.facilityId}_${timestamp}`));
        setGeneratedBatchId(hash.slice(2, 10)); // Use first 8 chars for readability
      }
    }
  }, [formData.facilityId, formData.startTs, formData.endTs, facilities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !address) {
      setError("Please connect your wallet and sign in");
      return;
    }

    if (!formData.facilityId) {
      setError("Please select a facility");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate time range
      const startDate = new Date(formData.startTs);
      const endDate = new Date(formData.endTs);
      
      if (startDate >= endDate) {
        throw new Error("End date must be after start date");
      }

      // Validate amount
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid amount");
      }

      // Validate hashes
      if (!formData.meterHash.startsWith("0x") || formData.meterHash.length !== 66) {
        throw new Error("Invalid meter hash format (should be 0x... 32 bytes)");
      }

      if (!formData.renewableProofHash.startsWith("0x") || formData.renewableProofHash.length !== 66) {
        throw new Error("Invalid renewable proof hash format");
      }

      if (!formData.docBundleHash.startsWith("0x") || formData.docBundleHash.length !== 66) {
        throw new Error("Invalid document bundle hash format");
      }

      // Use generated batch ID if available
      const finalBatchId = generatedBatchId || formData.batchId;

      // Create batch on Convex
      await proposeBatch({
        clerkUserId: user.id,
        producerOrg: orgId as any,
        facilityId: formData.facilityId as any,
        batchId: finalBatchId,
        startTs: startDate.getTime(),
        endTs: endDate.getTime(),
        amount: formData.amount,
        meterHash: formData.meterHash,
        renewableProofHash: formData.renewableProofHash,
        docBundleHash: formData.docBundleHash,
        status: formData.status,
      });

      // Reset form
      setFormData({
        batchId: "",
        facilityId: "",
        startTs: "",
        endTs: "",
        amount: "",
        meterHash: "",
        renewableProofHash: "",
        docBundleHash: "",
        status: "PROPOSED",
      });
      setGeneratedBatchId("");

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create batch");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BatchFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRandomHash = () => {
    const randomBytes = ethers.randomBytes(32);
    return ethers.hexlify(randomBytes);
  };

  const generateRandomHashes = () => {
    setFormData(prev => ({
      ...prev,
      meterHash: generateRandomHash(),
      renewableProofHash: generateRandomHash(),
      docBundleHash: generateRandomHash(),
    }));
  };

  if (!facilities) {
    return <div className="text-center py-8">Loading facilities...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Credit Batch</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Batch Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Batch Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facility *
              </label>
              <select
                required
                value={formData.facilityId}
                onChange={(e) => handleInputChange("facilityId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Facility</option>
                {facilities.map((facility) => (
                  <option key={facility._id} value={facility._id}>
                    {facility.name} ({facility.facilityId})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedBatchId || formData.batchId}
                  onChange={(e) => handleInputChange("batchId", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Auto-generated or custom"
                />
                {generatedBatchId && (
                  <span className="text-xs text-gray-500 self-center">
                    Auto-generated
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startTs}
                onChange={(e) => handleInputChange("startTs", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endTs}
                onChange={(e) => handleInputChange("endTs", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (kg H2) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 1000.50"
              />
            </div>
          </div>
        </div>

        {/* Hash Verification */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Document Hashes</h3>
            <button
              type="button"
              onClick={generateRandomHashes}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Generate Test Hashes
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Data Hash *
              </label>
              <input
                type="text"
                required
                value={formData.meterHash}
                onChange={(e) => handleInputChange("meterHash", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                placeholder="0x... (32 bytes)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Hash of meter readings CSV or data file
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renewable Proof Hash *
              </label>
              <input
                type="text"
                required
                value={formData.renewableProofHash}
                onChange={(e) => handleInputChange("renewableProofHash", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                placeholder="0x... (32 bytes)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Hash of renewable energy certificates or PPA documents
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Bundle Hash *
              </label>
              <input
                type="text"
                required
                value={formData.docBundleHash}
                onChange={(e) => handleInputChange("docBundleHash", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                placeholder="0x... (32 bytes)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Hash of complete document bundle (IPFS CID hash)
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value as "DRAFT" | "PROPOSED")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="PROPOSED">Proposed (Submit for Review)</option>
            <option value="DRAFT">Draft (Save for Later)</option>
          </select>
        </div>

        {/* Blockchain Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Blockchain Status:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {formData.status === "PROPOSED" 
              ? "Batch will be submitted for certification review"
              : "Draft will be saved locally for later submission"
            }
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
            {isSubmitting ? 'Creating...' : `Create ${formData.status === 'PROPOSED' ? 'and Submit' : 'Draft'}`}
          </button>
        </div>
      </form>
    </div>
  );
}
