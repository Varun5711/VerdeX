// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Address = v.string(); // "0x..."

const Hex = v.string(); // generic hex "0x..."
const CidOrKey = v.string(); // IPFS CID or cloud object key

// --- Enums ---
const Role = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR"),
  v.literal("ADMIN")
);
const OrgType = v.union(
  v.literal("PRODUCER"),
  v.literal("CERTIFIER"),
  v.literal("AUTHORITY"),
  v.literal("BUYER"),
  v.literal("AUDITOR")
);
const BatchStatus = v.union(
  v.literal("DRAFT"),
  v.literal("PROPOSED"),
  v.literal("NEEDS_FIX"),
  v.literal("APPROVED"),
  v.literal("ISSUED"),
  v.literal("REJECTED")
);
const DocType = v.union(
  v.literal("METER_CSV"),
  v.literal("REC_PROOF"),
  v.literal("AUDIT_PDF"),
  v.literal("GEN_CERT"),
  v.literal("OTHER")
);
const StorageProvider = v.union(
  v.literal("S3"),
  v.literal("GCS"),
  v.literal("IPFS"),
  v.literal("FILECOIN"),
  v.literal("ARWEAVE"),
  v.literal("OTHER")
);
const JobStatus = v.union(
  v.literal("PENDING"),
  v.literal("RUNNING"),
  v.literal("SUCCESS"),
  v.literal("FAILED")
);

export default defineSchema({
  // -------------------------
  // Identity (Clerk-native)
  // -------------------------
  users: defineTable({
    // Clerk primitives
    clerkUserId: v.string(), // e.g., "user_2YxA4..."
    clerkPrimaryEmail: v.optional(v.string()),
    clerkOrgId: v.optional(v.string()), // current active org id (Clerk Organizations)
    clerkOrgRole: v.optional(v.string()), // current active org role (Clerk)
    // App profile
    displayName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    // Wallets (linked via SIWE)
    primaryAddress: v.optional(Address),
    linkedAddresses: v.optional(v.array(Address)),
    // App authZ (global fallback; prefer org-scoped roles)
    roles: v.array(Role),
    orgPrimary: v.optional(v.id("orgs")), // app org pinned in UI (optional)
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
    disabled: v.optional(v.boolean()),
    wallet: v.optional(v.string()),
  })
    .index("byClerkUserId", ["clerkUserId"])
    .index("byPrimaryAddress", ["primaryAddress"])
    .index("byOrgPrimary", ["orgPrimary"]),

  orgs: defineTable({
    // Map to Clerk Organization if you enable it
    clerkOrgId: v.optional(v.string()), // e.g., "org_2Zk8a..."
    name: v.string(),
    type: OrgType,
    createdAt: v.number(),
    createdBy: v.string(),
    meta: v.optional(
      v.object({
        country: v.optional(v.string()),
        region: v.optional(v.string()),
        website: v.optional(v.string()),
        slug: v.optional(v.string()),
      })
    ),
  })
    .searchIndex("searchByName", {
      searchField: "name",
      filterFields: ["type"],
    })
    .index("byType", ["type"])
    .index("byCreator", ["createdBy"])
    .index("byClerkOrgId", ["clerkOrgId"]),

  orgMembers: defineTable({
    orgId: v.id("orgs"),
    userId: v.id("users"),
    // Clerk membership mirrors (if using Clerk Orgs)
    clerkOrgId: v.optional(v.string()),
    clerkMembershipId: v.optional(v.string()), // "orgmem_..."
    clerkRole: v.optional(v.string()), // e.g., "org:admin","org:member"
    // App-scoped roles for this org (preferred authZ source)
    orgRole: v.union(
      v.literal("OWNER"),
      v.literal("ADMIN"),
      v.literal("MEMBER")
    ),
    roles: v.array(Role),
    invitedBy: v.id("users"),
    invitedAt: v.number(),
    acceptedAt: v.optional(v.number()),
  })
    .index("byOrg", ["orgId"])
    .index("byUser", ["userId"])
    .index("byOrgUser", ["orgId", "userId"])
    .index("byClerk", ["clerkOrgId", "clerkMembershipId"])
    .index("byClerkMembershipId", ["clerkMembershipId"]),

  // -------------------------
  // Producer Assets
  // -------------------------
  facilities: defineTable({
    orgId: v.id("orgs"),
    facilityId: v.string(), // human code unique per org (enforce in code)
    name: v.string(),
    location: v.object({
      country: v.string(),
      region: v.optional(v.string()),
      lat: v.optional(v.number()),
      lon: v.optional(v.number()),
      gridZone: v.optional(v.string()),
    }),
    tech: v.optional(
      v.object({
        electrolyzerType: v.optional(v.string()),
        capacityMW: v.optional(v.string()), // decimal string
        renewableSource: v.optional(v.string()), // e.g., "Solar PPA"
      })
    ),
    createdAt: v.number(),
    createdBy: v.id("users"),
  })
    .searchIndex("searchFacilities", {
      searchField: "name",
      filterFields: ["orgId"],
    })
    .index("byOrg", ["orgId"])
    .index("byFacilityId", ["facilityId"]),

  meters: defineTable({
    facilityId: v.id("facilities"),
    meterId: v.string(), // unique per facility (enforce in code)
    unit: v.string(), // "kWh", "kgH2"
    kind: v.union(
      v.literal("PRODUCTION"),
      v.literal("ELECTRICITY"),
      v.literal("WATER"),
      v.literal("OTHER")
    ),
    calibrationDoc: v.optional(CidOrKey),
    createdAt: v.number(),
    createdBy: v.id("users"),
  })
    .index("byFacility", ["facilityId"])
    .index("byFacilityMeter", ["facilityId", "meterId"]),

  meterReadings: defineTable({
    meterId: v.id("meters"),
    tsStart: v.number(),
    tsEnd: v.number(),
    value: v.string(), // decimal string
    docRef: v.optional(v.id("docs")),
    hash: v.optional(Hex),
    importedBy: v.id("users"),
    importedAt: v.number(),
    locked: v.optional(v.boolean()),
    flagged: v.optional(v.boolean()),
    flagReason: v.optional(v.string()),
  })
    .index("byMeter", ["meterId"])
    .index("byMeterTime", ["meterId", "tsStart"])
    .index("byTime", ["tsStart"]),

  // -------------------------
  // Batch Lifecycle
  // -------------------------
  batches: defineTable({
    batchId: v.string(), // deterministic hash
    producerOrg: v.id("orgs"),
    batchHumanId: v.optional(v.string()),     // 👈 add this
    facilityId: v.id("facilities"),
    startTs: v.number(),
    endTs: v.number(),
    amount: v.string(), // decimal string
    meterHash: Hex,
    renewableProofHash: Hex,
    docBundleHash: Hex,
    status: BatchStatus,
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    approvedBy: v.optional(v.id("users")),
    approvedAt: v.optional(v.number()),
    rejectedBy: v.optional(v.id("users")),
    rejectReason: v.optional(v.string()),
    issuedBy: v.optional(v.id("users")),
    issuedAt: v.optional(v.number()),
    producerWallet: v.optional(v.string()), // 👈 add here
    chain: v.optional(
      v.object({
        chainId: v.optional(v.number()),
        registry: v.optional(Address),
        tokenIdHex: v.optional(Hex),
        issueTx: v.optional(Hex),
      })
    ),
  })
    .index("byExternalId", ["batchHumanId"])
    .index("byBatchId", ["batchId"])
    .index("byFacility", ["facilityId"])
    .index("byProducerOrg", ["producerOrg"])
    .index("byStatus", ["status", "createdAt"])
    .index("byStartTs", ["startTs"]),

  // anti–double counting locks
  periodLocks: defineTable({
    facilityId: v.id("facilities"),
    startTs: v.number(),
    endTs: v.number(),
    batchRef: v.optional(v.id("batches")),
    reason: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(),
    releasedAt: v.optional(v.number()),
  })
    .index("byFacility", ["facilityId"])
    .index("byFacilityStart", ["facilityId", "startTs"]),

  // -------------------------
  // Documents & Evidence
  // -------------------------
  docs: defineTable({
    ownerOrg: v.id("orgs"),
    batchId: v.optional(v.id("batches")),
    type: DocType,
    provider: StorageProvider,
    storageKey: CidOrKey,
    hash: Hex, // plaintext hash
    size: v.number(),
    mime: v.string(),
    encrypted: v.boolean(),
    enc: v.optional(
      v.object({
        algo: v.string(), // "AES-GCM-256"
        keyId: v.string(),
        iv: v.optional(Hex),
      })
    ),
    createdBy: v.id("users"),
    createdAt: v.number(),
    label: v.optional(v.string()),
  })
    .index("byBatch", ["batchId"])
    .index("byOwner", ["ownerOrg"])
    .index("byType", ["type", "createdAt"])
    .searchIndex("searchLabels", {
      searchField: "label",
      filterFields: ["ownerOrg", "type"],
    }),

  // EIP-712 attestations (off-chain, signed by producer rep wallet)
  attestations: defineTable({
    batchId: v.id("batches"),
    signer: Address,
    typedDataHash: Hex,
    signature: Hex,
    payload: v.string(), // normalized JSON
    verified: v.boolean(),
    createdAt: v.number(),
  })
    .index("byBatch", ["batchId"])
    .index("bySigner", ["signer", "createdAt"]),

  // -------------------------
  // Chain Mirrors (to be filled when web3 wired)
  // -------------------------
  chainEvents: defineTable({
    chainId: v.number(),
    contract: Address,
    event: v.string(),
    txHash: Hex,
    blockNumber: v.number(),
    blockTimeMs: v.number(),
    args: v.string(), // JSON
    relatedBatchId: v.optional(v.id("batches")),
  })
    .index("byContract", ["contract", "blockNumber"])
    .index("byTx", ["txHash"])
    .index("byRelatedBatch", ["relatedBatchId"]),

  transfers: defineTable({
    batchId: v.id("batches"),
    tokenIdHex: Hex,
    from: Address,
    to: Address,
    amount: v.string(),
    txHash: Hex,
    blockNumber: v.number(),
    blockTimeMs: v.number(),
  })
    .index("byTo", ["to", "blockNumber"])
    .index("byFrom", ["from", "blockNumber"])
    .index("byBatch", ["batchId", "blockNumber"]),

  retirements: defineTable({
    batchId: v.id("batches"),
    tokenIdHex: Hex,
    owner: Address,
    amount: v.string(),
    claimRef: v.string(),
    retiredAtMs: v.number(),
    txHash: v.optional(Hex),
    certificateId: v.optional(v.id("certificates")),
  })
    .index("byOwner", ["owner", "retiredAtMs"])
    .index("byClaimRef", ["claimRef"])
    .index("byBatch", ["batchId", "retiredAtMs"]),

  certificates: defineTable({
    batchId: v.id("batches"),
    amount: v.string(),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    publicSlug: v.string(),
    status: v.optional(v.string()),

    // optional extra metadata
    buyerOrg: v.optional(v.id("orgs")),
    claimRef: v.optional(v.string()),
    pdfKey: v.optional(v.string()),
    pdfHash: v.optional(v.string()),
    retireId: v.optional(v.id("retirements")),

    // 👇 add this if you want blockchain anchoring
    chain: v.optional(
      v.object({
        chainId: v.optional(v.number()),
        registry: v.optional(v.string()),
        tokenIdHex: v.optional(v.string()),
        issueTx: v.optional(v.string()),
      })
    ),
    issuedBy: v.optional(v.id("users")),
    issuedAt: v.optional(v.number()),
  })
    .index("byBatch", ["batchId"])
    .index("bySlug", ["publicSlug"])
    .index("byBuyer", ["buyerOrg"]),
  // -------------------------
  // API keys / Notifications / Audit / Jobs
  // -------------------------
  apiKeys: defineTable({
    ownerOrg: v.id("orgs"),
    name: v.string(),
    hashedKey: Hex,
    scopes: v.array(v.string()),
    createdAt: v.number(),
    createdBy: v.id("users"),
    lastUsedAt: v.optional(v.number()),
    disabled: v.optional(v.boolean()),
  })
    .index("byOwner", ["ownerOrg"])
    .index("byName", ["ownerOrg", "name"]),

  notifications: defineTable({
    userId: v.id("users"),
    kind: v.string(),
    payload: v.string(),
    createdAt: v.number(),
    readAt: v.optional(v.number()),
  })
    .index("byUser", ["userId", "createdAt"])
    .index("byUnread", ["userId"]),

  auditLog: defineTable({
    actor: v.id("users"),
    action: v.string(),
    targetTable: v.string(),
    targetId: v.string(),
    at: v.number(),
    meta: v.string(),
  })
    .index("byTarget", ["targetTable", "targetId"])
    .index("byActor", ["actor", "at"]),

  jobs: defineTable({
    kind: v.string(),
    status: JobStatus,
    params: v.string(),
    createdAt: v.number(),
    startedAt: v.optional(v.number()),
    finishedAt: v.optional(v.number()),
    error: v.optional(v.string()),
    createdBy: v.optional(v.id("users")),
  })
    .index("byKind", ["kind", "createdAt"])
    .index("byStatus", ["status", "createdAt"]),
});
