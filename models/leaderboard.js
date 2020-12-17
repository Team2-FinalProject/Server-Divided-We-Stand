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
      Leaderboard.belongsTo(models.Room)
    }
  };
  Leaderboard.init({
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
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};