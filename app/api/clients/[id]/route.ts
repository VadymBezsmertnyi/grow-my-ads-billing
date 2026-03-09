import { apiHandler } from "@/src/server/api-handler";
import { updateClientSchema } from "../clients.schemas";
import { getClientById, updateClient } from "../clients.service";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) =>
  apiHandler(async () => {
    const { id } = await params;
    return getClientById(id);
  });

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) =>
  apiHandler(async () => {
    const { id } = await params;
    const body = updateClientSchema.parse(await request.json());
    return updateClient(id, body);
  });
