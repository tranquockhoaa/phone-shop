const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

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
    file_name: {
      type: DataTypes.TEXT,
    },
    file_path: DataTypes.TEXT,
  },
  { timestamps: true },
);

module.exports = Image;
