const db = require("../models/index.js");
const UserModel = db.User;
const UserPokemonModel = db.User_Pokemons;

class UserController {
    findOneOrListAll = async (req, res, next) => {
        let { id } = req.params;
        let { orderby = "name", offset = 0, limit = 25 } = req.query;
        orderby = [[orderby, "asc"], ["id", "asc"]];
        try {
            const users = id ? await UserModel.findOne({ where: { id: id } }) || {} : await UserModel.findAll({ order: orderby, limit, offset });
            const response = id ? users : { total: (await UserModel.findAll({ order: orderby })).length, offset, limit, users };

            res.status(200);
            return res.json(response);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    update = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await UserModel.findByPk(id)) throw "Not found";
            await UserModel.update(req.body, { where: { id: id } });
            const user = await UserModel.findByPk(id);

            res.status(200);
            return res.json(user);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    destroy = async (req, res, next) => {
        let id = req.params.id;
        try {
            if (!await UserModel.findByPk(id)) throw "Not found";
            await UserModel.destroy({ where: { id: id } });

            res.status(204).end();
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    pokemons = async (req, res, next) => {
        let { userId } = req.params;
        let { offset = 0, limit = 25 } = req.query;
        try {   
            if (!await UserModel.findOne({ where: { id: userId }})) throw "Not found";

            const userPokemon = await UserPokemonModel.findAll({ where: { userId: userId }, offset, limit, include: { model: db.Pokemon, as: "pokemon", include: { model: db.Type_Pokemon, as: "type_pokemon" } } });

            res.status(200);
            return res.json(userPokemon);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    associatePokemon = async (req, res, next) => {
        let userId = req.params.userId;
        try {   
            if (!await UserModel.findByPk(userId)) throw "Not found";

            const userPokemon = await UserPokemonModel.create({
                userId: userId,
                pokemonId: req.body.pokemonId
            });

            res.status(201);
            return res.json(userPokemon);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    disassociatePokemon = async (req, res, next) => {
        let id = req.params.id;
        try {
            await UserPokemonModel.destroy({ where: { id: id } });

            res.status(204).end();
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new UserController;