const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middlewares/multer');
const cloudinary = require('../config/cloudinary');
const reviewImageController = require('../controllers/reviewImageController');

router.post(
  '/uploads',
  upload.single('image'),
  reviewImageController.uploadImage,
);

router.get('/', reviewImageController.getImages);
// router.get('/:code', reviewImageController.getImage);

module.exports = router;
