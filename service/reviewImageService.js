const ReviewImage = require('../models/reviewImage');
const ProductDetails = require('../models/productDetails');
const AppError = require('./../utils/appError');
const cloudinary = require('../config/cloudinary');
const path = require('path');

class ReviewImageService {
  static async uploadImage(req, res) {
    const check = await ReviewImage.findOne({ where: { code: req.body.code } });
    if (check) {
      throw new AppError('image is exited', 409);
    }
    const code = req.body.code;
    if (code.includes('-')) {
      console.log('code only contain a-z and _');
      throw new AppError('code only contain a-z and _', 400);
    }

    const newReviewImage = await ReviewImage.create({
      code: req.body.code,
      image_type: req.body.imageType,
      product_detail_id: req.body.productDetailId,
      file_name: req.file.originalname,
      file_path: `image/${req.body.imageType}/${req.file.originalname}`,
      url: `${req.file.path}`,
    });

    const folder = 'image/' + req.body.imageType;
    const publicId = req.file.originalname.split('.')[0];
    console.log(folder);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
      public_id: publicId,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    return result;
  }

  static async getImage(req, res) {
    const rqcode = req.params.code;
    const url = await ReviewImage.findOne({ where: { code: rqcode } });
    return url;
  }

  static async getImages(queParam) {
    const productDetailId = queParam['productDetailId'];
    const results = await ReviewImage.findAll({
      where: { product_detail_id: productDetailId },
    });
    let urls = [];
    results.forEach((result) => {
      urls.push(
        'https://res.cloudinary.com/dmqpk0pyk/image/upload/' + result.file_path,
      );
    });
    console.log(urls);
    return urls;
  }
}

module.exports = ReviewImageService;
