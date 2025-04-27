const catchAsync = require('../utils/catchAsync');
const ReviewImageService = require('../service/reviewImageService');

exports.uploadImage = catchAsync(async function (req, res) {
  const resutl = await ReviewImageService.uploadImage(req, res);
  res.status(200).json({
    status: 'success',
    data: resutl,
  });
});

//

exports.getImage = catchAsync(async (req, res) => {
  const result = await ReviewImageService.getImage(req, res);
  res.status(200).json({
    status: 'sucess',
    data: result,
  });
});

exports.getImages = catchAsync(async (req, res) => {
  const result = await ReviewImageService.getImages(req.query);
  res.status(200).json({
    status: 'sucess',
    data: result,
  });
});
