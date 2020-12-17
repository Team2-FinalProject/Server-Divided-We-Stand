'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Leaderboard.init({
    player_satu: DataTypes.STRING,
    player_dua: DataTypes.STRING,
    score_player1: DataTypes.INTEGER,
    score_player2: DataTypes.INTEGER,
    room: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};