const express = require('express');
const productDetailsController = require('../controllers/productDetailController');
const router = express.Router();

router.post('/', productDetailsController.createProductDetail);
router.get('/', productDetailsController.getAllProductDetails);
router.get('/:id', productDetailsController.getProductDetailById);
router.put('/:id', productDetailsController.updateProductDetail);

module.exports = router;
