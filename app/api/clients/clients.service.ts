import type { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/src/server/prisma";
import type { CreateClientInputT, ListClientsQueryT } from "./clients.types";

export const createClient = async (input: CreateClientInputT) => {
  const client = await prisma.client.create({
    data: {
      name: input.name,
      email: input.email,
      planId: input.planId,
      discountPercent: input.discountPercent ?? 0,
    },
  });
  return client;
};

export const listClients = async (query: ListClientsQueryT) => {
  const { page, limit, search, planId, isActive } = query;
  const where: Prisma.ClientWhereInput = {};
  if (search && search.trim()) {
    const term = search.trim();
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
    ];
  }
  if (planId !== undefined) where.planId = planId;
  if (isActive !== undefined) where.isActive = isActive;

  const [items, total] = await Promise.all([
    prisma.client.findMany({
      where,
      include: { plan: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.client.count({ where }),
  ]);
  const pagination = {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit) || 1,
  };
  return { items, pagination };
};
