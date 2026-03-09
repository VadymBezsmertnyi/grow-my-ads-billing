import { prisma } from "@/src/server/prisma";
import { ApiError } from "@/src/server/api-handler";
import { calculateInvoiceAmount } from "@/src/server/billing";
import type { GenerateInvoiceInputT } from "./invoices.types";

export const generateInvoice = async (input: GenerateInvoiceInputT) => {
  const client = await prisma.client.findUnique({
    where: { id: input.clientId },
    include: { plan: true },
  });
  if (!client) throw new ApiError("Client not found", 404);
  if (client.isPaused)
    throw new ApiError(
      "Cannot generate invoice for paused subscription. Unpause the client first.",
      400
    );

  const billingMonthDate = new Date(input.billingMonth);
  const startOfMonth = new Date(
    billingMonthDate.getFullYear(),
    billingMonthDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    billingMonthDate.getFullYear(),
    billingMonthDate.getMonth() + 1,
    1
  );

  const existing = await prisma.invoice.findFirst({
    where: {
      clientId: input.clientId,
      billingMonth: { gte: startOfMonth, lt: endOfMonth },
    },
  });
  if (existing)
    throw new ApiError(
      "Invoice already exists for this client and billing month",
      400
    );

  const invoiceCount = await prisma.invoice.count({
    where: { clientId: input.clientId },
  });
  const isFirstInvoice = invoiceCount === 0;

  let feeRate = client.plan.feeRate;
  let minimumFee = client.plan.minimumFee;

  if (
    isFirstInvoice &&
    client.subscriptionStartDate &&
    client.subscriptionStartDate >= startOfMonth &&
    client.subscriptionStartDate < endOfMonth
  ) {
    const year = startOfMonth.getFullYear();
    const month = startOfMonth.getMonth();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = client.subscriptionStartDate.getDate();
    const remainingDaysInMonth = totalDaysInMonth - startDay + 1;
    const prorationRatio = remainingDaysInMonth / totalDaysInMonth;
    feeRate *= prorationRatio;
    minimumFee *= prorationRatio;
  }

  const { calculatedFee, finalFee } = calculateInvoiceAmount({
    adSpend: input.adSpend,
    feeRate,
    minimumFee,
    discountPercent: client.discountPercent,
  });
  const invoice = await prisma.invoice.create({
    data: {
      clientId: input.clientId,
      adSpend: input.adSpend,
      billingMonth: startOfMonth,
      feeRateSnapshot: feeRate,
      minimumFeeSnapshot: minimumFee,
      discountSnapshot: client.discountPercent,
      calculatedFee,
      finalFee,
      status: "DRAFT",
    },
  });

  return invoice;
};
