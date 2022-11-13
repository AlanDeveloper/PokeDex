'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_Pokemons extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
            this.belongsTo(models.Pokemon, { foreignKey: 'pokemonId', as: 'pokemon' });
            this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    User_Pokemons.init({
        userId: DataTypes.INTEGER,
        pokemonId: DataTypes.INTEGER
    }, {
        sequelize,
        paranoid: true,
        deletedAt: 'deletedAt',
        modelName: 'User_Pokemons',
    });
    User_Pokemons.removeAttribute("id");
    return User_Pokemons;
};