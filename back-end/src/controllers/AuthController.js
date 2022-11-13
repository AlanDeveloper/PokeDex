const bcrypt = require('bcrypt');

class AuthController {

    login = (req, res, next) => {
        let { username, email, password } = req.body;

        try {
            if (bcrypt.compareSync(password, '1234')) {

                res.status(200);
                return res.json({ sucess: true });
            } else {
                const err = new Error("Password incorrect.");
                return next(err);
            }
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    signup = (req, res, next) => {
        try {
            res.status(201);
            return res.json({});
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new AuthController;