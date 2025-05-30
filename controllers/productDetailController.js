const ProductDetailService = require('./../service/productDetailService');
const catchAsync = require('./../utils/catchAsync');

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
  const queParam = Object.entries(req.query);
  const allProductDetails = await ProductDetailService.getAllProductDetails(
    queParam,
  );
  res.status(200).json({
    status: 'Done',
    data: allProductDetails,
  });
});

exports.getProductDetailById = catchAsync(async (req, res, next) => {
  const productDetail = await ProductDetailService.getProductDetailByid(
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

exports.filter = catchAsync(async (req, res, next) => {
  console.log('object');
  console.log(req.query);
  const product = await ProductDetailService.filter();

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.getProductForHomePage = catchAsync(async (req, res, next) => {
  const product = await ProductDetailService.getProductForHomePage(req.query);
  res.status(200).json({
    status: 'Done',
    data: {
      product,
    },
  });
});
