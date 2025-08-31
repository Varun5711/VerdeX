import { AlertCircle, Award, Calendar, CheckCircle } from "lucide-react";
import StatsCard from "./StatsCard";

export default function CertifierDashboard() {
  const stats = [
    {
      title: "Pending Reviews",
      value: "23",
      subtitle: "Requires action",
      icon: AlertCircle,
      iconColor: "text-orange-400"
    },
    {
      title: "Certificates Issued",
      value: "1,847",
      subtitle: "This year",
      icon: Award,
      iconColor: "text-green-400"
    },
    {
      title: "Avg Review Time",
      value: "2.3d",
      subtitle: "Target: 3d",
      icon: Calendar,
      iconColor: "text-blue-400"
    },
    {
      title: "Rejection Rate",
      value: "5.2%",
      subtitle: "Quality metric",
      icon: CheckCircle,
      iconColor: "text-purple-400"
    }
  ];

  const pendingCertifications = [
    { producer: "EcoEnergy Corp", batch: "H2-2024-0892", amount: "500 kg", submitted: "2 days ago", priority: "High" },
    { producer: "Green Power Ltd", batch: "H2-2024-0893", amount: "750 kg", submitted: "1 day ago", priority: "Medium" },
    { producer: "Clean H2 Inc", batch: "H2-2024-0894", amount: "300 kg", submitted: "3 hours ago", priority: "High" }
  ];

  const getPriorityColor = (priority: string) => {
    return priority === 'High' ? 'bg-red-400' : 'bg-orange-400';
  };

  const getPriorityBadgeColor = (priority: string) => {
    return priority === 'High' ? 'bg-red-900/50 text-red-400' : 'bg-orange-900/50 text-orange-400';
  };

  return (
    <div className="space-y-6">
      {/* Certifier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Pending Certifications */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Pending Certifications</h3>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {pendingCertifications.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
                <div>
                  <p className="font-medium text-white">{item.producer}</p>
                  <p className="text-sm text-gray-400">Batch: {item.batch} • {item.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">{item.submitted}</p>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityBadgeColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
