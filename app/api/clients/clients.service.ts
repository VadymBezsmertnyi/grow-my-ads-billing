import type { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/src/server/prisma";
import { ApiError } from "@/src/server/api-handler";
import type {
  CreateClientInputT,
  ListClientsQueryT,
  UpdateClientInputT,
} from "./clients.types";

export const createClient = async (input: CreateClientInputT) => {
  const subscriptionStartDate =
    input.subscriptionStartDate != null && input.subscriptionStartDate.trim()
      ? new Date(input.subscriptionStartDate)
      : null;

  const client = await prisma.client.create({
    data: {
      name: input.name,
      email: input.email,
      planId: input.planId,
      discountPercent: input.discountPercent ?? 0,
      isActive: input.isActive ?? true,
      isPaused: input.isPaused ?? false,
      subscriptionStartDate,
    },
  });
  return client;
};

export const listClients = async (query: ListClientsQueryT) => {
  const { page, limit, search, planId, isActive, isPaused } = query;
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
  if (isPaused !== undefined) where.isPaused = isPaused;

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

export const getClientById = async (id: string) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      plan: true,
      invoices: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!client) throw new ApiError("Client not found", 404);
  return client;
};

export const updateClient = async (id: string, input: UpdateClientInputT) => {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) throw new ApiError("Client not found", 404);

  const data: Prisma.ClientUncheckedUpdateInput = {};
  if (input.name !== undefined) data.name = input.name;
  if (input.email !== undefined) data.email = input.email;
  if (input.planId !== undefined) data.planId = input.planId;
  if (input.discountPercent !== undefined)
    data.discountPercent = input.discountPercent;
  if (input.isActive !== undefined) data.isActive = input.isActive;
  if (input.isPaused !== undefined) data.isPaused = input.isPaused;
  if (input.subscriptionStartDate !== undefined)
    data.subscriptionStartDate =
      input.subscriptionStartDate != null && input.subscriptionStartDate.trim()
        ? new Date(input.subscriptionStartDate)
        : null;

  return prisma.client.update({
    where: { id },
    data,
  });
};
