import { ApiError } from "@/src/lib/api-handler";
import type { InvoiceStatus } from "@/app/generated/prisma/enums";

const TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
  DRAFT: ["SENT"],
  SENT: ["PAID"],
  PAID: [],
};

export const getAvailableInvoiceStatusTransitions = (
  from: InvoiceStatus
): InvoiceStatus[] => TRANSITIONS[from] ?? [];

export const validateInvoiceStatusTransition = (
  from: InvoiceStatus,
  to: InvoiceStatus
): void => {
  const allowed = getAvailableInvoiceStatusTransitions(from);
  if (!allowed.includes(to))
    throw new ApiError(`Cannot transition from ${from} to ${to}`, 400);
};

export const validateInvoiceEditable = (status: InvoiceStatus): void => {
  if (status !== "DRAFT")
    throw new ApiError(
      `Invoice is not editable. Only DRAFT invoices can be modified.`,
      400
    );
};
