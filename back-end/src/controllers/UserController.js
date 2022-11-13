const db = require("../models/index.js");
const UserModel = db.User;

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
}

module.exports = new UserController;