import { apiHandler } from "@/src/lib/api-handler";
import { createClientSchema } from "./clients.schemas";
import { listClientsQuerySchema } from "./clients.query.schemas";
import { createClient, listClients } from "./clients.service";

export const GET = async (request: Request) =>
  apiHandler(async () => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    const query = listClientsQuerySchema.parse(params);
    return listClients(query);
  });

export const POST = async (request: Request) =>
  apiHandler(
    async () => {
      const body = createClientSchema.parse(await request.json());
      return createClient(body);
    },
    { successStatus: 201 }
  );
