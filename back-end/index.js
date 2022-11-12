const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");

require("dotenv").config(); // Habilita variáveis de ambiente
// require("./src/config/database");

const app = express();
app.use(cors());
app.disable("etag"); // Ajusta o HTTP code

app.use(express.json()); // Transforma solicitações em JSON
app.use("/api", routes);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["GET", "POST"]);

    next();
}); // Habilita o CORS

app.listen(process.env.PORT || 8080, () => {
    console.log(`Express started at in ${process.env.PORT || 8080}`);
});