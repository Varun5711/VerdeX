import { 
  Upload, Award, ShoppingCart, BarChart3, Search, FileText, MapPin, PieChart,
  Shield, Users, AlertCircle, CheckCircle, Filter
} from "lucide-react";
import QuickActionCard from "./QuickActionCard";

interface QuickActionsPanelProps {
  currentRole: string;
}

export default function QuickActionsPanel({ currentRole }: QuickActionsPanelProps) {
  const getProducerActions = () => [
    { icon: Upload, title: "Upload Production Data", iconColor: "text-green-400" },
    { icon: Award, title: "Request Certificate", iconColor: "text-purple-400" },
    { icon: ShoppingCart, title: "List for Sale", iconColor: "text-blue-400" },
    { icon: BarChart3, title: "View Analytics", iconColor: "text-orange-400" }
  ];

  const getBuyerActions = () => [
    { icon: Search, title: "Browse Marketplace", iconColor: "text-blue-400" },
    { icon: FileText, title: "View Orders", iconColor: "text-green-400" },
    { icon: MapPin, title: "Track Delivery", iconColor: "text-purple-400" },
    { icon: PieChart, title: "Portfolio", iconColor: "text-orange-400" }
  ];

  const getAuthorityActions = () => [
    { icon: Shield, title: "Compliance Check", iconColor: "text-red-400" },
    { icon: FileText, title: "Generate Report", iconColor: "text-blue-400" },
    { icon: Users, title: "Manage Entities", iconColor: "text-green-400" },
    { icon: AlertCircle, title: "Issue Alert", iconColor: "text-orange-400" }
  ];

  const getCertifierActions = () => [
    { icon: CheckCircle, title: "Review Pending", iconColor: "text-green-400" },
    { icon: Award, title: "Issue Certificate", iconColor: "text-purple-400" },
    { icon: FileText, title: "Audit Reports", iconColor: "text-blue-400" },
    { icon: Filter, title: "Quality Standards", iconColor: "text-orange-400" }
  ];

  const getActions = () => {
    switch (currentRole) {
      case 'producer': return getProducerActions();
      case 'buyer': return getBuyerActions();
      case 'authority': return getAuthorityActions();
      case 'certifier': return getCertifierActions();
      default: return [];
    }
  };

  const actions = getActions();

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            iconColor={action.iconColor}
          />
        ))}
      </div>
    </div>
  );
}
