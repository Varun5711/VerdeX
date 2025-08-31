"use client";

import { Wallet, LogOut } from "lucide-react";
import { useAppAuth } from "../../contexts/AuthContext";

interface WalletButtonProps {
  className?: string;
  variant?: "default" | "compact";
}

export default function WalletButton({ 
  className = "", 
  variant = "default" 
}: WalletButtonProps) {
  const { 
    isWalletConnected, 
    walletAddress, 
    connectWallet, 
    disconnectWallet 
  } = useAppAuth();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isWalletConnected && walletAddress) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {variant === "compact" ? (
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
            title="Disconnect Wallet"
          >
            <Wallet size={16} />
            <span className="font-mono">{formatAddress(walletAddress)}</span>
            <LogOut size={14} />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-800 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">Connected</span>
              <span className="font-mono text-green-400 text-sm">
                {formatAddress(walletAddress)}
              </span>
            </div>
            <button
              onClick={disconnectWallet}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Disconnect Wallet"
            >
              <LogOut size={16} className="text-gray-400" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className={`flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium ${className}`}
    >
      <Wallet size={16} />
      {variant === "compact" ? "Connect" : "Connect Wallet"}
    </button>
  );
}
