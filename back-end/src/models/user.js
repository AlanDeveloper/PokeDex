'use strict';
const bcrypt = require('bcrypt');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
            this.hasMany(models.User_Pokemons, { foreignKey: 'userId', as: 'pokemons' });
        }
    }
    User.init({
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.BOOLEAN
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSaltSync();
                user.password = await bcrypt.hashSync(user.password, salt);
            }
        },
        sequelize,
        paranoid: true,
        deletedAt: 'deletedAt',
        modelName: 'User',
    });
    return User;
};