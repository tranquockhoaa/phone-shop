const cartDetailcontroller = require('../controllers/cartDetailController');
const express = require('express');

router = express.Router();

router.post('/', cartDetailcontroller.createCartDetail);
router.put('/:id', cartDetailcontroller.updateCartDetail);
router.get('/', cartDetailcontroller.getAllCartDetail);
router.get('/:id', cartDetailcontroller.getCartDetailById);
router.delete('/:idCart', cartDetailcontroller.removeCartDetail);
router.patch('/:id/quantity/:changeType', cartDetailcontroller.changeQuantity);
module.exports = router;
