import { convex, api } from "../convex";
import { CHAINS } from "../chains";

// Example: scan chain logs for "Issued" events
export async function indexCertificates(fromBlock: number, toBlock: number) {
  // In production, use viem or ethers to fetch logs
  console.log(`Scan ${CHAINS.holesky.name} logs from ${fromBlock} to ${toBlock}`);

  // Example: write to Convex
  await convex.mutation(api.certificates.issue, {
    // map event data here
    clerkUserId: "system",
    batchId: "batch_x" as any,
    amount: "100",
    claimRef: "logRef",
    pdfKey: "ipfs://something",
    pdfHash: "0xhash",
    retireId: undefined as any,
    publicSlug: "cert-1",
  });
}