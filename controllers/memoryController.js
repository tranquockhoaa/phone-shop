const MemoryService = require('./../service/memoryService');
const catchAsync = require('./../utils/catchAsync');
exports.createMemory = catchAsync(async (req, res, next) => {
  const newMemory = await MemoryService.createMemory(req.body);
  res.status(200).json({
    status: 'success',
    data: newMemory,
  });
});
