'use strict';

const bcrypt = require('bcrypt');
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
        const salt = await bcrypt.genSaltSync();
        const password = await bcrypt.hashSync('12345', salt);
        const date = new Date();
        await queryInterface.bulkInsert('Users', [{
            name: 'Admin',
            email: 'admin@gmail.com',
            username: 'admin',
            admin: true,
            password: password,
            createdAt: date,
            updatedAt: date
        }], {});
    },
    
    async down (queryInterface, Sequelize) {
        /**
        * Add commands to revert seed here.
        *
        * Example:
        * await queryInterface.bulkDelete('People', null, {});
        */
        await queryInterface.bulkDelete('Users', null, {});  
    }
};
