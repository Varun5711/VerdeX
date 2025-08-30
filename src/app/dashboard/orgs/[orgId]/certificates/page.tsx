"use client";

import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import OrgRoleGuard from "../../../../../components/blocks/OrgRoleGuard";
import StatusPill from "../../../../../components/blocks/StatusPill";
import {
  useAccount,
  useWriteContract,
  useSwitchChain,
  useReadContract,
} from "wagmi";
import { keccak256, toHex } from "viem";
import GreenHydrogen1155 from "../../../../../lib/abis/GreenHydrogen1155.json";

const REGISTRY_ADDRESS = "0xf50c39326be085B324054334D040d6b4cB43abDa";

// Holesky metadata
const HOLESKY_CHAIN = {
  id: 17000,
  name: "Ethereum Holesky",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://ethereum-holesky.publicnode.com"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://holesky.etherscan.io" },
  },
};

export default function CertificatesPage() {
  const { orgId } = useParams();
  const { user } = useUser();
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const convex = useConvex();

  const certs = useQuery(api.certificates.listByOrg, { orgId: orgId as any });
  const approveBatch = useMutation(api.batches.approve);
  const issueCert = useMutation(api.certificates.issue);

  if (!certs) return <div>Loading...</div>;

  const handleIssue = async (c: any) => {
    if (!isConnected) {
      alert("Please connect MetaMask.");
      return;
    }

    try {
      await switchChainAsync({ chainId: HOLESKY_CHAIN.id });

      const batch = c.batchData;
      if (!batch) throw new Error("Batch data not found");

      const producerWallet = batch.producerWallet ?? address;
      if (!producerWallet) throw new Error("Producer wallet not set");

      // ✅ Correct tokenId = keccak256(bytes(batchId))
      const tokenId = BigInt(keccak256(toHex(batch.batchId)));

      // 🔹 Call contract
      const txHash = await writeContractAsync({
        abi: GreenHydrogen1155.abi,
        address: REGISTRY_ADDRESS,
        functionName: "issue",
        args: [
          String(batch.batchId),
          producerWallet,
          BigInt(batch.amount),
          String(batch.docBundleHash || ""),
        ],
        chainId: HOLESKY_CHAIN.id,
      });

      // 🔹 Update certificate with chain info
      await issueCert({
        clerkUserId: user?.id!,
        id: c._id, // certificate id
        chain: {
          chainId: HOLESKY_CHAIN.id,
          registry: REGISTRY_ADDRESS,
          tokenIdHex: "0x" + tokenId.toString(16),
          issueTx: txHash,
        },
      });

      alert(`✅ Certificate issued on-chain. Tx: ${txHash}`);
    } catch (err: any) {
      console.error(err);
      alert(`❌ Failed: ${err.message}`);
    }
  };

  const handleApproveBatch = async (c: any) => {
    try {
      await approveBatch({
        clerkUserId: user?.id!,
        id: c.batchId, // batch doc id
      });

      alert("✅ Batch approved and certificate created");
    } catch (err: any) {
      console.error(err);
      alert(`❌ Failed: ${err.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Certificates</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Batch ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">On-Chain Balance</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certs.map((c: any) => (
            <tr key={c._id} className="border-b">
              <td className="p-2">{c.batchData?.batchId || c.batchId}</td>
              <td className="p-2">{c.amount}</td>
              <td className="p-2">
                <StatusPill status={c.status ?? "PENDING"} />
              </td>
              <td className="p-2">
                {c.status === "ISSUED" && address ? (
                  <OnChainBalance
                    batchId={c.batchData?.batchId || c.batchId}
                    address={address}
                  />
                ) : (
                  "—"
                )}
              </td>
              <td className="p-2 space-x-2">
                <OrgRoleGuard orgId={orgId as any} roles={["CERTIFIER", "ADMIN"]}>
                  {c.status === "PROPOSED" && (
                    <button
                      onClick={() => handleApproveBatch(c)}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                  )}
                </OrgRoleGuard>

                <OrgRoleGuard orgId={orgId as any} roles={["AUTHORITY", "ADMIN"]}>
                  {c.status === "PENDING_ISSUE" && (
                    <button
                      onClick={() => handleIssue(c)}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Issue Certificate
                    </button>
                  )}
                </OrgRoleGuard>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {certs.length === 0 && <p>No certificates yet.</p>}
    </div>
  );
}

// ✅ balance check sub-component
function OnChainBalance({ batchId, address }: { batchId: string; address: string }) {
  const tokenId = BigInt(keccak256(toHex(batchId)));

  const { data, isLoading } = useReadContract({
    abi: GreenHydrogen1155.abi,
    address: REGISTRY_ADDRESS,
    functionName: "balanceOf",
    args: [address, tokenId],
    chainId: HOLESKY_CHAIN.id,
  });

  if (isLoading) return <span>Loading…</span>;
  return (
    <span>
      Balance at {address.slice(0, 6)}…: {data?.toString() ?? "0"}
    </span>
  );
}