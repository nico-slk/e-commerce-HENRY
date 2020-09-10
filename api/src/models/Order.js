var Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    orderStatus: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["carrito", "creada", "procesando", "cancelada", "completa"]],
      },
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    checkoutDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
