const express = require("express");
const UserController = require("../controllers/UserController");
const userRoutes = express.Router();

userRoutes.get("/user", UserController.findOneOrListAll);
userRoutes.get("/user/:id", UserController.findOneOrListAll);
userRoutes.put("/user/:id", UserController.update);
userRoutes.delete("/user/:id", UserController.destroy);

module.exports = userRoutes;