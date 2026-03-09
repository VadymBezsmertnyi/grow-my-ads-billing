import { ApiError } from "@/src/server/api-handler";
import { getClientById } from "@/app/api/clients/clients.service";

type ClientT = Awaited<ReturnType<typeof getClientById>>;

export const fetchClientOrNull = async (
  id: string
): Promise<ClientT | null> => {
  try {
    return await getClientById(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
};
