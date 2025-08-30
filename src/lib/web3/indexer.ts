import { convex, api } from "../convex";
import { CHAINS } from "../chains";

// Example: scan chain logs for "Issued" events
export async function indexCertificates(fromBlock: number, toBlock: number) {
  console.log(`📡 Scanning ${CHAINS.holesky.name} logs from ${fromBlock} to ${toBlock}`);

  // 🔹 Simulated event decoded from chain
  const externalBatchId = "6d2588b7-cd16-4f4d-8a3b-f10447857db2"; // string batchId from event
  const amount = "100";
  const txHash = "0xdeadbeef...";
  const pdfHash = "0x123abc";

  // 🔹 Step 1: Resolve Convex batch
  const batch = await convex.query(api.batches.getByExternalId, {
    externalId: externalBatchId,
  });

  if (!batch) {
    console.warn("⚠️ No Convex batch found for externalId", externalBatchId);
    return;
  }

  // 🔹 Step 2: Write certificate in Convex
  await convex.mutation(api.certificates.issue, {
    clerkUserId: "system",     // system actor for indexer
    batchId: batch._id,        // ✅ Convex Id
    amount,
    claimRef: `log-${externalBatchId}`,
    pdfKey: "ipfs://placeholder",
    pdfHash,
    publicSlug: `cert-${externalBatchId}`,
    // omit retireId for now, gets filled later
  });

  console.log(`✅ Indexed cert for batch ${externalBatchId} (tx: ${txHash})`);
}