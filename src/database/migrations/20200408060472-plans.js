"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("plans", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      planId: {
        unique:true,
        type: Sequelize.STRING,
      },
      planName: {
        type: Sequelize.STRING,
      },
      planDescription: {
        type: Sequelize.STRING,
      },
      billingAmmount: {
        type: Sequelize.STRING,
      },
      billingFrequency: {
        type: Sequelize.STRING,
      },
      notes: {
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
    return queryInterface.dropTable("plans");
  },
};
