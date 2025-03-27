const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Color = require('./color');
const ProductDetails = require('./productDetails');
const Ram = require('./ram');
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models synchronized with database');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDB();

module.exports = { User, Product, Color, ProductDetails, Ram };
