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

    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.TEXT,
    },
    pubmetadata: {
      type: DataTypes.JSON,
    },
  },
  { timestamps: true, underscored: true },
);

module.exports = ProductDetails;
