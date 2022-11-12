const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({sucesso: true}); 
});

// NOT FOUND
routes.use(function (req, res, next) {
    res.status(404);
    return res.json({ error: { message: "The webpage you're trying to reach can't be found." } });
});

module.exports = routes;