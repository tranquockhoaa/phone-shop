const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');
const Color = require('./color');

const Image = sequelize.define(
  'images',
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    color:{ type: DataTypes.TEXT}
  },
  { timestamps: true },
);

module.exports = Image;
