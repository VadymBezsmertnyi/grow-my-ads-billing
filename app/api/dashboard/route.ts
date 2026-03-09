import { apiHandler } from "@/src/server/api-handler";
import { getDashboardStats } from "./dashboard.service";

export const GET = async () =>
  apiHandler(async () => getDashboardStats());
