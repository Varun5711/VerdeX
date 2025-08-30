import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

export async function uploadDoc({
  createDoc,
  clerkUserId,
  ownerOrg,
  createdBy,
  type,
  storageKey,
  hash,
  size,
  mime,
  encrypted,
  provider,
  label,
  batchId,
}: {
  createDoc: ReturnType<typeof useMutation<typeof api.docs.create>>;
  clerkUserId: string;
  ownerOrg: string; // Id<"orgs">
  createdBy: string; // Id<"users">
  type: "OTHER" | "METER_CSV" | "REC_PROOF" | "AUDIT_PDF" | "GEN_CERT";
  storageKey: string;
  hash: string;
  size: number;
  mime: string;
  encrypted: boolean;
  provider: { name: string; region?: string }; // whatever your schema expects
  label?: string;
  batchId?: string;
}) {
  return await createDoc({
    clerkUserId,
    ownerOrg: ownerOrg as any,
    // createdBy: createdBy as string,
    type,
    storageKey,
    hash,
    size,
    mime,
    encrypted,
    provider: "IPFS", // ✅ required
    label,
    batchId: batchId as any,
  });
}