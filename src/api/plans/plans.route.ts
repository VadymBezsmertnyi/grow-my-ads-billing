import { apiHandler } from "@/src/lib/api-handler";
import { listPlans } from "./plans.service";

export const GET = async () => apiHandler(async () => listPlans());
