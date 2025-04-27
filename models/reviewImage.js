const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const ReviewImage = sequelize.define(
  'review_image',
  {
    review_image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    code: {
      type: DataTypes.TEXT,
      unique: true,
    },

    image_type: {
      type: DataTypes.ENUM('product'),
    },
    file_name: {
      type: DataTypes.TEXT,
    },

    file_path: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true, underscored: true },
);

module.exports = ReviewImage;
