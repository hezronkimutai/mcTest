"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("likes", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      articleId: {
        type: Sequelize.UUID,
        references: {
          model: "articles",
          key: "id",
        },
      },
      like: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable("likes");
  },
};
