"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("subscriptions", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      subscriptionId: {
        type: Sequelize.STRING,
      },
      planId: {
        type: Sequelize.STRING,
        references: {
          model: "plans",
          key: "planId",
        },
      },
      subscriptionLink: {
        type: Sequelize.STRING,
      },
      CustomerId: {
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      nextDueOn: {
        type: Sequelize.STRING,
      },
      status: {
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
    return queryInterface.dropTable("subscriptions");
  },
};
