import { Router } from "express";
import pokemonController from "./pokemon-controllers";

const router = Router();

router.get("/", pokemonController.getPokemons);
router.get("/import", pokemonController.importPokemons);
router.get("/captured", pokemonController.getCapturedPokemons);
router.post("/capture", pokemonController.addCapturedPokemon);
router.delete("/capture/:id", pokemonController.removeCapturedPokemon);

export default router;
