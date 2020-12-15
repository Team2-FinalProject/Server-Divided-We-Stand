'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.TeamOne)
      Room.hasMany(models.TeamTwo)
      Room.belongsTo(models.Leaderboard)
    }
  };
  Room.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Name cannot be empty"
        }
      }
    },
    TeamOneId: DataTypes.INTEGER,
    TeamTwoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};