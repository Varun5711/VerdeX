"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface CertificateFormData {
  certificateId: string;
  batchId: string;
  standard: string;
  validFrom: string;
  validUntil: string;
  verificationMethod: string;
  complianceNotes: string;
  blockchainTx?: string;
}

interface Batch {
  _id: string;
  batchId: string;
  amount: string;
  status: string;
  facilityId: string;
  startTs: number;
  endTs: number;
  facility?: {
    name: string;
    facilityId: string;
    location: {
      country: string;
      region?: string;
    };
  };
}

const CERTIFICATE_STANDARDS = [
  "ISO 14064-1:2018",
  "GHG Protocol",
  "PAS 2060:2014",
  "ISO 14067:2018",
  "Custom Standard"
];

const VERIFICATION_METHODS = [
  "Third-Party Audit",
  "Self-Assessment",
  "Peer Review",
  "Blockchain Verification",
  "Hybrid Approach"
];

export default function IssueCertificateForm({ orgId, onSuccess }: { orgId: string; onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const issueCertificate = useMutation(api.certificates.issueFromBatch);
  const batches = useQuery(api.batches.listByProducerOrg, { producerOrg: orgId as any });
  
  const [formData, setFormData] = useState<CertificateFormData>({
    certificateId: "",
    batchId: "",
    standard: "",
    validFrom: "",
    validUntil: "",
    verificationMethod: "",
    complianceNotes: "",
    blockchainTx: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  // Generate certificate ID
  useEffect(() => {
    if (formData.batchId && formData.standard) {
      const batch = batches?.find(b => b._id === formData.batchId);
      if (batch) {
        const timestamp = Date.now();
        const hash = ethers.keccak256(ethers.toUtf8Bytes(`${batch.batchId}_${formData.standard}_${timestamp}`));
        const certificateId = `CERT-${hash.slice(2, 10).toUpperCase()}`;
        setFormData(prev => ({ ...prev, certificateId }));
      }
    }
  }, [formData.batchId, formData.standard, batches]);

  // Update selected batch when batchId changes
  useEffect(() => {
    if (formData.batchId && batches) {
      const batch = batches.find(b => b._id === formData.batchId);
      setSelectedBatch(batch || null);
    }
  }, [formData.batchId, batches]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !address) {
      setError("Please connect your wallet and sign in");
      return;
    }

    if (!selectedBatch) {
      setError("Please select a valid batch");
      return;
    }

    if (selectedBatch.status !== "APPROVED") {
      setError("Selected batch must be approved before issuing certificate");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate dates
      const validFrom = new Date(formData.validFrom);
      const validUntil = new Date(formData.validUntil);
      
      if (validFrom >= validUntil) {
        throw new Error("Valid until date must be after valid from date");
      }

      if (validFrom < new Date(selectedBatch.startTs)) {
        throw new Error("Certificate validity cannot start before batch production period");
      }

      if (validUntil > new Date(selectedBatch.endTs + 365 * 24 * 60 * 60 * 1000)) {
        throw new Error("Certificate validity cannot extend more than 1 year beyond batch period");
      }

      // Issue certificate on Convex - fixed parameters to match the backend function
      await issueCertificate({
        clerkUserId: user.id,
        orgId: orgId as any,
        batchId: selectedBatch._id as any,
        amount: selectedBatch.amount,
        standard: formData.standard,
        validFromMs: validFrom.getTime(),
        validToMs: validUntil.getTime(),
        verificationMethod: formData.verificationMethod,
        complianceNotes: formData.complianceNotes,
        blockchainTxHash: formData.blockchainTx || undefined,
      });

      // Reset form
      setFormData({
        certificateId: "",
        batchId: "",
        standard: "",
        validFrom: "",
        validUntil: "",
        verificationMethod: "",
        complianceNotes: "",
        blockchainTx: "",
      });
      setSelectedBatch(null);

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to issue certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CertificateFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBlockchainTx = () => {
    const randomBytes = ethers.randomBytes(32);
    const txHash = ethers.hexlify(randomBytes);
    setFormData(prev => ({ ...prev, blockchainTx: txHash }));
  };

  // Filter batches that are approved and ready for certification
  const availableBatches = batches?.filter(batch => 
    batch.status === "APPROVED" && !batch.chain?.registry
  ) || [];

  if (!batches) {
    return <div className="text-center py-8">Loading batches...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Issue Green Hydrogen Certificate</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Batch Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Batch Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Batch *
            </label>
            <select
              required
              value={formData.batchId}
              onChange={(e) => handleInputChange("batchId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select an approved batch</option>
              {availableBatches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchId} - {batch.amount} kg H2 - {batch.facility?.name || 'Unknown Facility'}
                </option>
              ))}
            </select>
            {availableBatches.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No approved batches available for certification. Ensure batches are approved before issuing certificates.
              </p>
            )}
          </div>
        </div>

        {/* Batch Details */}
        {selectedBatch && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Batch Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Batch ID:</span>
                <span className="ml-2 font-mono">{selectedBatch.batchId}</span>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2">{selectedBatch.amount} kg H2</span>
              </div>
              <div>
                <span className="text-gray-600">Facility:</span>
                <span className="ml-2">{selectedBatch.facility?.name || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-2">
                  {selectedBatch.facility?.location.country}
                  {selectedBatch.facility?.location.region && `, ${selectedBatch.facility.location.region}`}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Production Period:</span>
                <span className="ml-2">
                  {new Date(selectedBatch.startTs).toLocaleDateString()} - {new Date(selectedBatch.endTs).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {selectedBatch.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Certificate Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                value={formData.certificateId}
                onChange={(e) => handleInputChange("certificateId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                placeholder="Auto-generated"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Automatically generated based on batch and standard
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Standard *
              </label>
              <select
                required
                value={formData.standard}
                onChange={(e) => handleInputChange("standard", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Standard</option>
                {CERTIFICATE_STANDARDS.map((standard) => (
                  <option key={standard} value={standard}>
                    {standard}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid From *
              </label>
              <input
                type="date"
                required
                value={formData.validFrom}
                onChange={(e) => handleInputChange("validFrom", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid Until *
              </label>
              <input
                type="date"
                required
                value={formData.validUntil}
                onChange={(e) => handleInputChange("validUntil", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Method *
            </label>
            <select
              required
              value={formData.verificationMethod}
              onChange={(e) => handleInputChange("verificationMethod", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Verification Method</option>
              {VERIFICATION_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compliance Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compliance Notes
          </label>
          <textarea
            value={formData.complianceNotes}
            onChange={(e) => handleInputChange("complianceNotes", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Additional notes about compliance, verification process, or special considerations..."
          />
        </div>

        {/* Blockchain Integration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Blockchain Integration</h3>
            <button
              type="button"
              onClick={generateBlockchainTx}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Generate Test TX
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blockchain Transaction Hash
            </label>
            <input
              type="text"
              value={formData.blockchainTx}
              onChange={(e) => handleInputChange("blockchainTx", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
              placeholder="0x... (optional - for on-chain certificates)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Include blockchain transaction hash if certificate is recorded on-chain
            </p>
          </div>
        </div>

        {/* Authority Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Authority Status:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div>• Certificate will be issued under your authority credentials</div>
            <div>• All actions will be logged in the audit trail</div>
            <div>• Certificate will be immediately valid upon issuance</div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !address || !selectedBatch}
            className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
              isSubmitting || !address || !selectedBatch
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500'
            }`}
          >
            {isSubmitting ? 'Issuing...' : 'Issue Certificate'}
          </button>
        </div>
      </form>
    </div>
  );
}
