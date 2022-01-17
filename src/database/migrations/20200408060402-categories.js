"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("categories", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      categoryName: {
        type: Sequelize.STRING,
      },
      companyId: {
        type: Sequelize.UUID,
        references: {
          model: "companies",
          key: "id",
        },
      },
      categoryDescription: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("categories");
  },
};
