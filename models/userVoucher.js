const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');
const UserVoucher = sequelize.define('user_voucher', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = UserVoucher;
