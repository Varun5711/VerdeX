"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface FacilityFormData {
  facilityId: string;
  name: string;
  country: string;
  region: string;
  lat: number | null;
  lon: number | null;
  gridZone: string;
  electrolyzerType: string;
  capacityMW: string;
  renewableSource: string;
}

export default function FacilityForm({ orgId, onSuccess }: { orgId: string; onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const createFacility = useMutation(api.facilities.createFacility);
  
  const [formData, setFormData] = useState<FacilityFormData>({
    facilityId: "",
    name: "",
    country: "",
    region: "",
    lat: null,
    lon: null,
    gridZone: "",
    electrolyzerType: "",
    capacityMW: "",
    renewableSource: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !address) {
      setError("Please connect your wallet and sign in");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate capacity
      const capacity = parseFloat(formData.capacityMW);
      if (isNaN(capacity) || capacity <= 0) {
        throw new Error("Invalid capacity");
      }

      // Create facility on Convex
      await createFacility({
        clerkUserId: user.id,
        orgId: orgId as any,
        facilityId: formData.facilityId,
        name: formData.name,
        location: {
          country: formData.country,
          region: formData.region || undefined,
          lat: formData.lat || undefined,
          lon: formData.lon || undefined,
          gridZone: formData.gridZone || undefined,
        },
        tech: {
          electrolyzerType: formData.electrolyzerType || undefined,
          capacityMW: formData.capacityMW,
          renewableSource: formData.renewableSource || undefined,
        },
      });

      // Reset form
      setFormData({
        facilityId: "",
        name: "",
        country: "",
        region: "",
        lat: null,
        lon: null,
        gridZone: "",
        electrolyzerType: "",
        capacityMW: "",
        renewableSource: "",
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create facility");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FacilityFormData, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Facility</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility ID *
            </label>
            <input
              type="text"
              required
              value={formData.facilityId}
              onChange={(e) => handleInputChange("facilityId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., FAC001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Solar Hydrogen Plant Alpha"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., United States"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region/State
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => handleInputChange("region", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., California"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grid Zone
              </label>
              <input
                type="text"
                value={formData.gridZone}
                onChange={(e) => handleInputChange("gridZone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., CAISO"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.lat || ""}
                onChange={(e) => handleInputChange("lat", e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 37.7749"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.lon || ""}
                onChange={(e) => handleInputChange("lon", e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., -122.4194"
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Electrolyzer Type
              </label>
              <select
                value={formData.electrolyzerType}
                onChange={(e) => handleInputChange("electrolyzerType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Type</option>
                <option value="PEM">PEM (Proton Exchange Membrane)</option>
                <option value="ALKALINE">Alkaline</option>
                <option value="SOEC">SOEC (Solid Oxide)</option>
                <option value="AEM">AEM (Anion Exchange Membrane)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity (MW) *
              </label>
              <input
                type="number"
                required
                step="0.1"
                min="0"
                value={formData.capacityMW}
                onChange={(e) => handleInputChange("capacityMW", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 10.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renewable Source
              </label>
              <input
                type="text"
                value={formData.renewableSource}
                onChange={(e) => handleInputChange("renewableSource", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Solar PPA, Wind Farm"
              />
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
            {isSubmitting ? 'Creating...' : 'Create Facility'}
          </button>
        </div>
      </form>
    </div>
  );
}
