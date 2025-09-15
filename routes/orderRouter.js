const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/checkout', authController.protect, orderController.createOrder);
router.get('/track/:orderId', orderController.trackOrder);
router.get('/my-orders', authController.protect, orderController.getMyOrders);
router.get('/my-orders/:orderId', authController.protect, orderController.getMyOrderDetail);
router.get('/', authController.protect, authController.restrictTo('admin'), orderController.getAllOrders);
router.get('/:id', authController.protect, authController.restrictTo('admin'), orderController.getOrderById);
router.patch('/:id', authController.protect, authController.restrictTo('admin'), orderController.updateOrderStatus);

module.exports = router;