import { Download, RefreshCw, Upload } from "lucide-react";

interface DashboardBreadcrumbProps {
  pathname: string;
  currentRole: string;
}

export default function DashboardBreadcrumb({ pathname, currentRole }: DashboardBreadcrumbProps) {
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
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Dashboard</span>
          <span className="text-gray-600">/</span>
          <span className="text-white capitalize">{pathname.split('/').pop()}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
            <Upload size={16} />
            <span className="hidden sm:inline">{getActionButtonText()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
