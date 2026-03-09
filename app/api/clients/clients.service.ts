import type { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/src/lib/prisma";
import type { CreateClientInput, ListClientsQuery } from "./clients.types";

export const createClient = async (input: CreateClientInput) => {
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

export const listClients = async (query: ListClientsQuery) => {
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
