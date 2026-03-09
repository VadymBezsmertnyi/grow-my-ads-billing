import type { z } from "zod";
import type { createClientSchema } from "./clients.schemas";
import type { listClientsQuerySchema } from "./clients.query.schemas";

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type ListClientsQuery = z.infer<typeof listClientsQuerySchema>;
