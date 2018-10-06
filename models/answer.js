module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define("Answer", {
        response: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        correct : {
            type: DataTypes.BOOLEAN
        }
    });
    Answer.associate = function(models) {
        Answer.belongsTo(models.Question, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Answer;
};