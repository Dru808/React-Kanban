/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Cards = sequelize.define("Cards", {
    title: DataTypes.STRING,
    card_id: DataTypes.INTEGER,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    created_by: DataTypes.STRING,
    assigned_to: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // Cards.belongsTo(models.User);
      }
    }
  });

  return Cards;
};