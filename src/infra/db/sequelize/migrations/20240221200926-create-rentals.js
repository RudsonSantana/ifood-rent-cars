'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rentals', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      customer: {
        type: Sequelize.STRING,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      vehicle: {
        type: Sequelize.STRING,
        references: {
          model: 'vehicles',
          key: 'plate'
        }
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      rentalDays: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rentalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        references: {
          model: 'rental_status',
          key: 'status'
        }
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rentals');
  }
};
