"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppAuth } from "../../contexts/AuthContext";

// Import our enhanced dashboard components
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardBreadcrumb from "../../components/dashboard/DashboardBreadcrumb";

// Mock user roles - in real app this would come from your auth system
const USER_ROLES = {
  PRODUCER: 'producer',
  BUYER: 'buyer', 
  AUTHORITY: 'authority',
  CERTIFIER: 'certifier'
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState(USER_ROLES.PRODUCER);
  const [notifications, setNotifications] = useState(3);
  
  // Get real data from auth context
  const { 
    user, 
    userRoles, 
    isWalletConnected, 
    walletAddress
  } = useAppAuth();
  
  useEffect(() => setMounted(true), []);

  // Set default role based on user's available roles
  useEffect(() => {
    if (userRoles.length > 0) {
      // Set the first available role as default
      const firstRole = userRoles[0].toLowerCase();
      if (firstRole === 'producer') setCurrentRole(USER_ROLES.PRODUCER);
      else if (firstRole === 'buyer') setCurrentRole(USER_ROLES.BUYER);
      else if (firstRole === 'authority') setCurrentRole(USER_ROLES.AUTHORITY);
      else if (firstRole === 'certifier') setCurrentRole(USER_ROLES.CERTIFIER);
    }
  }, [userRoles]);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar
        currentRole={currentRole}
        pathname={pathname}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onPathChange={(newPath) => {
          // This will be handled by Next.js navigation
          window.location.href = newPath;
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentRole={currentRole}
          notifications={notifications}
          mockUser={{
            primaryEmailAddress: { emailAddress: user?.clerkPrimaryEmail || "user@example.com" },
            name: user?.displayName || "User",
            company: "Green Hydrogen Platform"
          }}
          mockAddress={walletAddress || ""}
          mounted={mounted}
        />

        {/* Breadcrumb/Page Info */}
        <DashboardBreadcrumb pathname={pathname} currentRole={currentRole} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}