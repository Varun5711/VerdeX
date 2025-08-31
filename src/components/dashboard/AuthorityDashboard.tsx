import { Users, AlertCircle, Shield, Activity } from "lucide-react";
import StatsCard from "./StatsCard";

export default function AuthorityDashboard() {
  const stats = [
    {
      title: "Registered Entities",
      value: "284",
      subtitle: "+12 this month",
      icon: Users,
      iconColor: "text-green-400",
      trend: { value: "12 this month", isPositive: true }
    },
    {
      title: "Pending Audits",
      value: "17",
      subtitle: "5 overdue",
      icon: AlertCircle,
      iconColor: "text-orange-400"
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      subtitle: "Above target",
      icon: Shield,
      iconColor: "text-green-400"
    },
    {
      title: "Total Volume",
      value: "15.8t",
      subtitle: "H₂ tracked",
      icon: Activity,
      iconColor: "text-blue-400"
    }
  ];

  const complianceItems = [
    { entity: "EcoEnergy Corp", status: "Compliant", lastAudit: "2024-08-15", risk: "Low" },
    { entity: "Green Power Ltd", status: "Pending Review", lastAudit: "2024-08-10", risk: "Medium" },
    { entity: "Clean H2 Inc", status: "Non-Compliant", lastAudit: "2024-07-28", risk: "High" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-400';
      case 'Pending Review': return 'bg-orange-400';
      case 'Non-Compliant': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-900/50 text-green-400';
      case 'Pending Review': return 'bg-orange-900/50 text-orange-400';
      case 'Non-Compliant': return 'bg-red-900/50 text-red-400';
      default: return 'bg-gray-900/50 text-gray-400';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-900/30 text-green-500';
      case 'Medium': return 'bg-orange-900/30 text-orange-500';
      case 'High': return 'bg-red-900/30 text-red-500';
      default: return 'bg-gray-900/30 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Authority Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Compliance Monitoring */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Monitoring</h3>
        <div className="space-y-3">
          {complianceItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                <div>
                  <p className="font-medium text-white">{item.entity}</p>
                  <p className="text-sm text-gray-400">Last audit: {item.lastAudit}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeColor(item.status)}`}>
                  {item.status}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getRiskBadgeColor(item.risk)}`}>
                  {item.risk} Risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
