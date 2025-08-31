"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";

// Import the contract ABI
import GreenHydrogen1155ABI from "../../../lib/abis/GreenHydrogen1155.json";

interface RetirementFormData {
  batchId: string;
  amount: string;
  claimRef: string;
  reason: string;
}

interface Batch {
  _id: string;
  batchId: string;
  amount: string;
  status: string;
  chain?: {
    tokenIdHex?: string;
    registry?: string;
  };
}

export default function RetirementForm({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const createRetirement = useMutation(api.retirements.create);
  
  // Get user's batches (assuming they have credits)
  const userBatches = useQuery(api.batches.listByOwner, { 
    ownerAddress: address || "" 
  });
  
  const [formData, setFormData] = useState<RetirementFormData>({
    batchId: "",
    amount: "",
    claimRef: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  // Contract interaction
  const { data: balance } = useContractRead({
    address: selectedBatch?.chain?.registry as `0x${string}`,
    abi: GreenHydrogen1155ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`, selectedBatch?.chain?.tokenIdHex as `0x${string}`],
    enabled: !!selectedBatch?.chain?.registry && !!selectedBatch?.chain?.tokenIdHex && !!address,
  });

  const { write: retireCredits, data: retireTx } = useContractWrite({
    address: selectedBatch?.chain?.registry as `0x${string}`,
    abi: GreenHydrogen1155ABI,
    functionName: 'retire',
  });

  const { isLoading: isRetiring, isSuccess: isRetired } = useWaitForTransaction({
    hash: retireTx?.hash,
  });

  // Update selected batch when batchId changes
  useEffect(() => {
    if (formData.batchId && userBatches) {
      const batch = userBatches.find(b => b._id === formData.batchId);
      setSelectedBatch(batch || null);
    }
  }, [formData.batchId, userBatches]);

  // Handle successful retirement
  useEffect(() => {
    if (isRetired && retireTx?.hash) {
      handleRetirementSuccess(retireTx.hash);
    }
  }, [isRetired, retireTx?.hash]);

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

    if (!selectedBatch.chain?.registry || !selectedBatch.chain?.tokenIdHex) {
      setError("Selected batch is not yet issued on-chain");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate amount
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid amount");
      }

      // Check if user has enough balance
      const userBalance = balance ? Number(balance) : 0;
      if (amount > userBalance) {
        throw new Error(`Insufficient balance. You have ${userBalance} credits`);
      }

      // Validate claim reference
      if (!formData.claimRef.trim()) {
        throw new Error("Claim reference is required");
      }

      // Call smart contract to retire credits
      retireCredits({
        args: [
          selectedBatch.chain.tokenIdHex as `0x${string}`,
          BigInt(Math.floor(amount)),
          formData.claimRef
        ],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to retire credits");
      setIsSubmitting(false);
    }
  };

  const handleRetirementSuccess = async (txHash: string) => {
    try {
      // Create retirement record on Convex
      await createRetirement({
        batchId: selectedBatch!._id as any,
        tokenIdHex: selectedBatch!.chain!.tokenIdHex!,
        owner: address!,
        amount: formData.amount,
        claimRef: formData.claimRef,
        retiredAtMs: Date.now(),
        txHash,
      });

      // Reset form
      setFormData({
        batchId: "",
        amount: "",
        claimRef: "",
        reason: "",
      });
      setSelectedBatch(null);

      onSuccess?.();
    } catch (err) {
      setError("Credits retired on-chain but failed to record in database");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof RetirementFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateClaimRef = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const claimRef = `RET-${timestamp}-${random}`.toUpperCase();
    setFormData(prev => ({ ...prev, claimRef }));
  };

  if (!userBatches) {
    return <div className="text-center py-8">Loading your batches...</div>;
  }

  // Filter batches that are issued on-chain
  const availableBatches = userBatches.filter(batch => 
    batch.status === "ISSUED" && batch.chain?.registry && batch.chain?.tokenIdHex
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Retire Green Hydrogen Credits</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Batch Selection */}
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
            <option value="">Select a batch to retire from</option>
            {availableBatches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.batchId} - {batch.amount} kg H2
              </option>
            ))}
          </select>
          {availableBatches.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              No batches available for retirement. Ensure you have issued credits on-chain.
            </p>
          )}
        </div>

        {/* Batch Details */}
        {selectedBatch && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Batch Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Batch ID:</span>
                <span className="ml-2 font-mono">{selectedBatch.batchId}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <span className="ml-2">{selectedBatch.amount} kg H2</span>
              </div>
              <div>
                <span className="text-gray-600">Your Balance:</span>
                <span className="ml-2">
                  {balance ? `${Number(balance)} credits` : 'Loading...'}
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

        {/* Retirement Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Retirement Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Retire (kg H2) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                max={balance ? Number(balance) : undefined}
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 100.50"
              />
              {balance && (
                <p className="text-xs text-gray-500 mt-1">
                  Available: {Number(balance)} credits
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Reference *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.claimRef}
                  onChange={(e) => handleInputChange("claimRef", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., RET-2024-001"
                />
                <button
                  type="button"
                  onClick={generateClaimRef}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Reason
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe why you're retiring these credits (e.g., carbon offset, compliance requirement)"
            />
          </div>
        </div>

        {/* Blockchain Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Blockchain Status:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div>• Credits will be permanently burned on the Ethereum blockchain</div>
            <div>• Retirement transaction will be recorded with your claim reference</div>
            <div>• You'll receive a retirement certificate for compliance purposes</div>
          </div>
        </div>

        {/* Transaction Status */}
        {isRetiring && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Processing retirement transaction...</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !address || !selectedBatch || isRetiring}
            className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
              isSubmitting || !address || !selectedBatch || isRetiring
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500'
            }`}
          >
            {isSubmitting || isRetiring ? 'Processing...' : 'Retire Credits'}
          </button>
        </div>
      </form>
    </div>
  );
}
