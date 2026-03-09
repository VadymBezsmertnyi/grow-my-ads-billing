import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  planId: z.string(),
  discountPercent: z.number().optional(),
});
