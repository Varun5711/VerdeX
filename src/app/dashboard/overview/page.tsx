"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

interface GlobalStats {
  facilities: number;
  batches: number;
  retirements: number;
  totalCredits: number;
  onChainCredits: number;
  totalRetired: number;
}

interface RecentActivity {
  _id: string;
  action: string;
  targetTable: string;
  targetId: string;
  at: number;
  meta: string;
}

export default function OverviewPage() {
  const { user } = useUser();
  const { address } = useAccount();
  const stats = useQuery(api.overview.getGlobalStats, {});
  const recentActivity = useQuery(api.overview.getRecentActivity, {});
  
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!stats || !recentActivity) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCredits = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} t H2`;
    }
    return `${amount} kg H2`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Real-time insights into your green hydrogen credit operations</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Current Time</div>
          <div className="text-lg font-mono text-gray-900">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Wallet Status */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${address ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-700">Blockchain Connection</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Wallet Address</div>
            <div className={`font-mono text-sm ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Facilities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Production Facilities</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.facilities)}</p>
            </div>
          </div>
        </div>

        {/* Batches */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Credit Batches</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.batches)}</p>
            </div>
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Credits</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCredits(stats.totalCredits)}</p>
            </div>
          </div>
        </div>

        {/* Retirements */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Retired Credits</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCredits(stats.totalRetired)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Chain Credits */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Blockchain Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">On-Chain Credits</span>
              <span className="text-lg font-semibold text-emerald-600">
                {formatCredits(stats.onChainCredits)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Off-Chain Credits</span>
              <span className="text-lg font-semibold text-gray-600">
                {formatCredits(stats.totalCredits - stats.onChainCredits)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stats.onChainCredits / Math.max(stats.totalCredits, 1)) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {((stats.onChainCredits / Math.max(stats.totalCredits, 1)) * 100).toFixed(1)}% on-chain
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-green-600">✅ Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Blockchain</span>
              <span className={address ? "text-green-600" : "text-red-600"}>
                {address ? "✅ Connected" : "❌ Disconnected"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Authentication</span>
              <span className="text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Real-time Sync</span>
              <span className="text-green-600">✅ Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.slice(0, 10).map((activity) => (
                <div key={activity._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span> on {activity.targetTable}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.at).toLocaleString()}
                    </p>
                    {activity.meta && (
                      <p className="text-xs text-gray-600 mt-1 font-mono">
                        {activity.meta}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">🏭</div>
                <div className="text-sm font-medium text-gray-900">Add Facility</div>
                <div className="text-xs text-gray-500">Create new production site</div>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-sm font-medium text-gray-900">Create Batch</div>
                <div className="text-xs text-gray-500">Propose new credit batch</div>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-900">View Reports</div>
                <div className="text-xs text-gray-500">Analytics & insights</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}