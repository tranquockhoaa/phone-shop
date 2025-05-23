const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Memory = sequelize.define('memories', {
  memory_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  storage_size: {
    type: DataTypes.TEXT,
  },
  ram_size: {
    type: DataTypes.TEXT,
  },

});

module.exports = Memory;
