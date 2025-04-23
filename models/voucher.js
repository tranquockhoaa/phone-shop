const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Voucher = sequelize.define('voucher', {
  voucher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  code: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },

  type: {
    type: DataTypes.TEXT,
    unique: true,
  },
  discount_value: {
    type: DataTypes.TEXT,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isValid() {
        const nowDate = new Date();

        if (nowDate.getTime() < value.getTime()) return true;
        throw 'date must be greater than or equal now';
      },
      isValidWithEndDate(value) {
        const startDate = new Date(value);
        const endDate = new Date(this.end_date);
        if (this.end_date.getTime() - startDate.getTime() > 0) {
          return true;
        }
        throw 'invalidate startDate and endDate';
      },
    },
  },

  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Voucher;
