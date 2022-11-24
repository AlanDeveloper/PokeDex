'use strict';

/** @type {import('sequelize-cli').Migration} */
const db = require("../../models/index.js");
const TypePokemonModel = db.Type_Pokemon;
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
        const types = await TypePokemonModel.findAll();
        await queryInterface.bulkInsert('Pokemons', [
            {
                name: 'Zubat',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Rattata',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Pidgey',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Spearow',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Goldeen',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Nidoran',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Sandshrew',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Psyduck',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Arbok',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Magmar',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Machamp',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Persian',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Meowth',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Tauros',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Venusaur',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Ditto',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Vulpix',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Articuno',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Caterpie',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Metapod',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
{
                name: 'Blastoise',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Wartortle',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Squirtle',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Charizard',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Charmeleon',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Charmander',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Ivysaur',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Bulbasaur',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Butterfree',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Weedle',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Kakuna',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Beedril',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Pidgeotto',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Pidgeot',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Raticate',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Golem',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Fearow',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Ekans',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Pikachu',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Raichu',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Sandslash',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Nidorino',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Nidoking',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Arcanine',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Poliwag',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Poliwhirl',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Poliwrath',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Abra',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Kadabra',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Alakazam',
                typeId: types[Math.floor(Math.random() * types.length)].id,
                createdAt: date,
                updatedAt: date
            },
        ], {});
    },
    
    async down (queryInterface, Sequelize) {
        /**
        * Add commands to revert seed here.
        *
        * Example:
        * await queryInterface.bulkDelete('People', null, {});
        */
        await queryInterface.bulkDelete('Pokemons', null, {});
    }
};
