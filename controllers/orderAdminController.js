const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders');
const OrderItem = require('../models/orderItem');
const { Op } = require('sequelize');

// 1. Xem danh sách đơn hàng
exports.getOrdersList = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, status, name } = req.query;

  const whereConditions = {};
  if (status) whereConditions.status = status;
  if (name) whereConditions.full_name = { [Op.like]: `%${name}%` };

  const { count, rows } = await Order.findAndCountAll({
    where: whereConditions,
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    total: count,
    data: rows,
  });
});

// 2. Xem chi tiết đơn hàng
exports.getOrderDetails = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    where: { order_id: orderId },
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: require('../models/productDetails'),
            include: [
              require('../models/color'),
              require('../models/memory'),
              {
                model: require('../models/product'),
                include: [require('../models/brand')]
              }
            ]
          }
        ]
      }
    ],
  });

  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found' });
  }

  // Map thêm các trường cần thiết cho từng order item
  const orderData = order.toJSON();
  orderData.order_items = orderData.order_items.map(item => {
    const pd = item.product_detail;
    return {
      ...item,
      productName: pd?.product?.name,
      ram: pd?.memory?.ram_size,
      storage: pd?.memory?.storage_size,
      price: item.price,
      quantity: item.quantity
    };
  });

  res.status(200).json({
    status: 'success',
    data: orderData,
  });
});

// 3. Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid status' });
  }

  // Lấy order và các order item kèm product detail
  const order = await Order.findOne({
    where: { order_id: orderId },
    include: [
      {
        model: OrderItem,
        include: [
          require('../models/productDetails')
        ]
      }
    ]
  });

  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found' });
  }

  const prevStatus = order.status;

  // Nếu chuyển từ PENDING sang CONFIRMED => giảm tồn kho
  if (prevStatus === 'PENDING' && status === 'CONFIRMED') {
    for (const item of order.order_items) {
      const productDetail = item.product_detail;
      if (productDetail.quantity < item.quantity) {
        return res.status(400).json({ status: 'fail', message: `Sản phẩm ${productDetail.product_detail_id} không đủ hàng` });
      }
      productDetail.quantity -= item.quantity;
      await productDetail.save();
    }
  }

  // Nếu chuyển sang CANCELLED và trạng thái cũ KHÁC PENDING thì hoàn lại kho
  if (status === 'CANCELLED' && prevStatus !== 'PENDING') {
    for (const item of order.order_items) {
      const productDetail = item.product_detail;
      productDetail.quantity += item.quantity;
      await productDetail.save();
    }
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    status: 'success',
    message: `Order status updated to ${status}`,
  });
});

// 4. Tìm kiếm và lọc đơn hàng
// exports.searchOrders = catchAsync(async (req, res, next) => {
//   const { searchTerm, status } = req.query;
//   let orders = [];

//   // Ưu tiên tìm theo mã đơn hàng (order_id là số)
//   if (searchTerm && /^\d+$/.test(searchTerm)) {
//     orders = await Order.findAll({
//       where: {
//         order_id: Number(searchTerm),
//         ...(status && { status })
//       },
//       order: [['createdAt', 'DESC']],
//     });
//     if (orders.length > 0) {
//       return res.status(200).json({ status: 'success', data: orders });
//     }
//   }

//   // Nếu không phải mã đơn hàng hoặc không tìm thấy, tìm theo số điện thoại
//   if (searchTerm) {
//     orders = await Order.findAll({
//       where: {
//         phone_number: { [Op.like]: `%${searchTerm}%` },
//         ...(status && { status })
//       },
//       order: [['createdAt', 'DESC']],
//     });
//     if (orders.length > 0) {
//       return res.status(200).json({ status: 'success', data: orders });
//     }
//   }

//   // Nếu không tìm thấy, tìm theo email
//   if (searchTerm) {
//     orders = await Order.findAll({
//       where: {
//         email: { [Op.like]: `%${searchTerm}%` },
//         ...(status && { status })
//       },
//       order: [['createdAt', 'DESC']],
//     });
//     if (orders.length > 0) {
//       return res.status(200).json({ status: 'success', data: orders });
//     }
//   }

//   // Nếu không tìm thấy, tìm theo tên
//   if (searchTerm) {
//     orders = await Order.findAll({
//       where: {
//         full_name: { [Op.like]: `%${searchTerm}%` },
//         ...(status && { status })
//       },
//       order: [['createdAt', 'DESC']],
//     });
//     return res.status(200).json({ status: 'success', data: orders });
//   }

//   // Nếu không có searchTerm, chỉ lọc theo status (nếu có)
//   orders = await Order.findAll({
//     where: status ? { status } : {},
//     order: [['createdAt', 'DESC']],
//   });

//   res.status(200).json({
//     status: 'success',
//     data: orders,
//   });
// });


exports.searchOrders = catchAsync(async (req, res, next) => {
  const { searchTerm, status, fromDate, toDate } = req.query;
  let orders = [];
  let dateFilter = {};

  if (fromDate && toDate) {
    dateFilter.createdAt = { [Op.between]: [new Date(fromDate), new Date(toDate)] };
  } else if (fromDate) {
    dateFilter.createdAt = { [Op.gte]: new Date(fromDate) };
  } else if (toDate) {
    dateFilter.createdAt = { [Op.lte]: new Date(toDate) };
  }

  // Ưu tiên tìm theo mã đơn hàng (order_id là số)
  if (searchTerm && /^\d+$/.test(searchTerm)) {
    orders = await Order.findAll({
      where: {
        order_id: Number(searchTerm),
        ...(status && { status }),
        ...dateFilter
      },
      order: [['createdAt', 'DESC']],
    });
    if (orders.length > 0) {
      return res.status(200).json({ status: 'success', data: orders });
    }
  }

  // Nếu không phải mã đơn hàng hoặc không tìm thấy, tìm theo số điện thoại
  if (searchTerm) {
    orders = await Order.findAll({
      where: {
        phone_number: { [Op.like]: `%${searchTerm}%` },
        ...(status && { status }),
        ...dateFilter
      },
      order: [['createdAt', 'DESC']],
    });
    if (orders.length > 0) {
      return res.status(200).json({ status: 'success', data: orders });
    }
  }

  // Nếu không tìm thấy, tìm theo email
  if (searchTerm) {
    orders = await Order.findAll({
      where: {
        email: { [Op.like]: `%${searchTerm}%` },
        ...(status && { status }),
        ...dateFilter
      },
      order: [['createdAt', 'DESC']],
    });
    if (orders.length > 0) {
      return res.status(200).json({ status: 'success', data: orders });
    }
  }

  // Nếu không tìm thấy, tìm theo tên
  if (searchTerm) {
    orders = await Order.findAll({
      where: {
        full_name: { [Op.like]: `%${searchTerm}%` },
        ...(status && { status }),
        ...dateFilter
      },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ status: 'success', data: orders });
  }

  // Nếu không có searchTerm, chỉ lọc theo status và ngày tháng (nếu có)
  orders = await Order.findAll({
    where: {
      ...(status && { status }),
      ...dateFilter
    },
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

// 5. Xóa đơn hàng
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ where: { order_id: orderId } });

  if (!order) {
    return res.status(404).json({ status: 'fail', message: 'Order not found' });
  }

  await order.destroy();

  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});
