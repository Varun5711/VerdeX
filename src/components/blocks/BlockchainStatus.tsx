"use client";

import { useState, useEffect } from "react";
import { useAccount, useContractRead, useBalance, useNetwork } from "wagmi";
import { ethers } from "ethers";
import GreenHydrogen1155ABI from "../../lib/abis/GreenHydrogen1155.json";

interface BlockchainStatusProps {
  contractAddress?: string;
  className?: string;
}

export default function BlockchainStatus({ contractAddress, className = "" }: BlockchainStatusProps) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  
  const [gasPrice, setGasPrice] = useState<string>("0");
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Contract state
  const { data: totalSupply } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: GreenHydrogen1155ABI,
    functionName: 'totalSupply',
    enabled: !!contractAddress,
  });

  const { data: authorityRole } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: GreenHydrogen1155ABI,
    functionName: 'AUTHORITY_ROLE',
    enabled: !!contractAddress,
  });

  const { data: isPaused } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: GreenHydrogen1155ABI,
    functionName: 'paused',
    enabled: !!contractAddress,
  });

  // Wallet balance
  const { data: balance } = useBalance({
    address: address,
    enabled: !!address,
  });

  // Update blockchain data every 10 seconds
  useEffect(() => {
    const updateBlockchainData = async () => {
      try {
        if (chain?.id === 17000) { // Holesky testnet
          const provider = new ethers.JsonRpcProvider("https://ethereum-holesky.publicnode.com");
          
          // Get current gas price
          const gasPriceData = await provider.getFeeData();
          if (gasPriceData.gasPrice) {
            setGasPrice(ethers.formatUnits(gasPriceData.gasPrice, "gwei"));
          }
          
          // Get current block number
          const blockNumberData = await provider.getBlockNumber();
          setBlockNumber(blockNumberData);
          
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error("Failed to update blockchain data:", error);
      }
    };

    updateBlockchainData();
    const interval = setInterval(updateBlockchainData, 10000);
    return () => clearInterval(interval);
  }, [chain?.id]);

  const getNetworkInfo = () => {
    if (!chain) return { name: "Unknown", color: "text-gray-500" };
    
    switch (chain.id) {
      case 17000:
        return { name: "Holesky Testnet", color: "text-blue-600" };
      case 1:
        return { name: "Ethereum Mainnet", color: "text-green-600" };
      case 11155111:
        return { name: "Sepolia Testnet", color: "text-purple-600" };
      default:
        return { name: `Chain ID ${chain.id}`, color: "text-gray-500" };
    }
  };

  const getConnectionStatus = () => {
    if (!isConnected) return { status: "Disconnected", color: "text-red-600", bg: "bg-red-100" };
    if (!address) return { status: "No Wallet", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { status: "Connected", color: "text-green-600", bg: "bg-green-100" };
  };

  const connectionStatus = getConnectionStatus();
  const networkInfo = getNetworkInfo();

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Blockchain Status</h3>
      
      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Connection</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${connectionStatus.bg} ${connectionStatus.color}`}>
            {connectionStatus.status}
          </span>
        </div>

        {/* Network Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Network</div>
            <div className={`text-sm font-medium ${networkInfo.color}`}>
              {networkInfo.name}
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Block Number</div>
            <div className="text-sm font-medium text-gray-900 font-mono">
              {blockNumber.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Gas Price */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Current Gas Price</div>
          <div className="text-sm font-medium text-gray-900">
            {parseFloat(gasPrice).toFixed(2)} Gwei
          </div>
        </div>

        {/* Contract Status */}
        {contractAddress && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Smart Contract Status</div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Contract Address</div>
                <div className="text-xs font-mono text-gray-900 break-all">
                  {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <div className={`text-xs font-medium ${isPaused ? 'text-red-600' : 'text-green-600'}`}>
                  {isPaused ? 'Paused' : 'Active'}
                </div>
              </div>
            </div>

            {totalSupply && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Total Supply</div>
                <div className="text-sm font-medium text-gray-900">
                  {Number(totalSupply).toLocaleString()} tokens
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wallet Information */}
        {address && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Wallet Information</div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Address</div>
              <div className="text-xs font-mono text-gray-900 break-all">
                {address}
              </div>
            </div>
            
            {balance && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">ETH Balance</div>
                <div className="text-sm font-medium text-gray-900">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Last Update */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
