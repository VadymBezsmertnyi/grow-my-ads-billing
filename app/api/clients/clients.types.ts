import type { z } from "zod";
import type {
  createClientSchema,
  listClientsQuerySchema,
  updateClientSchema,
} from "./clients.schemas";

export type CreateClientInputT = z.infer<typeof createClientSchema>;
export type ListClientsQueryT = z.infer<typeof listClientsQuerySchema>;
export type UpdateClientInputT = z.infer<typeof updateClientSchema>;
