const { DataType, DataTypes } = require('sequelize');
const sequelize = require('./../config/database');
const Review = sequelize.define('reviews', {
  reviews_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  rate: {
    type: DataTypes.TEXT,
  },
});

module.exports = Review;
