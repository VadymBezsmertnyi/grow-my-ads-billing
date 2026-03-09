import { prisma } from "@/src/server/prisma";

const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
};

export const getDashboardStats = async () => {
  const { start, end } = getCurrentMonthRange();

  const [activeClientsCount, invoices] = await Promise.all([
    prisma.client.count({ where: { isActive: true } }),
    prisma.invoice.findMany({
      where: {
        billingMonth: {
          gte: start,
          lt: end,
        },
      },
      select: { finalFee: true },
    }),
  ]);

  const totalInvoicedCurrentMonth = invoices.reduce(
    (sum, inv) => sum + inv.finalFee,
    0
  );
  const averageInvoiceAmountCurrentMonth =
    invoices.length > 0
      ? Math.round((totalInvoicedCurrentMonth / invoices.length) * 100) / 100
      : 0;

  return {
    activeClientsCount,
    totalInvoicedCurrentMonth: Math.round(totalInvoicedCurrentMonth * 100) / 100,
    averageInvoiceAmountCurrentMonth,
  };
};
