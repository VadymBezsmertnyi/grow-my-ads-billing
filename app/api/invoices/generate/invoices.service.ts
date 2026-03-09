import { prisma } from "@/src/server/prisma";
import { ApiError } from "@/src/server/api-handler";
import { calculateInvoiceAmount } from "@/src/server/billing";
import type { GenerateInvoiceInput } from "./invoices.types";

export const generateInvoice = async (input: GenerateInvoiceInput) => {
  const client = await prisma.client.findUnique({
    where: { id: input.clientId },
    include: { plan: true },
  });
  if (!client) throw new ApiError("Client not found", 404);

  const { calculatedFee, finalFee } = calculateInvoiceAmount({
    adSpend: input.adSpend,
    feeRate: client.plan.feeRate,
    minimumFee: client.plan.minimumFee,
    discountPercent: client.discountPercent,
  });
  const billingMonthDate = new Date(input.billingMonth);
  const invoice = await prisma.invoice.create({
    data: {
      clientId: input.clientId,
      adSpend: input.adSpend,
      billingMonth: billingMonthDate,
      feeRateSnapshot: client.plan.feeRate,
      minimumFeeSnapshot: client.plan.minimumFee,
      discountSnapshot: client.discountPercent,
      calculatedFee,
      finalFee,
      status: "DRAFT",
    },
  });

  return invoice;
};
