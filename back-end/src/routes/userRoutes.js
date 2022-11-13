const express = require("express");
const UserController = require("../controllers/UserController");
const userRoutes = express.Router();

userRoutes.get("/user", UserController.findOneOrListAll);
userRoutes.get("/user/:id", UserController.findOneOrListAll);
userRoutes.put("/user/:id", UserController.update);
userRoutes.delete("/user/:id", UserController.destroy);

userRoutes.get("/user/:userId/pokemon", UserController.pokemons);
userRoutes.post("/user/:userId/pokemon", UserController.associatePokemon);
userRoutes.delete("/user/:userId/pokemon/:pokemonId", UserController.disassociatePokemon);

module.exports = userRoutes;