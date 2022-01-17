'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('socialMediaLinks', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
        references: {  
          model: 'users',
          key: 'id'
        }
      },
      companyId: {
        type: Sequelize.UUID,
        references: {  
          model: 'companies',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING
      },
      link: {
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
    return queryInterface.dropTable('socialMediaLinks');
  }
};
