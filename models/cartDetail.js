const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartDetails = sequelize.define(
  'cart_details',
  {
    cart_detail_id: {
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
