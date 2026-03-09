import { prisma } from "@/src/server/prisma";

export const listPlans = async () =>
  prisma.plan.findMany({
    orderBy: { createdAt: "asc" },
  });
