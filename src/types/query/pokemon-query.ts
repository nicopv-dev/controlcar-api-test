import z from "zod";

export const PokemonQuerySchema = z.object({
  page: z.preprocess((val) => {
    if (!val) return 1;

    Number(z.string().parse(val));
  }, z.number().optional().default(1)),
  name: z.string().optional(),
  type: z.string().optional(),
});

export type PokemonQuery = z.infer<typeof PokemonQuerySchema>;

export const pokemonQueryBuilder = (totalResults: number, limit: number) => {
  const totalPages = Math.ceil(totalResults / limit);

  return {
    totalPages,
  };
};
