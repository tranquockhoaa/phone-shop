const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Payment = sequelize.define('payments', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('QR', 'COD'), // CHỈ CHO PHÉP 2 GIÁ TRỊ NÀY
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
  },
  transaction_code: {
    type: DataTypes.STRING,
  },
  payment_time: {
    type: DataTypes.DATE,
  },
  note: {
    type: DataTypes.TEXT,
  }
});

module.exports = Payment;
