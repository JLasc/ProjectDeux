module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true 
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    answerType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Question.associate = function(models) {
    Question.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Question;
};

