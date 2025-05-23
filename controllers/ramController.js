const RamService = require('./../service/ramService');
const catchAsync = require('./../utils/catchAsync');

exports.createRam = catchAsync(async (req, res, next) => {
  const newRam = await RamService.createRam(req.body);
  res.status(200).json({
    status: 'success',
    data: newRam,
  });
});

exports.getAllRam = catchAsync(async (req, res, next) => {
  const allRam = await RamService.getAllRam();
  res.status(200).json({
    status: 'success',
    data: allRam,
  });
});

exports.getRamById = catchAsync(async (req, res, next) => {
  const ram = await RamService.getRamById(req.params.id);
  res.status(200).json({ status: 'success', data: ram });
});

exports.updateRam = catchAsync(async (req, res, next) => {
  const ram = await RamService.updateRam(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: ram,
  });
});
