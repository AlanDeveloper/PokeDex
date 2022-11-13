'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Type_Pokemon extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
            this.hasMany(models.Pokemon, { foreignKey: 'typeId', as: 'pokemon' });
        }
    }
    Type_Pokemon.init({
        name: DataTypes.STRING,
        status: DataTypes.BOOLEAN
    }, {
        sequelize,
        paranoid: true,
        deletedAt: 'deletedAt',
        modelName: 'Type_Pokemon',
    });
    return Type_Pokemon;
};