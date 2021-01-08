"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "085e1ba1-8560-45b2-a43b-9205e02c48d2",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          createdAt: "2021-01-08T11:31:54.508Z",
          updatedAt: "2021-01-08T11:31:54.508Z",
        },
        {
          uuid: "7f167848-3948-416a-ba85-0a422017da86",
          name: "Jane Doe",
          email: "jane@example.com",
          role: "admin",
          createdAt: "2021-01-08T11:31:43.281Z",
          updatedAt: "2021-01-08T11:31:43.281Z",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
