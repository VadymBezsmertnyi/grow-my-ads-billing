import type { z } from "zod";
import type {
  createClientSchema,
  listClientsQuerySchema,
} from "./clients.schemas";

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type ListClientsQuery = z.infer<typeof listClientsQuerySchema>;
