import { apiHandler } from "@/src/server/api-handler";
import { listInvoicesQuerySchema } from "./invoices.schemas";
import { listInvoices } from "./invoices.service";

export const GET = async (request: Request) =>
  apiHandler(async () => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    const query = listInvoicesQuerySchema.parse(params);
    return listInvoices(query);
  });
