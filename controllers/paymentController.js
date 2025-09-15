const Payment = require('../models/payments');
const Order = require('../models/orders');
const catchAsync = require('../utils/catchAsync');

exports.createPayment = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { order_id, amount, payment_method, transaction_code, note } = req.body;

  // Kiểm tra đơn hàng có tồn tại và thuộc về user không
  const order = await Order.findOne({ where: { order_id, user_id: userId } });
  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found or not owned by this user' });
  }

  // Tạo payment
  const payment = await Payment.create({
    order_id,
    user_id: userId,
    amount,
    payment_method,
    payment_status: payment_method === 'COD' ? 'PENDING' : 'SUCCESS', // QR có thể xử lý thêm trạng thái
    transaction_code,
    payment_time: new Date(),
    note,
  });

  res.status(201).json({
    status: 'success',
    data: payment,
  });
});