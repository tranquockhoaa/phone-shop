const ProductDetailService = require('./../service/productDetailService');
const catchAsync = require('../utils/catchAsync');

exports.createProductDetail = catchAsync(async (req, res, next) => {
  const newProductDetails = await ProductDetailService.createProductDetail(
    req.body,
  );
  res.status(200).json({
    status: 'Done',
    data: newProductDetails,
  });
});

exports.getAllProductDetails = catchAsync(async (req, res, next) => {
  const allProductDetails = await ProductDetailService.getAllProductDetails();
  res.status(200).json({
    status: 'Done',
    data: allProductDetails,
  });
});
exports.getProductDetailById = catchAsync(async (req, res, next) => {
  const productDetail = await ProductDetailService.getAllProductDetails(
    req.params.id,
  );
  res.status(200).json({
    status: 'Done',
    data: productDetail,
  });
});
exports.updateProductDetail = catchAsync(async (req, res, next) => {
  const updateProDuctDetails = await ProductDetailService.updateProDuctDetails(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: 'Done',
    message: updateProDuctDetails,
  });
});
