import type { z } from "zod";
import type { createClientSchema } from "./clients.schemas";

export type CreateClientInput = z.infer<typeof createClientSchema>;
