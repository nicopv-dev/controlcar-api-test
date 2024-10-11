import { z } from "zod";

export const PokemonSearchQuerySchema = z.object({
  page: z.preprocess((val) => {
    if (!val) return 1;

    return Number(val);
  }, z.number().optional().default(1)),
  q: z.string().default(""),
  type: z.string().default(""),
});
