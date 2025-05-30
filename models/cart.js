const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Cart = sequelize.define(
  'carts',
  {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    status: {
      type: DataTypes.ENUM('INACTIVE','ACTIVE','ORDERED','CANCELLED'),
      defaultValue:'INACTIVE',
      allowNull:false
    },
  },
  { timestamps: true },
);

module.exports = Cart;
