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

    name: {
      type: DataTypes.TEXT,
      unique: true,
    },


  },
  { timestamps: true, underscored: true },
);

module.exports = ReviewImage;
