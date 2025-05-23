const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Color = sequelize.define(
  'colors',
  {
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true },
);

module.exports = Color;
