const CartService = require('./../service/cartService');
const catchAsync = require('./../utils/catchAsync');

exports.createCart = catchAsync(async (req, res, next) => {
  const newCart = await CartService.createCart(req.body);
  res.status(200).json({
    status: 'success',
    data: newCart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  console.log('addToCartController');
  console.log(req.userId);
  console.log('userId');
  const cartDetails = await CartService.addToCart(req.userId, req.body);
  res.status(200).json({
    status: 'success',
    message: cartDetails,
  });
});

exports.getAllCart = catchAsync(async (req, res, next) => {
  const allCart = await CartService.getAllCart();
  res.status(200).json({
    status: 'success',
    data: allCart,
  });
});

exports.getCartById = catchAsync(async (req, res, next) => {
  const cart = await CartService.getCartById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await CartService.updateCart(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: cart,
  });
});


