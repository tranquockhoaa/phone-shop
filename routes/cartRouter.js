const cartController = require('./../controllers/cartController');
const express = require('express');
router = express.Router();

router.get('/', cartController.getAllCart);
router.get('/:id', cartController.getCartById);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);

module.exports = router;
