"use client";

import { useState } from "react";
import { Shield, Lock, AlertCircle, CheckCircle, X } from "lucide-react";

interface RoleUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (password: string) => Promise<boolean>;
  currentRoles: string[];
}

export default function RoleUpgradeModal({
  isOpen,
  onClose,
  onUpgrade,
  currentRoles
}: RoleUpgradeModalProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await onUpgrade(password);
      if (result) {
        setSuccess(true);
        setPassword("");
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upgrade Roles</h2>
              <p className="text-sm text-gray-400">Access advanced features</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Current Roles */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Current Roles</h3>
          <div className="flex flex-wrap gap-2">
            {currentRoles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 bg-green-900/20 border border-green-800 text-green-400 rounded-full text-xs font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* New Roles Preview */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">New Roles (After Upgrade)</h3>
          <div className="flex flex-wrap gap-2">
            {currentRoles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 bg-green-900/20 border border-green-800 text-green-400 rounded-full text-xs font-medium"
              >
                {role}
              </span>
            ))}
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-800 text-purple-400 rounded-full text-xs font-medium">
              AUTHORITY
            </span>
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-800 text-purple-400 rounded-full text-xs font-medium">
              CERTIFIER
            </span>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <div>
              <p className="text-green-400 font-medium">Roles upgraded successfully!</p>
              <p className="text-green-400/80 text-sm">You now have access to Authority and Certifier features.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Contact your administrator for the password
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Upgrading...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Upgrade Roles
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="text-gray-400 mt-0.5" size={16} />
            <div>
              <p className="text-sm font-medium text-gray-300">Security Notice</p>
              <p className="text-xs text-gray-400 mt-1">
                Role upgrades require administrator approval. This action is logged for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
