import { z } from "zod";

export const PokemonSearchQuerySchema = z.object({
  q: z.string().default(""),
  type: z.string().default(""),
});
