const BrandService = require('./../service/brandService');
const catchAsync = require('./../utils/catchAsync');

exports.createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await BrandService.createBrand(req.body);
  console.log('brand');
  res.status(200).json({
    status: 'succes',
    data: newBrand,
  });
});

exports.updateBrand = catchAsync(async (req, res, next) => {
  const updateBrand = await BrandService.updateBrand(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: updateBrand,
  });
});

exports.getBrandByPk = catchAsync(async (req, res, next) => {
  const brand = await BrandService.getBrandByPk(req.params.id);
  res.status(200).json({
    status: 'success',
    data: brand,
  });
});

exports.getAllBrand = catchAsync(async (req, res, next) => {
  const allBrand = await BrandService.getAllBrand();
  res.status(200).json({
    status: 'success',
    data: allBrand,
  });
});

exports.getBrandByName = catchAsync(async (req, res, next) => {
  const brand = await BrandService.getBrandByName(req.query);
  res.status(200).json({
    status: 'success',
    data: brand,
  });
});

