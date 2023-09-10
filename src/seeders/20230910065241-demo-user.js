'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
    // Fake các user cho databases
      {
      email: 'John Doe',
      password: '123',
      username:'fake1'
    },
    {
      email: 'John Doe',
      password: '123',
      username:'fake2'
    },
    {
      email: 'John Doe',
      password: '123',
      username:'fake3'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
