const express = require("express");
const TypePokemonController = require("../controllers/TypePokemonController");
const typeRoutes = express.Router();

typeRoutes.get("/type_pokemon", TypePokemonController.findOneOrListAll);
typeRoutes.get("/type_pokemon/:id", TypePokemonController.findOneOrListAll);
typeRoutes.post("/type_pokemon", TypePokemonController.create);
typeRoutes.put("/type_pokemon/:id", TypePokemonController.update);
typeRoutes.delete("/type_pokemon/:id", TypePokemonController.destroy);

module.exports = typeRoutes;