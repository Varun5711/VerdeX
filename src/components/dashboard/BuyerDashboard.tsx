import { Zap, ShoppingCart, DollarSign, Leaf } from "lucide-react";
import StatsCard from "./StatsCard";

export default function BuyerDashboard() {
  const stats = [
    {
      title: "Available H₂",
      value: "847 kg",
      subtitle: "In marketplace",
      icon: Zap,
      iconColor: "text-blue-400"
    },
    {
      title: "My Orders",
      value: "7",
      subtitle: "2 delivered",
      icon: ShoppingCart,
      iconColor: "text-green-400"
    },
    {
      title: "Total Spent",
      value: "$23,180",
      subtitle: "This quarter",
      icon: DollarSign,
      iconColor: "text-purple-400"
    },
    {
      title: "Carbon Offset",
      value: "1.2t",
      subtitle: "CO₂ saved",
      icon: Leaf,
      iconColor: "text-green-400"
    }
  ];

  const marketplaceItems = [
    { producer: "EcoEnergy Corp", amount: "150 kg", price: "$45/kg", location: "California", certified: true },
    { producer: "Green Power Ltd", amount: "230 kg", price: "$42/kg", location: "Texas", certified: true },
    { producer: "Clean H2 Inc", amount: "89 kg", price: "$48/kg", location: "Oregon", certified: false }
  ];

  return (
    <div className="space-y-6">
      {/* Buyer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Marketplace */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Available Hydrogen</h3>
        <div className="space-y-3">
          {marketplaceItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.certified ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                <div>
                  <p className="font-medium text-white">{item.producer}</p>
                  <p className="text-sm text-gray-400">{item.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{item.amount}</p>
                <p className="text-sm text-gray-400">{item.price}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
