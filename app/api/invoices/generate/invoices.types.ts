import type { z } from "zod";
import type { generateInvoiceSchema } from "./invoices.schemas";

export type GenerateInvoiceInputT = z.infer<typeof generateInvoiceSchema>;
