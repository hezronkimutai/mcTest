"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("portfolioDetails", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      portfolioId: {
        type: Sequelize.UUID,
        references: {
          model: "portfolios",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING,
      },
      quote: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      salutation: {
        type: Sequelize.STRING,
      },
      resumeLink: {
        type: Sequelize.STRING,
      },
      imgUrl: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable("portfolioDetails");
  },
};
