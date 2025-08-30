import { z } from "zod";

export const FacilitySchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  region: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
});

export const BatchSchema = z.object({
  startTs: z.number(),
  endTs: z.number(),
  amount: z.string(),
});