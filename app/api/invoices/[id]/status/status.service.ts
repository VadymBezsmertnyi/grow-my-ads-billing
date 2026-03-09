import { prisma } from "@/src/server/prisma";
import { ApiError } from "@/src/server/api-handler";
import { validateInvoiceStatusTransition } from "../../invoices.helpers";
import type { InvoiceStatus } from "@/app/generated/prisma/enums";

export const updateInvoiceStatus = async (
  id: string,
  toStatus: InvoiceStatus
) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });
  if (!invoice) throw new ApiError("Invoice not found", 404);

  validateInvoiceStatusTransition(invoice.status, toStatus);

  const updateData: { status: InvoiceStatus; sentAt?: Date; paidAt?: Date } = {
    status: toStatus,
  };
  if (toStatus === "SENT") updateData.sentAt = new Date();
  if (toStatus === "PAID") updateData.paidAt = new Date();

  return prisma.invoice.update({
    where: { id },
    data: updateData,
  });
};
