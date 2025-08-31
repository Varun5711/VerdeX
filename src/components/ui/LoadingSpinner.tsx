import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  text, 
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-green-400`} 
      />
      {text && (
        <span className="text-sm text-gray-400">{text}</span>
      )}
    </div>
  );
}

// Full page loading component
export function FullPageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
}

// Card loading component
export function CardLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
      <div className="text-center">
        <LoadingSpinner size="md" text={text} />
      </div>
    </div>
  );
}

// Inline loading component
export function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <LoadingSpinner size="sm" text={text} />
    </div>
  );
}
