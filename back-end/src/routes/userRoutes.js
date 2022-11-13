const express = require("express");
const UserController = require("../controllers/UserController");
const userRoutes = express.Router();

userRoutes.get("/user", UserController.findOneOrListAll);
userRoutes.get("/user/:id", UserController.findOneOrListAll);
userRoutes.put("/user/:id", UserController.update);
userRoutes.delete("/user/:id", UserController.destroy);

userRoutes.get("/user/:id/pokemon", UserController.pokemons);
userRoutes.post("/user/:id/pokemon", UserController.associatePokemon);

module.exports = userRoutes;