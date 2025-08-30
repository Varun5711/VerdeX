"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount, useWriteContract } from "wagmi";
import GreenHydrogen1155 from "../../lib/abis/GreenHydrogen1155.json";
const REGISTRY_ADDRESS = "0xf50c39326be085B324054334D040d6b4cB43abDa"


const GreenHydrogen1155ABI = GreenHydrogen1155.abi; // ✅ fix typing

export default function IssueCertificateForm({ orgId }: { orgId: string }) {
  const { user } = useUser();
  const { address } = useAccount();
  const issueConvex = useMutation(api.certificates.issue);

  const { writeContractAsync } = useWriteContract();

  const [batchId, setBatchId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!user?.id) return setStatus("❌ Clerk user missing");
    if (!recipient || !batchId || !amount) return setStatus("❌ Missing fields");

    try {
      setStatus("⏳ Issuing...");

      // 1. Call Convex to log issuance intent
      await issueConvex({
        clerkUserId: user.id,
        batchId: batchId as any, // cast until convex schema updated
        amount,
        buyerOrg: orgId as any,
        claimRef: crypto.randomUUID(),
        pdfKey: "",
        pdfHash: "",
        retireId: undefined as any,
        publicSlug: crypto.randomUUID(),
      });

      // 2. Call contract to mint ERC1155
      const tx = await writeContractAsync({
        address: REGISTRY_ADDRESS as `0x${string}`,
        abi: GreenHydrogen1155ABI,
        functionName: "mint",
        args: [recipient, BigInt(batchId), BigInt(amount), "0x"], // ✅ use batchId as tokenId
      });

      setStatus(`✅ Issued certificate. Tx: ${tx}`);
    } catch (err: any) {
      console.error(err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Issue Certificate</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Recipient Wallet Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={onSubmit}
      >
        Issue
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}