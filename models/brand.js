const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Brand = sequelize.define(
  'brands',
  {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    infomation: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true },
);
module.exports = Brand;
