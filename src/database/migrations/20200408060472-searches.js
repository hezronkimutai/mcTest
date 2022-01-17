"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("searches", {
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
      term: {
        type: Sequelize.STRING,
      },
      success: {
        type: Sequelize.BOOLEAN,
      },
      count: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("searches");
  },
};
