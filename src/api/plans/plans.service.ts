import { prisma } from "@/src/lib/prisma";

export const listPlans = async () =>
  prisma.plan.findMany({
    orderBy: { createdAt: "asc" },
  });
