const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductDetails = sequelize.define(
  'product_details',
  {
    product_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true },
);

module.exports = ProductDetails;
