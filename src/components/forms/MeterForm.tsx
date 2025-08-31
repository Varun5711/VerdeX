"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Gauge, Upload, FileText, AlertCircle, Settings } from "lucide-react";

export default function MeterForm() {
  const { user } = useUser();
  const { orgId, facilityId } = useParams();
  const router = useRouter();
  const createMeter = useMutation(api.meters.createMeter);

  const [formData, setFormData] = useState({
    meterId: "",
    unit: "kWh",
    kind: "PRODUCTION",
    calibrationDoc: ""
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
      if (!formData.meterId || !formData.unit || !formData.kind) {
        throw new Error("Please fill in all required fields");
      }

      await createMeter({
        facilityId: facilityId as any,
        clerkUserId: user.id,
        meterId: formData.meterId,
        unit: formData.unit,
        kind: formData.kind as any,
        calibrationDoc: formData.calibrationDoc || undefined
      });

      router.push(`/dashboard/orgs/${orgId}/facilities/${facilityId}/meters`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create meter");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Gauge className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Add Meter</h2>
            <p className="text-gray-400 text-sm">Register a new meter for this facility</p>
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
            <h3 className="text-lg font-semibold text-white">Meter Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meter ID *
              </label>
              <input
                type="text"
                name="meterId"
                value={formData.meterId}
                onChange={handleInputChange}
                placeholder="e.g., METER-001"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              />
              <p className="text-gray-400 text-xs mt-1">Unique identifier for this meter</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meter Type *
              </label>
              <select
                name="kind"
                value={formData.kind}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              >
                <option value="PRODUCTION">Production Meter</option>
                <option value="ELECTRICITY">Electricity Meter</option>
                <option value="WATER">Water Meter</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Unit of Measurement *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                required
              >
                <option value="kWh">kWh (Kilowatt-hours)</option>
                <option value="kgH2">kg H₂ (Kilograms of Hydrogen)</option>
                <option value="m3">m³ (Cubic meters)</option>
                <option value="L">L (Liters)</option>
                <option value="kg">kg (Kilograms)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Calibration Document
              </label>
              <input
                type="text"
                name="calibrationDoc"
                value={formData.calibrationDoc}
                onChange={handleInputChange}
                placeholder="IPFS CID or document reference"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
              <p className="text-gray-400 text-xs mt-1">Optional: Reference to calibration certificate</p>
            </div>
          </div>

          {/* Meter Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Configuration</h3>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="text-blue-400" size={16} />
                <span className="text-sm font-medium text-white">Default Settings</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Reading Frequency:</span>
                  <span className="text-white ml-2">Hourly</span>
                </div>
                <div>
                  <span className="text-gray-400">Data Retention:</span>
                  <span className="text-white ml-2">7 years</span>
                </div>
                <div>
                  <span className="text-gray-400">Alert Threshold:</span>
                  <span className="text-white ml-2">±5% variance</span>
                </div>
                <div>
                  <span className="text-gray-400">Backup Required:</span>
                  <span className="text-white ml-2">Yes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Add Meter
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
