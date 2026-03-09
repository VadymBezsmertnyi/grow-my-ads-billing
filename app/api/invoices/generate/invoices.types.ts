import type { z } from "zod";
import type { generateInvoiceSchema } from "./invoices.schemas";

export type GenerateInvoiceInput = z.infer<typeof generateInvoiceSchema>;
