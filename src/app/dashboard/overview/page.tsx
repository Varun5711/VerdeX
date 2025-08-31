"use client";

import { Factory, Activity, Award, Leaf } from "lucide-react";
import { useAppAuth } from "../../../contexts/AuthContext";
import StatsCard from "../../../components/dashboard/StatsCard";
import QuickActionsPanel from "../../../components/dashboard/QuickActionsPanel";
import RecentActivityPanel from "../../../components/dashboard/RecentActivityPanel";

// Mock user roles - in real app this would come from your auth system
const USER_ROLES = {
  PRODUCER: 'producer',
  BUYER: 'buyer', 
  AUTHORITY: 'authority',
  CERTIFIER: 'certifier'
};

export default function DashboardOverview() {
  // Get real data from auth context
  const { 
    userRoles,
    facilities,
    batches,
    certificates,
    retirements
  } = useAppAuth();

  // Determine current role based on user's available roles
  const getCurrentRole = () => {
    if (userRoles.length > 0) {
      const firstRole = userRoles[0].toLowerCase();
      if (firstRole === 'producer') return USER_ROLES.PRODUCER;
      else if (firstRole === 'buyer') return USER_ROLES.BUYER;
      else if (firstRole === 'authority') return USER_ROLES.AUTHORITY;
      else if (firstRole === 'certifier') return USER_ROLES.CERTIFIER;
    }
    return USER_ROLES.PRODUCER; // default
  };

  const currentRole = getCurrentRole();

  const getDashboardContent = () => {
    switch (currentRole) {
      case USER_ROLES.PRODUCER:
        return <ProducerDashboard />;
      case USER_ROLES.BUYER:
        return <BuyerDashboard />;
      case USER_ROLES.AUTHORITY:
        return <AuthorityDashboard />;
      case USER_ROLES.CERTIFIER:
        return <CertifierDashboard />;
      default:
        return <GeneralDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {getDashboardContent()}
      
      {/* Quick Actions Panel */}
      <QuickActionsPanel currentRole={currentRole} />

      {/* Recent Activity */}
      <RecentActivityPanel currentRole={currentRole} />
    </div>
  );
}

// Role-specific dashboard components with real data
function ProducerDashboard() {
  const { facilities, batches, certificates } = useAppAuth();

  // Calculate real stats from data
  const totalProduction = batches.reduce((sum, batch) => sum + parseFloat(batch.amount || "0"), 0);
  const activeBatches = batches.filter(batch => batch.status === "ISSUED").length;
  const totalCertificates = certificates.length;
  const totalFacilities = facilities.length;

  const stats = [
    {
      title: "Total Production",
      value: `${totalProduction.toFixed(1)} kg`,
      subtitle: "All time",
      icon: Factory,
      iconColor: "text-green-400"
    },
    {
      title: "Active Batches",
      value: activeBatches.toString(),
      subtitle: "Currently issued",
      icon: Factory,
      iconColor: "text-blue-400"
    },
    {
      title: "Facilities",
      value: totalFacilities.toString(),
      subtitle: "Registered",
      icon: Factory,
      iconColor: "text-green-400"
    },
    {
      title: "Certificates",
      value: totalCertificates.toString(),
      subtitle: "Total issued",
      icon: Award,
      iconColor: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

function BuyerDashboard() {
  const { certificates, retirements } = useAppAuth();

  // Calculate real stats from data
  const totalCertificates = certificates.length;
  const totalRetirements = retirements.length;
  const totalSpent = retirements.reduce((sum, retirement) => sum + parseFloat(retirement.amount || "0"), 0);
  const carbonOffset = totalRetirements * 0.1; // 0.1 kg CO2 per kg H2

  const stats = [
    {
      title: "Certificates",
      value: totalCertificates.toString(),
      subtitle: "Total owned",
      icon: Award,
      iconColor: "text-blue-400"
    },
    {
      title: "Retirements",
      value: totalRetirements.toString(),
      subtitle: "Credits retired",
      icon: Leaf,
      iconColor: "text-green-400"
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(0)}`,
      subtitle: "On credits",
      icon: Factory,
      iconColor: "text-purple-400"
    },
    {
      title: "Carbon Offset",
      value: `${carbonOffset.toFixed(1)}t`,
      subtitle: "CO₂ saved",
      icon: Leaf,
      iconColor: "text-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

function AuthorityDashboard() {
  const { facilities, batches, certificates } = useAppAuth();

  // Calculate real stats from data
  const totalFacilities = facilities.length;
  const totalBatches = batches.length;
  const totalCertificates = certificates.length;
  const totalVolume = batches.reduce((sum, batch) => sum + parseFloat(batch.amount || "0"), 0);

  const stats = [
    {
      title: "Registered Facilities",
      value: totalFacilities.toString(),
      subtitle: "Total entities",
      icon: Factory,
      iconColor: "text-green-400"
    },
    {
      title: "Production Batches",
      value: totalBatches.toString(),
      subtitle: "Total tracked",
      icon: Activity,
      iconColor: "text-orange-400"
    },
    {
      title: "Certificates Issued",
      value: totalCertificates.toString(),
      subtitle: "Total verified",
      icon: Award,
      iconColor: "text-green-400"
    },
    {
      title: "Total Volume",
      value: `${totalVolume.toFixed(1)}t`,
      subtitle: "H₂ tracked",
      icon: Activity,
      iconColor: "text-blue-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

function CertifierDashboard() {
  const { batches, certificates } = useAppAuth();

  // Calculate real stats from data
  const pendingBatches = batches.filter(batch => batch.status === "PROPOSED").length;
  const totalCertificates = certificates.length;
  const avgReviewTime = "2.3d"; // This would be calculated from actual data
  const rejectionRate = "5.2%"; // This would be calculated from actual data

  const stats = [
    {
      title: "Pending Reviews",
      value: pendingBatches.toString(),
      subtitle: "Requires action",
      icon: Activity,
      iconColor: "text-orange-400"
    },
    {
      title: "Certificates Issued",
      value: totalCertificates.toString(),
      subtitle: "Total verified",
      icon: Award,
      iconColor: "text-green-400"
    },
    {
      title: "Avg Review Time",
      value: avgReviewTime,
      subtitle: "Target: 3d",
      icon: Factory,
      iconColor: "text-blue-400"
    },
    {
      title: "Rejection Rate",
      value: rejectionRate,
      subtitle: "Quality metric",
      icon: Factory,
      iconColor: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

function GeneralDashboard() {
  const { facilities, batches, certificates, retirements } = useAppAuth();

  // Calculate real stats from data
  const totalProduction = batches.reduce((sum, batch) => sum + parseFloat(batch.amount || "0"), 0);
  const totalTransactions = batches.length + certificates.length + retirements.length;
  const totalCertificates = certificates.length;
  const carbonSaved = retirements.reduce((sum, retirement) => sum + parseFloat(retirement.amount || "0"), 0) * 0.1;

  const stats = [
    {
      title: "Total Production",
      value: `${totalProduction.toFixed(1)} kg`,
      subtitle: "All time",
      icon: Factory,
      iconColor: "text-green-400"
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toString(),
      subtitle: "Platform wide",
      icon: Activity,
      iconColor: "text-blue-400"
    },
    {
      title: "Certificates",
      value: totalCertificates.toString(),
      subtitle: "Total issued",
      icon: Award,
      iconColor: "text-purple-400"
    },
    {
      title: "Carbon Saved",
      value: `${carbonSaved.toFixed(1)}t`,
      subtitle: "CO₂ equivalent",
      icon: Leaf,
      iconColor: "text-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}