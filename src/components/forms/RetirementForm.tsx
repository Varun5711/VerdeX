"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Leaf, Upload, FileText, AlertCircle, Calendar, Hash } from "lucide-react";

export default function RetirementForm() {
  const { user } = useUser();
  const { orgId } = useParams();
  const router = useRouter();
  const createRetirement = useMutation(api.retirements.createRetirement);

  const [formData, setFormData] = useState({
    batchId: "",
    tokenIdHex: "",
    amount: "",
    claimRef: "",
    retiredAtMs: "",
    txHash: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.batchId || !formData.amount || !formData.claimRef) {
        throw new Error("Please fill in all required fields");
      }

      // Convert amount to string and validate
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      // Convert timestamp
      const retiredAtMs = formData.retiredAtMs ? new Date(formData.retiredAtMs).getTime() : Date.now();

      await createRetirement({
        orgId: orgId as any,
        clerkUserId: user.id,
        batchId: formData.batchId,
        tokenIdHex: formData.tokenIdHex || "0x0000000000000000000000000000000000000000000000000000000000000000",
        amount: formData.amount,
        claimRef: formData.claimRef,
        retiredAtMs,
        txHash: formData.txHash || undefined
      });

      router.push(`/dashboard/orgs/${orgId}/retirements`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create retirement");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Retire Hydrogen Credits</h2>
            <p className="text-gray-400 text-sm">Permanently retire credits to claim carbon offset</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Retirement Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Retirement Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Batch ID *
              </label>
              <input
                type="text"
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                placeholder="Enter the batch ID to retire"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
              <p className="text-gray-400 text-xs mt-1">The batch containing the credits to retire</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Retire (kg) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
              <p className="text-gray-400 text-xs mt-1">Amount of hydrogen credits to permanently retire</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Claim Reference *
              </label>
              <input
                type="text"
                name="claimRef"
                value={formData.claimRef}
                onChange={handleInputChange}
                placeholder="e.g., CARBON-OFFSET-2024-001"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
              <p className="text-gray-400 text-xs mt-1">Unique reference for this carbon offset claim</p>
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Blockchain Information</h3>
            <p className="text-gray-400 text-sm">Optional: Provide blockchain transaction details</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Token ID (Hex)
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="tokenIdHex"
                  value={formData.tokenIdHex}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transaction Hash
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="txHash"
                  value={formData.txHash}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Retirement Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="datetime-local"
                  name="retiredAtMs"
                  value={formData.retiredAtMs}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              <p className="text-gray-400 text-xs mt-1">Leave empty to use current time</p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Environmental Impact</h3>
            
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="text-green-400" size={16} />
                <span className="text-sm font-medium text-green-400">Carbon Offset Calculation</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">CO₂ Equivalent:</span>
                  <span className="text-white ml-2">
                    {formData.amount ? `${(parseFloat(formData.amount) * 0.1).toFixed(2)} kg CO₂` : '0.00 kg CO₂'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Offset Method:</span>
                  <span className="text-white ml-2">Green Hydrogen Production</span>
                </div>
                <div>
                  <span className="text-gray-400">Verification:</span>
                  <span className="text-white ml-2">Blockchain Certified</span>
                </div>
                <div>
                  <span className="text-gray-400">Permanence:</span>
                  <span className="text-white ml-2">Permanent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Retiring...
                </>
              ) : (
                <>
                  <Leaf size={16} />
                  Retire Credits
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
