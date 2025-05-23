const { Review } = require('./../models');
const ReviewService = require('./../service/reviewService');
const catchAsync = require('./../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await ReviewService.createReview(req.body);
  res.status(200).json({
    status: 'success',
    data: newReview,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await ReviewService.updateReview(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: 'success',
    data: updatedReview,
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const allReview = await ReviewService.getAllReview();
  res.status(200).json({
    status: 'success',
    data: allReview,
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await ReviewService.getReviewById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: review,
  });
});
