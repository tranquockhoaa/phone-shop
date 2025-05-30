const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/', productController.createProduct);
router.get('/latest', productController.getLastestProducts);
router.get('/getInfoDetail', productController.getInfoDetailByCodeName);

module.exports = router;
