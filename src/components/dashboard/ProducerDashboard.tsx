import { Factory, ShoppingCart, DollarSign, Award, LineChart } from "lucide-react";
import StatsCard from "./StatsCard";

export default function ProducerDashboard() {
  const stats = [
    {
      title: "Daily Production",
      value: "24.7 kg",
      subtitle: "Today's output",
      icon: Factory,
      iconColor: "text-green-400",
      trend: { value: "8% today", isPositive: true }
    },
    {
      title: "Active Orders",
      value: "12",
      subtitle: "3 pending",
      icon: ShoppingCart,
      iconColor: "text-blue-400"
    },
    {
      title: "Revenue",
      value: "$48,320",
      subtitle: "This month",
      icon: DollarSign,
      iconColor: "text-green-400"
    },
    {
      title: "Certificates",
      value: "156",
      subtitle: "8 pending",
      icon: Award,
      iconColor: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Producer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Production Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Production Overview</h3>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LineChart className="text-gray-400 mx-auto mb-2" size={48} />
            <p className="text-gray-400">Production chart would go here</p>
            <p className="text-sm text-gray-500 mt-2">Integration with charting library</p>
          </div>
        </div>
      </div>
    </div>
  );
}
