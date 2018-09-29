module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define("Answer", {
        response: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
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