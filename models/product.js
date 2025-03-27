const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    product_detail_id: {
      type: DataTypes.INTEGER,
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = Product;
