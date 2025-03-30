const CartDetaiService = require('./../service/cartDetailService');
const CartDetailService = require('./../service/cartDetailService');
const catchAsync = require('./../utils/catchAsync');

exports.createCartDetail = catchAsync(async (req, res, next) => {
  const newCartDetail = await CartDetailService.createCartDetail(req.body);
  res.status(200).json({
    status: 'success',
    data: newCartDetail,
  });
});

exports.updateCartDetail = catchAsync(async (req, res, next) => {
  const cartDetail = await CartDetailService.updateCartDetail(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: 'success',
    data: cartDetail,
  });
});

exports.getAllCartDetail = catchAsync(async (req, res, next) => {
  const allCartDetail = await CartDetailService.getAllCartDetail();
  res.status(200).json({
    status: 'success',
    data: allCartDetail,
  });
});

exports.getCartDetailById = catchAsync(async (req, res, next) => {
  const cartDetail = await CartDetailService.getCartDetailById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: cartDetail,
  });
});

exports.removeCartDetail = catchAsync(async (req, res, next) => {
  const message = await CartDetailService.removeCartDetail(req.params.idCart);
  res.status(200).json({
    status: 'success',
    message: message,
  });
});

exports.changeQuantity = catchAsync(async (req, res, next) => {
  const cartDetail = await CartDetaiService.changeQuantity(req.params.id,req.params.changeType);
  res.status(200).json({
    status: 'success',
    message: cartDetail,
  });
});
