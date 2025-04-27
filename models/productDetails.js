const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const ProductDetails = sequelize.define(
  'product_details',
  {
    product_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    pubmetadata: {
      type: DataTypes.JSON,
    },
  },
  { timestamps: true, underscored: true },
);

module.exports = ProductDetails;
