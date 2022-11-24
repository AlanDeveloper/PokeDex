'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        /**
        * Add seed commands here.
        *
        * Example:
        * await queryInterface.bulkInsert('People', [{
        *   name: 'John Doe',
        *   isBetaMember: false
        * }], {});
        */
        const date = new Date();
        await queryInterface.bulkInsert('Type_Pokemons', [
            {
                name: 'Água',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Fogo',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Normal',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Grama',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Voador',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Lutador',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Veneno',
                status: true,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Elétrico',
                status: true,
                createdAt: date,
                updatedAt: date
            }
        ], {});
    },
    
    async down (queryInterface, Sequelize) {
        /**
        * Add commands to revert seed here.
        *
        * Example:
        * await queryInterface.bulkDelete('People', null, {});
        */
        await queryInterface.bulkDelete('Type_Pokemons', null, {});  
    }
};
