module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true 
      }
    });
    return Game;
  };
  