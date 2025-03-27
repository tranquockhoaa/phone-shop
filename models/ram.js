const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ram = sequelize.define('ram', {
  ram_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  size: {
    type: DataTypes.TEXT,
    unique: true,
  },
});

module.exports = Ram;
