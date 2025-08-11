const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Order = sequelize.define('orders', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
    type: DataTypes.STRING,
    allowNull: false, 
    },
    total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
    payment_method: {
    type: DataTypes.ENUM('COD', 'QR',),
    defaultValue: 'COD',
    },

  status: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'TEMP' ),
    defaultValue: 'PENDING',
  },
}, {
  timestamps: true,
});

module.exports = Order; 
