const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartDetails = sequelize.define(
  'cartDetails',
  {
    cartDetails_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unit_price: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: true },
);

module.exports = CartDetails;
