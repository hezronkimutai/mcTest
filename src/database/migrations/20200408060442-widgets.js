"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("widgets", {
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
      widgetLauncherIconColor: {
        defaultValue: "#047bd3",
        type: Sequelize.STRING,
      },
      widgetLauncherBackgroundColor: { type: Sequelize.STRING },
      widgetNavbarColor2: { defaultValue: "#047bd3", type: Sequelize.STRING },
      widgetNavbarColor1: { defaultValue: "#047bd3", type: Sequelize.STRING },
      widgetPrimaryColor: { defaultValue: "#047bd3", type: Sequelize.STRING },
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
    return queryInterface.dropTable("widgets");
  },
};
