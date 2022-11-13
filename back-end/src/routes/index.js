const express = require("express");
const authRoutes = require("./authRoutes");
const typeRoutes = require("./typeRoutes");
const pokemonRoutes = require("./pokemonRoutes");
const userRoutes = require("./userRoutes");
const auth = require("../middlewares/auth");
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({sucesso: true}); 
});
routes.use("/", authRoutes);
routes.use("/", auth, typeRoutes);
routes.use("/", auth, pokemonRoutes);
routes.use("/", auth, userRoutes);

// NOT FOUND
routes.use(function (req, res, next) {
    res.status(404);
    return res.json({ error: { message: "The webpage you're trying to reach can't be found." } });
});

module.exports = routes;