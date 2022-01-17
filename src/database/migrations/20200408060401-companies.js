'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('companies', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      companyName: {
        type: Sequelize.STRING
      },
      brandColor: {
        defaultValue: '#047bd3',
        type: Sequelize.STRING
      },
      supportEmail: {
        type: Sequelize.STRING
      },
      subDomain: {
        type: Sequelize.STRING
      },
      customDomain: {
        type: Sequelize.STRING
      },
      websiteUrl: {
        type: Sequelize.STRING
      },
      styles: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('companies');
  }
};
