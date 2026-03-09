import { z } from "zod";

export const updateInvoiceStatusSchema = z.object({
  status: z.enum(["SENT", "PAID"]),
});
