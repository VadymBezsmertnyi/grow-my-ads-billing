import { z } from "zod";

export const generateInvoiceSchema = z.object({
  clientId: z.string(),
  adSpend: z.number(),
  billingMonth: z.string(),
});
