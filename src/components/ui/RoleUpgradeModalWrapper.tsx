"use client";

import { useAppAuth } from "../../contexts/AuthContext";
import RoleUpgradeModal from "./RoleUpgradeModal";

export default function RoleUpgradeModalWrapper() {
  const { 
    isRoleUpgradeModalOpen, 
    setIsRoleUpgradeModalOpen, 
    upgradeRoles, 
    userRoles 
  } = useAppAuth();

  return (
    <RoleUpgradeModal
      isOpen={isRoleUpgradeModalOpen}
      onClose={() => setIsRoleUpgradeModalOpen(false)}
      onUpgrade={upgradeRoles}
      currentRoles={userRoles}
    />
  );
}
