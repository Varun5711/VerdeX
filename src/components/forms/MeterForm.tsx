"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";

interface MeterFormData {
  meterId: string;
  facilityId: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  installationDate: string;
  lastCalibration: string;
  nextCalibration: string;
  status: "ACTIVE" | "MAINTENANCE" | "CALIBRATION" | "INACTIVE";
  location: string;
  accuracy: string;
  range: string;
  unit: string;
  description?: string;
}

interface Facility {
  _id: string;
  facilityId: string;
  name: string;
  location: {
    country: string;
    region?: string;
  };
}

const METER_TYPES = [
  "Flow Meter",
  "Temperature Sensor",
  "Pressure Sensor",
  "pH Meter",
  "Conductivity Meter",
  "Dissolved Oxygen Sensor",
  "Hydrogen Concentration Analyzer",
  "Power Meter",
  "Other"
];

const METER_STATUSES = [
  "ACTIVE",
  "MAINTENANCE", 
  "CALIBRATION",
  "INACTIVE"
];

const METER_UNITS = [
  "kg/h",
  "m³/h",
  "L/min",
  "°C",
  "bar",
  "psi",
  "pH",
  "μS/cm",
  "mg/L",
  "ppm",
  "kW",
  "kWh",
  "Other"
];

export default function MeterForm({ orgId, onSuccess }: { orgId: string; onSuccess?: () => void }) {
  const { user } = useUser();
  const { address } = useAccount();
  const createMeter = useMutation(api.meters.createMeter);
  const facilities = useQuery(api.facilities.listByOrg, { orgId: orgId as any });
  
  const [formData, setFormData] = useState<MeterFormData>({
    meterId: "",
    facilityId: "",
    name: "",
    type: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    installationDate: "",
    lastCalibration: "",
    nextCalibration: "",
    status: "ACTIVE",
    location: "",
    accuracy: "",
    range: "",
    unit: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate meter ID
  useEffect(() => {
    if (formData.facilityId && formData.type) {
      const facility = facilities?.find(f => f._id === formData.facilityId);
      if (facility) {
        const timestamp = Date.now();
        const meterId = `METER-${facility.facilityId}-${formData.type.replace(/\s+/g, '').toUpperCase()}-${timestamp.toString().slice(-6)}`;
        setFormData(prev => ({ ...prev, meterId }));
      }
    }
  }, [formData.facilityId, formData.type, facilities]);

  // Set default calibration dates
  useEffect(() => {
    if (formData.installationDate && !formData.lastCalibration) {
      setFormData(prev => ({ 
        ...prev, 
        lastCalibration: formData.installationDate 
      }));
    }
  }, [formData.installationDate]);

  // Calculate next calibration (typically 1 year from last)
  useEffect(() => {
    if (formData.lastCalibration && !formData.nextCalibration) {
      const lastCal = new Date(formData.lastCalibration);
      const nextCal = new Date(lastCal);
      nextCal.setFullYear(nextCal.getFullYear() + 1);
      setFormData(prev => ({ 
        ...prev, 
        nextCalibration: nextCal.toISOString().split('T')[0] 
      }));
    }
  }, [formData.lastCalibration]);

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
      // Validate dates
      const installationDate = new Date(formData.installationDate);
      const lastCalibration = new Date(formData.lastCalibration);
      const nextCalibration = new Date(formData.nextCalibration);
      
      if (lastCalibration < installationDate) {
        throw new Error("Last calibration cannot be before installation date");
      }

      if (nextCalibration <= lastCalibration) {
        throw new Error("Next calibration must be after last calibration");
      }

      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Meter name is required");
      }

      if (!formData.type) {
        throw new Error("Meter type is required");
      }

      if (!formData.manufacturer.trim()) {
        throw new Error("Manufacturer is required");
      }

      if (!formData.serialNumber.trim()) {
        throw new Error("Serial number is required");
      }

      // Create meter on Convex
      await createMeter({
        clerkUserId: user.id,
        orgId: orgId as any,
        facilityId: formData.facilityId as any,
        meterId: formData.meterId,
        name: formData.name,
        type: formData.type,
        manufacturer: formData.manufacturer,
        model: formData.model,
        serialNumber: formData.serialNumber,
        installationDate: installationDate.getTime(),
        lastCalibration: lastCalibration.getTime(),
        nextCalibration: nextCalibration.getTime(),
        status: formData.status,
        location: formData.location,
        accuracy: formData.accuracy,
        range: formData.range,
        unit: formData.unit,
        description: formData.description || undefined,
      });

      // Reset form
      setFormData({
        meterId: "",
        facilityId: "",
        name: "",
        type: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
        installationDate: "",
        lastCalibration: "",
        nextCalibration: "",
        status: "ACTIVE",
        location: "",
        accuracy: "",
        range: "",
        unit: "",
        description: "",
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create meter");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof MeterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!facilities) {
    return <div className="text-center py-8">Loading facilities...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Measurement Device</h2>
      
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
                Meter ID
              </label>
              <input
                type="text"
                value={formData.meterId}
                onChange={(e) => handleInputChange("meterId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                placeholder="Auto-generated"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Automatically generated based on facility and type
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Main Hydrogen Flow Meter"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Type</option>
                {METER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Manufacturer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Manufacturer Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturer *
              </label>
              <input
                type="text"
                required
                value={formData.manufacturer}
                onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Siemens, Endress+Hauser"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., SITRANS F M MAG 1100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serial Number *
            </label>
            <input
              type="text"
              required
              value={formData.serialNumber}
              onChange={(e) => handleInputChange("serialNumber", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              placeholder="e.g., SN123456789"
            />
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Main Pipeline, Unit A"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accuracy
              </label>
              <input
                type="text"
                value={formData.accuracy}
                onChange={(e) => handleInputChange("accuracy", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., ±0.5%"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Range
              </label>
              <input
                type="text"
                value={formData.range}
                onChange={(e) => handleInputChange("range", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 0-1000 kg/h"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit of Measurement
            </label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Unit</option>
              {METER_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Installation and Calibration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Installation & Calibration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Installation Date *
              </label>
              <input
                type="date"
                required
                value={formData.installationDate}
                onChange={(e) => handleInputChange("installationDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Calibration *
              </label>
              <input
                type="date"
                required
                value={formData.lastCalibration}
                onChange={(e) => handleInputChange("lastCalibration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Calibration *
              </label>
              <input
                type="date"
                required
                value={formData.nextCalibration}
                onChange={(e) => handleInputChange("nextCalibration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value as MeterFormData["status"])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {METER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Additional notes about the meter, special features, or maintenance requirements..."
          />
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
            {isSubmitting ? 'Creating...' : 'Create Meter'}
          </button>
        </div>
      </form>
    </div>
  );
}
