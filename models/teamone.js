'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamOne extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamOne.belongsTo(models.Room)
    }
  };
  TeamOne.init({
    player1: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Player cannot be empty"
        }
      }
    },
    player2: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Player cannot be empty"
        }
      }
    },
    player3: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Player cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TeamOne',
  });
  return TeamOne;
};