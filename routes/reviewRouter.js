const reviewController = require('./../controllers/reviewController');
const express = require('express');

router = express.Router();

router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.get('/', reviewController.getAllReview);
router.get('/:id', reviewController.getReviewById);

module.exports = router;
