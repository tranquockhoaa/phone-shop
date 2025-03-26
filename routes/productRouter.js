const express = require('express');
const productController = require('./../controllers/productController');
router = express.Router();

router.post('/', productController.createProduct);

module.exports = router;