import type { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/src/server/prisma";
import type { ListInvoicesQueryT } from "./invoices.types";

export const listInvoices = async (query: ListInvoicesQueryT) => {
  const { page, limit, clientId, status } = query;
  const where: Prisma.InvoiceWhereInput = {};
  if (clientId !== undefined) where.clientId = clientId;
  if (status !== undefined) where.status = status;

  const [items, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.invoice.count({ where }),
  ]);
  const pagination = {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit) || 1,
  };
  return { items, pagination };
};
