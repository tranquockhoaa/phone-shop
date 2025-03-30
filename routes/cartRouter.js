const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');
const express = require('express');
router = express.Router();

router.get('/', cartController.getAllCart);
router.get('/:id', cartController.getCartById);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.post('/add', authController.protect, cartController.addToCart);

module.exports = router;
