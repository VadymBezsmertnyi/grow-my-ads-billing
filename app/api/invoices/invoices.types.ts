import z from "zod";
import { listInvoicesQuerySchema } from "./invoices.schemas";

export type ListInvoicesQueryT = z.infer<typeof listInvoicesQuerySchema>;
