const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Product = sequelize.define(
  'products',
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    
    code: { type: DataTypes.TEXT },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = Product;
