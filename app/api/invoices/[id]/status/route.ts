import { apiHandler } from "@/src/server/api-handler";
import { updateInvoiceStatusSchema } from "./status.schemas";
import { updateInvoiceStatus } from "./status.service";

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) =>
  apiHandler(async () => {
    const { id } = await params;
    const body = updateInvoiceStatusSchema.parse(await request.json());
    return updateInvoiceStatus(id, body.status);
  });
