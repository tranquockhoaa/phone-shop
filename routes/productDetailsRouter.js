const express = require('express');
const productDetailsController = require('../controllers/productDetailController');
const router = express.Router();

router.post('/', productDetailsController.createProductDetail);
router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    productDetailsController.getProductForHomePage(req, res, next);
  } else {
    productDetailsController.getAllProductDetails(req, res, next);
  }
});
router.get('/:id', productDetailsController.getProductDetailById);
router.put('/:id', productDetailsController.updateProductDetail);

module.exports = router;
