import { prisma } from "@/src/server/prisma";

import type { PlanListItemT } from "./plans.types";

export const listPlans = async (): Promise<PlanListItemT[]> =>
  prisma.plan.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" },
  });
