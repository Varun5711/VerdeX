import { 
  Menu, Search, Bell, MoreVertical, User, Download, RefreshCw, Upload 
} from "lucide-react";
import WalletButton from "../ui/WalletButton";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentRole: string;
  notifications: number;
  mockUser: {
    primaryEmailAddress: { emailAddress: string };
    name: string;
    company: string;
  };
  mockAddress: string;
  mounted: boolean;
}

export default function DashboardHeader({
  sidebarOpen,
  onToggleSidebar,
  currentRole,
  notifications,
  mockUser,
  mockAddress,
  mounted
}: DashboardHeaderProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'producer': return 'bg-green-900/50 text-green-400 border-green-800';
      case 'buyer': return 'bg-blue-900/50 text-blue-400 border-blue-800';
      case 'authority': return 'bg-red-900/50 text-red-400 border-red-800';
      case 'certifier': return 'bg-purple-900/50 text-purple-400 border-purple-800';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800';
    }
  };

  const getActionButtonText = () => {
    switch (currentRole) {
      case 'producer': return 'Upload Data';
      case 'buyer': return 'Place Order';
      case 'authority': return 'New Audit';
      case 'certifier': return 'New Review';
      default: return 'Action';
    }
  };

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex justify-between items-center px-6 shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-300" />
        </button>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(currentRole)}`}>
          {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
        </span>
      </div>
      
      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-64 transition-colors"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-300" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-200">
              {mockUser.name}
            </div>
            <div className="text-xs text-gray-400">
              {mockUser.company}
            </div>
          </div>
          
          {/* Wallet Status */}
          <div className="text-right hidden lg:block">
            <WalletButton variant="compact" />
          </div>
          
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <User size={20} className="text-white" />
          </div>
          
          {/* More Options */}
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical size={16} className="text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
