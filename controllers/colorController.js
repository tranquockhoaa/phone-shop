const ColorService = require('./../service/colorService');
const catchAsync = require('./../utils/catchAsync');
exports.createColor = catchAsync(async (req, res, next) => {
  newColor = await ColorService.createColor(req.body);
  res.status(200).json({
    status: 'Done',
    data: newColor,
  });
});

exports.updateColor = catchAsync(async (req, res, next) => {
  const updateColor = await ColorService.updateColor(req.params.id, req.body);
  res.status(200).json({
    status: 'Done',
    data: updateColor,
  });
});

exports.getAllColor = catchAsync(async (req, res, next) => {
  const allColor = await ColorService.getAllColor();
  res.status(200).json({
    status: 'Done',
    data: allColor,
  });
});
exports.getColorByPk = catchAsync(async (req, res, next) => {
  const color = await ColorService.getColorByPk(req.params.id);
  res.status(200).json({
    status: 'Done',
    data: color,
  });
});
