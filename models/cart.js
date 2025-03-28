const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define(
  'carts',
  {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true },
);

module.exports = Cart;
