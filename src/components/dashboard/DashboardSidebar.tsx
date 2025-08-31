"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, Factory, ShoppingCart, Shield, CheckCircle, AlertCircle, 
  TrendingUp, Zap, Leaf, FileText, Settings, Users, Activity,
  Award, BarChart3, PieChart, LineChart, MapPin, Calendar, Crown
} from "lucide-react";
import { useAppAuth } from "../../contexts/AuthContext";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  requiredRoles?: string[];
}

interface DashboardSidebarProps {
  currentRole: string;
  pathname: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onPathChange: (path: string) => void;
}

const USER_ROLES = {
  PRODUCER: 'producer',
  BUYER: 'buyer', 
  AUTHORITY: 'authority',
  CERTIFIER: 'certifier'
};

export default function DashboardSidebar({
  currentRole,
  pathname,
  sidebarOpen,
  onToggleSidebar,
  onPathChange
}: DashboardSidebarProps) {
  const [currentRoleState, setCurrentRoleState] = useState(currentRole);
  const { userRoles, setIsRoleUpgradeModalOpen } = useAppAuth();

  // Get available roles based on user's current roles
  const getAvailableRoles = () => {
    const roles = [];
    
    if (userRoles.includes("PRODUCER")) {
      roles.push({ value: USER_ROLES.PRODUCER, label: "Producer" });
    }
    if (userRoles.includes("BUYER")) {
      roles.push({ value: USER_ROLES.BUYER, label: "Buyer" });
    }
    if (userRoles.includes("AUTHORITY")) {
      roles.push({ value: USER_ROLES.AUTHORITY, label: "Authority" });
    }
    if (userRoles.includes("CERTIFIER")) {
      roles.push({ value: USER_ROLES.CERTIFIER, label: "Certifier" });
    }
    
    return roles;
  };

  // Role-based navigation configuration
  const getNavigationItems = (role: string): NavigationItem[] => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: Home, path: '/dashboard/overview' }
    ];

    switch (role) {
      case USER_ROLES.PRODUCER:
        return [
          ...baseItems,
          { id: 'production', label: 'Production', icon: Factory, path: '/dashboard/production', requiredRoles: ["PRODUCER"] },
          { id: 'inventory', label: 'Inventory', icon: Zap, path: '/dashboard/inventory', requiredRoles: ["PRODUCER"] },
          { id: 'certificates', label: 'Certificates', icon: Award, path: '/dashboard/certificates' },
          { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, path: '/dashboard/marketplace' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
          { id: 'compliance', label: 'Compliance', icon: CheckCircle, path: '/dashboard/compliance' }
        ];
      
      case USER_ROLES.BUYER:
        return [
          ...baseItems,
          { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, path: '/dashboard/marketplace' },
          { id: 'orders', label: 'My Orders', icon: FileText, path: '/dashboard/orders', requiredRoles: ["BUYER"] },
          { id: 'portfolio', label: 'Portfolio', icon: PieChart, path: '/dashboard/portfolio', requiredRoles: ["BUYER"] },
          { id: 'certificates', label: 'Certificates', icon: Award, path: '/dashboard/certificates' },
          { id: 'tracking', label: 'Tracking', icon: MapPin, path: '/dashboard/tracking', requiredRoles: ["BUYER"] }
        ];
      
      case USER_ROLES.AUTHORITY:
        return [
          ...baseItems,
          { id: 'monitoring', label: 'Monitoring', icon: Activity, path: '/dashboard/monitoring', requiredRoles: ["AUTHORITY"] },
          { id: 'compliance', label: 'Compliance', icon: Shield, path: '/dashboard/compliance', requiredRoles: ["AUTHORITY"] },
          { id: 'audits', label: 'Audits', icon: FileText, path: '/dashboard/audits', requiredRoles: ["AUTHORITY"] },
          { id: 'reports', label: 'Reports', icon: BarChart3, path: '/dashboard/reports', requiredRoles: ["AUTHORITY"] },
          { id: 'entities', label: 'Entities', icon: Users, path: '/dashboard/entities', requiredRoles: ["AUTHORITY"] },
          { id: 'regulations', label: 'Regulations', icon: CheckCircle, path: '/dashboard/regulations', requiredRoles: ["AUTHORITY"] }
        ];
      
      case USER_ROLES.CERTIFIER:
        return [
          ...baseItems,
          { id: 'pending', label: 'Pending Reviews', icon: AlertCircle, path: '/dashboard/pending', requiredRoles: ["CERTIFIER"] },
          { id: 'certificates', label: 'Certificates', icon: Award, path: '/dashboard/certificates', requiredRoles: ["CERTIFIER"] },
          { id: 'audits', label: 'Audit Trail', icon: FileText, path: '/dashboard/audits', requiredRoles: ["CERTIFIER"] },
          { id: 'standards', label: 'Standards', icon: CheckCircle, path: '/dashboard/standards', requiredRoles: ["CERTIFIER"] },
          { id: 'reports', label: 'Reports', icon: BarChart3, path: '/dashboard/reports', requiredRoles: ["CERTIFIER"] }
        ];
      
      default:
        return baseItems;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case USER_ROLES.PRODUCER: return 'text-green-400';
      case USER_ROLES.BUYER: return 'text-blue-400';
      case USER_ROLES.AUTHORITY: return 'text-red-400';
      case USER_ROLES.CERTIFIER: return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case USER_ROLES.PRODUCER: return 'bg-green-900/50 text-green-400 border-green-800';
      case USER_ROLES.BUYER: return 'bg-blue-900/50 text-blue-400 border-blue-800';
      case USER_ROLES.AUTHORITY: return 'bg-red-900/50 text-red-400 border-red-800';
      case USER_ROLES.CERTIFIER: return 'bg-purple-900/50 text-purple-400 border-purple-800';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800';
    }
  };

  const navigationItems = getNavigationItems(currentRoleState);
  const availableRoles = getAvailableRoles();

  // Filter navigation items based on user's actual roles
  const filteredNavigationItems = navigationItems.filter(item => {
    if (!item.requiredRoles) return true;
    return item.requiredRoles.some(role => userRoles.includes(role));
  });

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 shadow-lg flex flex-col`}>
      <div className="p-4 flex-1">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-sm">H₂</span>
          </div>
          {sidebarOpen && (
            <h2 className="font-bold text-xl text-white">Green-H2</h2>
          )}
        </div>
        
        {/* Role Selector */}
        {sidebarOpen && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 font-medium">CURRENT ROLE</p>
              {availableRoles.length > 2 && (
                <button
                  onClick={() => setIsRoleUpgradeModalOpen(true)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Upgrade Roles"
                >
                  <Crown size={12} className="text-yellow-400" />
                </button>
              )}
            </div>
            <select 
              value={currentRoleState} 
              onChange={(e) => setCurrentRoleState(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            >
              {availableRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            
            {/* Role upgrade hint */}
            {availableRoles.length <= 2 && (
              <p className="text-xs text-gray-500 mt-1">
                Contact admin to upgrade roles
              </p>
            )}
          </div>
        )}
        
        {/* Navigation */}
        <nav className="space-y-2">
          {filteredNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-green-900/50 text-green-400 border border-green-800 shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-medium truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700">
          <Link
            href="/dashboard/settings"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
