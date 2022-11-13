'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Pokemons', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(125),
                unique: true,
                allowNull: false
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Type_Pokemons', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Pokemons');
    }
};