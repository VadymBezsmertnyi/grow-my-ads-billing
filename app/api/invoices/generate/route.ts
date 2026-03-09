import { apiHandler } from "@/src/server/api-handler";
import { generateInvoiceSchema } from "./invoices.schemas";
import { generateInvoice } from "./invoices.service";

export const POST = async (request: Request) =>
  apiHandler(
    async () => {
      const body = generateInvoiceSchema.parse(await request.json());
      return generateInvoice(body);
    },
    { successStatus: 201 }
  );
