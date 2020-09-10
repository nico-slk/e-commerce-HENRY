var Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};