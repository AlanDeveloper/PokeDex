const db = require("../models/index.js");
const TypePokemonModel = db.Type_Pokemon;
const UserModel = db.User;

class TypePokemonController {
    create = async (req, res, next) => {
        try {
            let user = await UserModel.findOne({ where: { id: req.id } });
            if (!user.dataValues.admin) throw "This user does not have permission for this action.";
            const type = await TypePokemonModel.create(req.body);

            res.status(201);
            return res.json(type);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    findOneOrListAll = async (req, res, next) => {
        let { id } = req.params;
        let { orderby = "name", offset = 0, limit = 25 } = req.query;
        orderby = [[orderby, "asc"], ["id", "asc"]];
        try {
            const types = id ? await TypePokemonModel.findOne({ where: { id: id } }) || {} : await TypePokemonModel.findAll({ order: orderby, limit, offset });

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
            let user = await UserModel.findOne({ where: { id: req.id } });
            if (!user.dataValues.admin) throw "This user does not have permission for this action.";
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
            let user = await UserModel.findOne({ where: { id: req.id } });
            if (!user.dataValues.admin) throw "This user does not have permission for this action.";
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