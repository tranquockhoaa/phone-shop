const ProductService = require('./../service/productService');
const ProductDetailService = require('./../service/productDetailService');
const catchAsync = require('./../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(200).json({
    status: 'Done',
    data: {
      product: newProduct,
      productDetail: newProduct.productDetails,
    },
  });
});
