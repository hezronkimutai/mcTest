"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("articles", {
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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "categories",
          key: "id",
        },
      },
      articleTitle: {
        type: Sequelize.STRING,
      },
      articleBody: {
        type: Sequelize.TEXT,
      },
      articleStatus: {
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
    return queryInterface.dropTable("articles");
  },
};
