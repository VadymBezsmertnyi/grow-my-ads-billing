import z from "zod";
import { listInvoicesQuerySchema } from "./invoices.schemas";

export type ListInvoicesQuery = z.infer<typeof listInvoicesQuerySchema>;
