const db = require("../models/index.js");
const UserModel = db.User;
const UserPokemonModel = db.User_Pokemons;

class UserController {
    findOneOrListAll = async (req, res, next) => {
        let id = req.params.id;
        try {
            const users = id ? await UserModel.findOne({ where: { id: id } }) || {} : await UserModel.findAll();

            res.status(200);
            return res.json(users);
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
        let userId = req.params.userId;
        try {   
            if (!await UserModel.findByPk(userId)) throw "Not found";

            const userPokemon = await UserModel.findOne({ where: { id: userId }, include: { model: db.User_Pokemons, as: 'pokemons', include: { model: db.Pokemon, as: 'pokemon' } } });

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
        let { userId, pokemonId } = req.params;
        try {
            if (!await UserModel.findByPk(userId)) throw "Not found";
            await UserPokemonModel.destroy({ where: { userId: userId, pokemonId: pokemonId } });

            res.status(204).end();
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new UserController;