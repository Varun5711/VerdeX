import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  iconColor: string;
  onClick?: () => void;
}

export default function QuickActionCard({
  icon: Icon,
  title,
  iconColor,
  onClick
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
    >
      <div className={`p-2 rounded-lg bg-gray-600 group-hover:bg-gray-500 transition-colors`}>
        <Icon className={iconColor} size={24} />
      </div>
      <span className="text-sm text-white font-medium text-center">{title}</span>
    </button>
  );
}
