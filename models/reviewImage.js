const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const ReviewImage = sequelize.define('review_image', {
  ReviewImage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  code: {
    type: DataTypes.TEXT,
    unique: true,
  },

  file_name: {
    type: DataTypes.TEXT,
  },

  file_path: {
    type: DataTypes.TEXT,
  },
});

module.exports = ReviewImage;