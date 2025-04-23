const ProductService = require('./../service/productService');
const catchAsync = require('./../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await ProductService.createProduct(req.body.size);
  res.status(200).json({
    status: 'Done',
    data: newProduct,
  });
});
