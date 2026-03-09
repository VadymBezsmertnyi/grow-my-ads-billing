import { apiHandler } from "@/src/lib/api-handler";
import { createClientSchema } from "./clients.schemas";
import { createClient } from "./clients.service";

export const POST = async (request: Request) =>
  apiHandler(
    async () => {
      const body = createClientSchema.parse(await request.json());
      return createClient(body);
    },
    { successStatus: 201 }
  );
