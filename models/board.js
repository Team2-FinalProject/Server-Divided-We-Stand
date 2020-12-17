'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.belongsTo(models.Room)
    }
  };
  Board.init({
    juara: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notEmpty: {
          message: "Column Juara cannot be empty"
        }
      }
    },
    kalah: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        message: "Column kalah cannot be empty"
      }
    },
    RoomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};

// Leaderboards
// player_satu
// player_dua
// score_player1
// score_player2
// room