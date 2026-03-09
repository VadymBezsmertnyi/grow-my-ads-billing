import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  planId: z.string(),
  discountPercent: z.number().optional(),
  isActive: z.boolean().optional(),
  isPaused: z.boolean().optional(),
  subscriptionStartDate: z.string().optional().nullable(),
});

export const updateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().nullable().optional(),
  planId: z.string().optional(),
  discountPercent: z.number().optional(),
  isActive: z.boolean().optional(),
  isPaused: z.boolean().optional(),
  subscriptionStartDate: z.string().optional().nullable(),
});

export const listClientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  planId: z.string().optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});
