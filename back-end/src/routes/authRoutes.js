const express = require("express");
const AuthController = require("../controllers/AuthController");
const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/signup", AuthController.signup);

module.exports = authRoutes;