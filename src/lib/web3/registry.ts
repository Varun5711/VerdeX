"use client";

import { useWriteContract, useReadContract } from "wagmi";
import GreenHydrogen1155 from "../abis/GreenHydrogen1155.json"
import { CHAINS } from "../chains";

export function useMintCertificate() {
  const { writeContractAsync } = useWriteContract();
  return async (to: string, amount: bigint) => {
    return await writeContractAsync({
      address: CHAINS.holesky.registryAddress as `0x${string}`,
      abi: GreenHydrogen1155.abi,
      functionName: "mint",
      args: [to, amount],
    });
  };
}

export function useBalanceOf(address?: string) {
  return useReadContract({
    address: CHAINS.holesky.registryAddress as `0x${string}`,
    abi: GreenHydrogen1155.abi,
    functionName: "balanceOf",
    args: [address, BigInt(0)],
  });
}