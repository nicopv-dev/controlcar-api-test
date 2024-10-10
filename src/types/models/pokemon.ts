export default interface Pokemon {
  id: string;
  name: string;
  url: string;
  captured: boolean;
  image: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  types: PokemonType[];
  sprites: {
    back_default: string;
    front_default: string;
  };
}
