import { pokeapi } from "../../lib/axios";
import { PokemonDetails } from "../../types/models/pokemon";
import PokemonResponse from "../../types/response/pokemon-response";
import { AxiosResponse } from "axios";

export class PokemonService {
  /**
   * Fetches a paginated list of Pokemons from the Pokemon API.
   *
   * @param {number} [limit=20] - The number of Pokemons to fetch per page. Defaults to 20.
   * @param {number} [offset=0] - The offset to start fetching Pokemons from. Defaults to 0.
   * @returns {Promise<PokemonResponse>} - A promise that resolves to the response from the Pokemon API.
   */
  getPokemons = async (
    limit = 20,
    offset = 0
  ): Promise<AxiosResponse<PokemonResponse, any>> => {
    const response = await pokeapi.get<PokemonResponse>("/pokemon", {
      params: {
        limit,
        offset,
      },
    });
    return response;
  };

  getPokemon = async (id: string) =>
    await pokeapi.get<PokemonDetails>(`/pokemon/${id}`);

  getTypes = async () =>
    await pokeapi.get<{
      results: Array<{
        name: string;
        url: string;
      }>;
    }>("/type");
}

const pokemonService = new PokemonService();

export default pokemonService;
