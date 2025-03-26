const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.getUserByFullName = catchAsync(async (req, res, next) => {
  const { fullName } = req.params;
  const users = await User.findAll({ where: { full_name: fullName } });
  res.status(404).json({
    status: 'done',
    data: users,
  });
});
