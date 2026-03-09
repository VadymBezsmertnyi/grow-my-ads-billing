import { prisma } from "@/src/lib/prisma";
import type { CreateClientInput } from "./clients.types";

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
