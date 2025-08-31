import ActivityItem from "./ActivityItem";

interface RecentActivityPanelProps {
  currentRole: string;
}

export default function RecentActivityPanel({ currentRole }: RecentActivityPanelProps) {
  const getProducerActivities = () => [
    { action: "Production batch completed", time: "2 hours ago", status: "success" as const },
    { action: "Quality test passed", time: "4 hours ago", status: "success" as const },
    { action: "Certificate requested", time: "6 hours ago", status: "pending" as const }
  ];

  const getBuyerActivities = () => [
    { action: "Order delivered", time: "2 hours ago", status: "success" as const },
    { action: "Payment processed", time: "4 hours ago", status: "success" as const },
    { action: "Order placed", time: "6 hours ago", status: "pending" as const }
  ];

  const getAuthorityActivities = () => [
    { action: "Compliance check completed", time: "2 hours ago", status: "success" as const },
    { action: "New entity registered", time: "4 hours ago", status: "success" as const },
    { action: "Audit scheduled", time: "6 hours ago", status: "pending" as const }
  ];

  const getCertifierActivities = () => [
    { action: "Certificate issued", time: "2 hours ago", status: "success" as const },
    { action: "Review completed", time: "4 hours ago", status: "success" as const },
    { action: "Documentation received", time: "6 hours ago", status: "pending" as const }
  ];

  const getActivities = () => {
    switch (currentRole) {
      case 'producer': return getProducerActivities();
      case 'buyer': return getBuyerActivities();
      case 'authority': return getAuthorityActivities();
      case 'certifier': return getCertifierActivities();
      default: return [];
    }
  };

  const activities = getActivities();

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-green-400 hover:text-green-300 text-sm transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            action={activity.action}
            time={activity.time}
            status={activity.status}
          />
        ))}
      </div>
    </div>
  );
}
