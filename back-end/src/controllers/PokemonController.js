const db = require("../models/index.js");
const PokemonModel = db.Pokemon;

class PokemonController {
    create = async (req, res, next) => {
        try {
            const pokemon = await PokemonModel.create(req.body);

            res.status(201);
            return res.json(pokemon);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    findOneOrListAll = async (req, res, next) => {
        let id = req.params.id;
        try {
            const pokemons = id ? await PokemonModel.findOne({ where: { id: id } }) || {} : await PokemonModel.findAll();

            res.status(200);
            return res.json(pokemons);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    update = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await PokemonModel.findByPk(id)) throw "Not found";
            await PokemonModel.update(req.body, { where: { id: id } });
            const pokemon = await PokemonModel.findByPk(id);

            res.status(200);
            return res.json(pokemon);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    destroy = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await PokemonModel.findByPk(id)) throw "Not found";
            await PokemonModel.destroy({ where: { id: id } });

            res.status(204).end();
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new PokemonController;