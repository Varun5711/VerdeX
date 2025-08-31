import { CheckCircle, AlertCircle } from "lucide-react";

interface ActivityItemProps {
  action: string;
  time: string;
  status: 'success' | 'pending' | 'error';
}

export default function ActivityItem({ action, time, status }: ActivityItemProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-400',
          bgColor: 'bg-green-900/50',
          statusText: 'Completed',
          statusColor: 'bg-green-900/50 text-green-400'
        };
      case 'pending':
        return {
          icon: AlertCircle,
          iconColor: 'text-orange-400',
          bgColor: 'bg-orange-900/50',
          statusText: 'Pending',
          statusColor: 'bg-orange-900/50 text-orange-400'
        };
      case 'error':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-400',
          bgColor: 'bg-red-900/50',
          statusText: 'Failed',
          statusColor: 'bg-red-900/50 text-red-400'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`}>
          <Icon size={16} className={config.iconColor} />
        </div>
        <div>
          <p className="font-medium text-white">{action}</p>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded text-xs ${config.statusColor}`}>
        {config.statusText}
      </span>
    </div>
  );
}
