import type { NextFunction, Request, Response } from "express";
import { PokemonService } from "./pokemon-service";
import { BadRequestException } from "../../types/exceptions/bad-request-exception";
import type Pokemon from "../../types/models/pokemon";
import { NotFoundException } from "../../types/exceptions/not-found-exception";
import { PokemonSearchQuerySchema } from "../../types/query/search-query";
import { pokemonQueryBuilder } from "../../types/query/pokemon-query";

class PokemonController {
  private pokemonService: PokemonService;
  public pokemons: Pokemon[] = [];
  public pokemosCaptured: Pokemon[] = [];

  constructor() {
    this.pokemonService = new PokemonService();
  }

  setPokemons = (data: Pokemon[]) => {
    this.pokemons = data;
  };

  setPokemonsCaptured = (data: Pokemon[]) => {
    this.pokemosCaptured = data;
  };

  addCapturedPokemon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      const { status } = await this.pokemonService.getPokemon(id);

      if (status !== 200)
        throw new BadRequestException("Error fetching pokemon");

      const pokemonIsCaptured = this.pokemosCaptured.find(
        (pokemon) => pokemon.id === id
      );

      if (pokemonIsCaptured)
        throw new BadRequestException("Pokemon already captured");

      const findPokemon = this.pokemons.find((pokemon) => pokemon.id === id);

      if (!findPokemon)
        throw new BadRequestException(`Pokemon ${id} not found`);

      if (this.pokemosCaptured.length === 6) {
        this.pokemosCaptured.shift();
        this.pokemosCaptured.push(findPokemon);
        res.status(200).json({ message: "Pokemon captured" });
        return;
      }

      findPokemon.captured = true;
      this.pokemosCaptured.push(findPokemon);

      res.status(200).json({ message: "Pokemon captured" });
    } catch (e) {
      next(e);
    }
  };

  getCapturedPokemons = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.status(200).json(this.pokemosCaptured);
    } catch (e) {
      next(e);
    }
  };

  importPokemons = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const { status, data } = await this.pokemonService.getPokemons(150);

      if (status !== 200)
        throw new BadRequestException("Error fetching pokemons");

      const { results } = data;

      const pokemons = await Promise.all(
        results.map(async (pokemon) => {
          const { name, url } = pokemon;
          const id = url.split("/")[6];

          const { data } = await this.pokemonService.getPokemon(id);

          const image = data.sprites.front_default;

          const isCaptured = this.pokemosCaptured.find(
            (pokemon) => pokemon.id === id
          );

          return {
            id,
            name,
            url,
            image,
            captured: !!isCaptured,
            types: data.types,
          };
        })
      );

      this.setPokemons(pokemons);

      res.status(200).json(pokemons);
    } catch (e) {
      next(e);
    }
  };

  removeCapturedPokemon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const findPokemon = this.pokemosCaptured.find(
        (pokemon) => pokemon.id === id
      );

      if (!findPokemon) throw new BadRequestException("Pokemon not found");

      findPokemon.captured = false;

      const updatedPokemonsCaptured = this.pokemosCaptured.filter(
        (pokemon) => pokemon.id !== id
      );
      this.setPokemonsCaptured(updatedPokemonsCaptured);

      res.status(200).json({ message: "Pokemon removed" });
    } catch (e) {
      next(e);
    }
  };

  searchPokemon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q: name, type, page } = PokemonSearchQuerySchema.parse(req.query);

      const filterPokemons = this.pokemons.filter((pokemon) => {
        const matchesName = pokemon.name
          .toLowerCase()
          .includes(name.toLowerCase());
        const matchesType = type
          ? pokemon.types.find((t) => t.type.name === type)
          : true;
        return matchesName && matchesType;
      });

      if (!filterPokemons) throw new NotFoundException("Pokemons not found");

      const changeStatusCaptured = filterPokemons.map((poekemon) => {
        const isCaptured = this.pokemosCaptured.find(
          (p) => p.id === poekemon.id
        );
        return {
          ...poekemon,
          captured: !!isCaptured,
        };
      });

      const limit = 10;
      const { totalPages } = pokemonQueryBuilder(
        changeStatusCaptured.length,
        limit
      );

      if (page > totalPages) throw new NotFoundException("Page not found");

      const results = changeStatusCaptured.slice(
        (page - 1) * limit,
        page * limit
      );

      res.status(200).json({
        page,
        totalPages,
        total: changeStatusCaptured.length,
        results,
      });
    } catch (e) {
      next(e);
    }
  };

  getTypes = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const { status, data } = await this.pokemonService.getTypes();

      if (status !== 200) throw new BadRequestException("Error fetching types");

      const soted = data.results.sort((a, b) => a.name.localeCompare(b.name));

      res.status(200).json(soted);
    } catch (e) {
      next(e);
    }
  };
}

const pokemonController = new PokemonController();

export default pokemonController;
