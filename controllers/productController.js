const Product = require('./../models/product');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    product_name: req.body.productName,
    description: req.body.description,
  });
  res.status(200).json({
    status: 'Done',
    message: newProduct,
  });
});
