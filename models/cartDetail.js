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
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be more than one',
        },
        max: {
          args: [5],
          msg: 'Quantity must be less than or equal five',
        },
      },
    },
    unit_price: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: true },
);

module.exports = CartDetails;
