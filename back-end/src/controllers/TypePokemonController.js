const db = require("../models/index.js");
const TypePokemonModel = db.Type_Pokemon;

class TypePokemonController {
    create = async (req, res, next) => {
        try {
            const type = await TypePokemonModel.create(req.body);

            res.status(201);
            return res.json(type);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    findOneOrListAll = async (req, res, next) => {
        let id = req.params.id;
        try {
            const types = id ? await TypePokemonModel.findOne({ where: { id: id } }) || {} : await TypePokemonModel.findAll();

            res.status(200);
            return res.json(types);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    update = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await TypePokemonModel.findByPk(id)) throw "Not found";
            await TypePokemonModel.update(req.body, { where: { id: id } });
            const type = await TypePokemonModel.findByPk(id);

            res.status(200);
            return res.json(type);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    destroy = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await TypePokemonModel.findByPk(id)) throw "Not found";
            await TypePokemonModel.destroy({ where: { id: id } });

            res.status(204).end();
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new TypePokemonController;