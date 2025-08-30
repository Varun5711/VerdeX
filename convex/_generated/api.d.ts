/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as apiKeys from "../apiKeys.js";
import type * as attestations from "../attestations.js";
import type * as auditLog from "../auditLog.js";
import type * as batches from "../batches.js";
import type * as certificates from "../certificates.js";
import type * as chainEvents from "../chainEvents.js";
import type * as docs from "../docs.js";
import type * as facilities from "../facilities.js";
import type * as http from "../http.js";
import type * as jobs from "../jobs.js";
import type * as meterReadings from "../meterReadings.js";
import type * as meters from "../meters.js";
import type * as notifications from "../notifications.js";
import type * as orgMembers from "../orgMembers.js";
import type * as orgs from "../orgs.js";
import type * as overview from "../overview.js";
import type * as periodLocks from "../periodLocks.js";
import type * as retirements from "../retirements.js";
import type * as transfers from "../transfers.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  apiKeys: typeof apiKeys;
  attestations: typeof attestations;
  auditLog: typeof auditLog;
  batches: typeof batches;
  certificates: typeof certificates;
  chainEvents: typeof chainEvents;
  docs: typeof docs;
  facilities: typeof facilities;
  http: typeof http;
  jobs: typeof jobs;
  meterReadings: typeof meterReadings;
  meters: typeof meters;
  notifications: typeof notifications;
  orgMembers: typeof orgMembers;
  orgs: typeof orgs;
  overview: typeof overview;
  periodLocks: typeof periodLocks;
  retirements: typeof retirements;
  transfers: typeof transfers;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
