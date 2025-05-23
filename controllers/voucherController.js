const VoucherService = require('./../service/voucherService');
const catchAsync = require('./../utils/catchAsync');

exports.createVoucher = catchAsync(async (req, res, next) => {
  console.log('ctl');
  const newVoucher = await VoucherService.createVoucher(req.body);
  res.status(200).json({
    status: 'success',
    data: newVoucher,
  });
});
