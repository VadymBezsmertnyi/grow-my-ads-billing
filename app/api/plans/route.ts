import { apiHandler } from "@/src/server/api-handler";
import { listPlans } from "./plans.service";

export const GET = async () => apiHandler(async () => listPlans());
