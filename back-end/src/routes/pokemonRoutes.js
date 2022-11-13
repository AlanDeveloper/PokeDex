const express = require("express");
const PokemonController = require("../controllers/PokemonController");
const pokemonRoutes = express.Router();

pokemonRoutes.get("/pokemon", PokemonController.findOneOrListAll);
pokemonRoutes.get("/pokemon/:id", PokemonController.findOneOrListAll);
pokemonRoutes.post("/pokemon", PokemonController.create);
pokemonRoutes.put("/pokemon/:id", PokemonController.update);
pokemonRoutes.delete("/pokemon/:id", PokemonController.destroy);

module.exports = pokemonRoutes;