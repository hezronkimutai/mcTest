'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('imageUrls', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      companyId: {
        type: Sequelize.UUID,
        references: {  
          model: 'companies',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        references: {  
          model: 'users',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING
      },
      url: {
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
    return queryInterface.dropTable('imageUrls');
  }
};
