'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leaderboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      player_2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score_player1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      score_player2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Leaderboards');
  }
};