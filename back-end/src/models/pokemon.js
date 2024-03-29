'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pokemon extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
            this.belongsTo(models.Type_Pokemon, { foreignKey: 'typeId', as: 'type_pokemon' });
        }
    }
    Pokemon.init({
        name: DataTypes.STRING,
        typeId: DataTypes.INTEGER
    }, {
        sequelize,
        paranoid: true,
        deletedAt: 'deletedAt',
        modelName: 'Pokemon',
    });
    return Pokemon;
};