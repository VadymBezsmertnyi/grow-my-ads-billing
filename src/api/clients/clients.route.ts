import { NextResponse } from "next/server";
import { createClientSchema } from "./clients.schemas";
import { createClient } from "./clients.service";

export const POST = async (request: Request) => {
  const body = createClientSchema.parse(await request.json());
  const client = await createClient(body);
  return NextResponse.json(client);
};
