"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Upload, FileText, AlertCircle } from "lucide-react";

export default function BatchForm() {
  const { user } = useUser();
  const { orgId } = useParams();
  const router = useRouter();
  const createBatch = useMutation(api.batches.createBatch);

  const [formData, setFormData] = useState({
    batchHumanId: "",
    facilityId: "",
    startTs: "",
    endTs: "",
    amount: "",
    meterHash: "",
    renewableProofHash: "",
    docBundleHash: ""
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
      if (!formData.batchHumanId || !formData.facilityId || !formData.amount) {
        throw new Error("Please fill in all required fields");
      }

      // Convert timestamps to numbers
      const startTs = new Date(formData.startTs).getTime();
      const endTs = new Date(formData.endTs).getTime();

      if (startTs >= endTs) {
        throw new Error("End time must be after start time");
      }

      await createBatch({
        orgId: orgId as any,
        clerkUserId: user.id,
        batchHumanId: formData.batchHumanId,
        facilityId: formData.facilityId,
        startTs,
        endTs,
        amount: formData.amount,
        meterHash: formData.meterHash || "0x0000000000000000000000000000000000000000000000000000000000000000",
        renewableProofHash: formData.renewableProofHash || "0x0000000000000000000000000000000000000000000000000000000000000000",
        docBundleHash: formData.docBundleHash || "0x0000000000000000000000000000000000000000000000000000000000000000"
      });

      router.push(`/dashboard/orgs/${orgId}/batches`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create batch");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create Production Batch</h2>
            <p className="text-gray-400 text-sm">Add a new hydrogen production batch</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Batch ID *
              </label>
              <input
                type="text"
                name="batchHumanId"
                value={formData.batchHumanId}
                onChange={handleInputChange}
                placeholder="e.g., H2-2024-001"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facility ID *
              </label>
              <input
                type="text"
                name="facilityId"
                value={formData.facilityId}
                onChange={handleInputChange}
                placeholder="Enter facility ID"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Production Amount (kg) *
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
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Production Period</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="datetime-local"
                    name="startTs"
                    value={formData.startTs}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="datetime-local"
                    name="endTs"
                    value={formData.endTs}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hash Values */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Verification Hashes</h3>
            <p className="text-gray-400 text-sm">Optional: Provide blockchain hashes for verification</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meter Reading Hash
              </label>
              <input
                type="text"
                name="meterHash"
                value={formData.meterHash}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Renewable Proof Hash
              </label>
              <input
                type="text"
                name="renewableProofHash"
                value={formData.renewableProofHash}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Document Bundle Hash
              </label>
              <input
                type="text"
                name="docBundleHash"
                value={formData.docBundleHash}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-sm"
              />
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
                  Creating...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Create Batch
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
