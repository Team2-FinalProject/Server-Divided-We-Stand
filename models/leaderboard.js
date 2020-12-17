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
    player_1: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Player 1 cannot be empty"
        }
      }
    },
    player_2: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Player 2 cannot be empty"
        }
      }
    },
    score_player1: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          message: "Score must be number"
        }
      }
    },
    score_player2: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          message: "Score must be number"
        }
      }
    },
    room: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};