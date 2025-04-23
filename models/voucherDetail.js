const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const VoucherDetail = sequelize.define('voucher_type', {
  voucher_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.TEXT,
  },

  type: {
    type: DataTypes.TEXT,
  },

  discount_value: {
    type: DataTypes.INTEGER,
  },
});

module.exports = VoucherDetail;
