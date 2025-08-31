"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AuthContextType {
  // Authentication state
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User data
  user: any;
  userRoles: string[];
  
  // Wallet state
  isWalletConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  
  // Role management
  upgradeRoles: (password: string) => Promise<boolean>;
  isRoleUpgradeModalOpen: boolean;
  setIsRoleUpgradeModalOpen: (open: boolean) => void;
  
  // Data fetching
  facilities: any[];
  batches: any[];
  certificates: any[];
  retirements: any[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { getToken } = useClerkAuth();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  // State management
  const [isRoleUpgradeModalOpen, setIsRoleUpgradeModalOpen] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  
  // Convex mutations and queries - only call when authenticated
  const upsertUser = useMutation(api.users.upsertUserFromClerk);
  const updateGlobalRoles = useMutation(api.users.updateGlobalRoles);
  const getMe = useQuery(api.users.getMe);
  
  // Conditional queries - only fetch when user is authenticated
  const facilities = useQuery(api.facilities.listForUser, {});
  const batches = useQuery(api.batches.listForUser, {});
  const certificates = useQuery(api.certificates.listForUser, {});
  const retirements = useQuery(api.retirements.listForUser, {});

  // Initialize user on login
  useEffect(() => {
    if (user && isConnected && address) {
      try {
        upsertUser({
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress || undefined,
          displayName: user.fullName || undefined,
          pictureUrl: user.imageUrl || undefined,
          wallet: address
        });
      } catch (error) {
        console.error("Error upserting user:", error);
      }
    }
  }, [user, address, isConnected, upsertUser]);

  // Set default roles on first login
  useEffect(() => {
    if (getMe && getMe.roles.length === 0 && user?.id) {
      try {
        // Assign default roles: BUYER and PRODUCER
        const defaultRoles: ("PRODUCER" | "CERTIFIER" | "AUTHORITY" | "BUYER" | "AUDITOR" | "ADMIN")[] = ["BUYER", "PRODUCER"];
        updateGlobalRoles({
          clerkUserId: user.id,
          roles: defaultRoles
        });
        setUserRoles(defaultRoles);
      } catch (error) {
        console.error("Error setting default roles:", error);
      }
    } else if (getMe) {
      setUserRoles(getMe.roles);
    }
  }, [getMe, user?.id, updateGlobalRoles]);

  // Wallet connection handlers
  const connectWallet = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  // Role upgrade with password verification
  const upgradeRoles = async (password: string): Promise<boolean> => {
    try {
      // Get the admin password from environment variable
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      
      if (password === adminPassword && user?.id) {
        // Add AUTHORITY and CERTIFIER roles
        const upgradedRoles: ("PRODUCER" | "CERTIFIER" | "AUTHORITY" | "BUYER" | "AUDITOR" | "ADMIN")[] = [...userRoles, "AUTHORITY", "CERTIFIER"] as ("PRODUCER" | "CERTIFIER" | "AUTHORITY" | "BUYER" | "AUDITOR" | "ADMIN")[];
        await updateGlobalRoles({
          clerkUserId: user.id,
          roles: upgradedRoles
        });
        setUserRoles(upgradedRoles);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error upgrading roles:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    // Authentication state
    isAuthenticated: !!user && clerkLoaded,
    isLoading: !clerkLoaded,
    
    // User data
    user: getMe,
    userRoles,
    
    // Wallet state
    isWalletConnected: isConnected,
    walletAddress: address || null,
    connectWallet,
    disconnectWallet,
    
    // Role management
    upgradeRoles,
    isRoleUpgradeModalOpen,
    setIsRoleUpgradeModalOpen,
    
    // Data fetching
    facilities: facilities || [],
    batches: batches || [],
    certificates: certificates || [],
    retirements: retirements || [],
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppAuth must be used within an AuthProvider");
  }
  return context;
}
