import { Router } from "express";
import pokemonController from "./pokemon-controllers";

const router = Router();

router.get("/import", pokemonController.importPokemons);
router.get("/search", pokemonController.searchPokemon);
router.get("/captured", pokemonController.getCapturedPokemons);
router.post("/capture", pokemonController.addCapturedPokemon);
router.delete("/capture/:id", pokemonController.removeCapturedPokemon);
router.get("/types", pokemonController.getTypes);

export default router;
