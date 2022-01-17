"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("articleReads", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      companyId: {
        type: Sequelize.UUID,
        references: {
          model: "companies",
          key: "id",
        },
      },
      articleId: {
        type: Sequelize.UUID,
        references: {
          model: "articles",
          key: "id",
        },
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
    return queryInterface.dropTable("articleReads");
  },
};
