'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rental_status', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('rental_status', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rental_status');
  }
};