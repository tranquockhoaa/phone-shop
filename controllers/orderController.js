const orderService = require('../service/orderService');
const Order = require('../models/orders');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const Color = require('../models/color');
const Memory = require('../models/memory');
const catchAsync = require('../utils/catchAsync');
const ProductDetail = require('../models/productDetails');
const { Op } = require('sequelize');
exports.createOrder = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { name, phone, email, note, address, payment_method } = req.body;

  if (!name || !phone || !address || !payment_method) {
    return res.status(400).json({ status: 'fail', message: 'Thiếu thông tin đặt hàng!' });
  }

  // Trạng thái đơn hàng ban đầu
  let status = 'PENDING';
  if (payment_method !== 'COD') {
    status = 'CONFIRMED'; // hoặc 'PAID' nếu bạn muốn
  }

  const { order, orderItems } = await orderService.createOrderFromCart(userId, {
    full_name: name,
    phone_number: phone,
    email,
    address,
    note,
    payment_method,
    status
  });

  res.status(200).json({ status: 'success', order, orderItems });
});
// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
  res.status(200).json({ status: 'success', data: orders });
});

// Lấy chi tiết đơn hàng (admin)
exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findByPk(req.params.id, {
    include: [{ model: OrderItem }]
  });
  if (!order) return res.status(404).json({ status: 'fail', message: 'Không tìm thấy đơn hàng' });
  res.status(200).json({ status: 'success', data: order });
});

// Cập nhật trạng thái đơn hàng (admin)
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ status: 'fail', message: 'Không tìm thấy đơn hàng' });
  order.status = req.body.status;
  await order.save();
  res.status(200).json({ status: 'success', data: order });
});

exports.trackOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.userId;

  const order = await Order.findOne({
    where: { order_id: orderId, user_id: userId },
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: ProductDetail
          }
        ]
      }
    ],
  });

  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found or not owned by this user' });
  }

  res.status(200).json({
    status: 'success',
    data: order,
  });
});



// Lấy danh sách đơn hàng của customer, có lọc trạng thái và thời gian
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { status, fromDate, toDate, page = 1, limit = 10 } = req.query;

  const whereConditions = { user_id: userId };
  if (status) whereConditions.status = status;
  if (fromDate && toDate) {
    whereConditions.createdAt = { [Op.between]: [new Date(fromDate), new Date(toDate)] };
  } else if (fromDate) {
    whereConditions.createdAt = { [Op.gte]: new Date(fromDate) };
  } else if (toDate) {
    whereConditions.createdAt = { [Op.lte]: new Date(toDate) };
  }

  const { count, rows } = await Order.findAndCountAll({
    where: whereConditions,
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: ProductDetail,
            as: 'productDetail', // Nếu đã đặt alias
            include: [
              {
                model: require('../models/product'),
                as: 'product', // Nếu có alias, nếu không thì bỏ as
                attributes: ['name'] // Chỉ lấy tên sản phẩm
              }
            ]
          }
        ]
      }
    ],
  });

  res.status(200).json({
    status: 'success',
    total: count,
    data: rows,
  });
});

exports.getMyOrderDetail = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { orderId } = req.params;

  const order = await Order.findOne({
    where: { order_id: orderId, user_id: userId },
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: ProductDetail,
            as: 'productDetail',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['name']
              },
              {
                model: Color,
                as: 'color',
                attributes: ['name']
              },
              {
                model: Memory,
                as: 'memory',
                attributes: ['ram_size', 'storage_size'] // Lấy đúng 2 trường này
              }
            ]
          }
        ]
      }
    ],
  });

  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found or not owned by this user' });
  }

  res.status(200).json({
    status: 'success',
    data: order,
  });
});
// Lấy chi tiết một đơn hàng của customer
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { status, fromDate, toDate, page = 1, limit = 10 } = req.query;

  const whereConditions = { user_id: userId };
  if (status) whereConditions.status = status;
  if (fromDate && toDate) {
    whereConditions.createdAt = { [Op.between]: [new Date(fromDate), new Date(toDate)] };
  } else if (fromDate) {
    whereConditions.createdAt = { [Op.gte]: new Date(fromDate) };
  } else if (toDate) {
    whereConditions.createdAt = { [Op.lte]: new Date(toDate) };
  }

  const { count, rows } = await Order.findAndCountAll({
    where: whereConditions,
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: ProductDetail,
            as: 'productDetail',
            include: [
              {
                model: require('../models/product'),
                as: 'product', // alias phải đúng với association
                attributes: ['name'] // chỉ lấy tên sản phẩm
              }
            ]
          }
        ]
      }
    ],
  });

  res.status(200).json({
    status: 'success',
    total: count,
    data: rows,
  });
});

// // Lấy chi tiết một đơn hàng của customer
// exports.getMyOrderDetail = catchAsync(async (req, res, next) => {
//   const userId = req.userId;
//   const { orderId } = req.params;

//   const order = await Order.findOne({
//     where: { order_id: orderId, user_id: userId },
//     include: [
//       {
//         model: OrderItem,
//         include: ['productDetail'],
//       },
//     ],
//   });

//   if (!order) {
//     return res.status(404).json({ status: 'fail', message: 'Order not found or not owned by this user' });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: order,
//   });
// });