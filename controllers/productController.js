const catchAsync = require('../utils/catchAsync');
const ProductService = require('../service/productService');
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(200).json({
    status: 'Done',
    data: newProduct,
  });
});
