const User = require('./../models/user');
const UserService = require('./../service/userService');

const catchAsync = require('./../utils/catchAsync');

exports.getUserByFullName = catchAsync(async (req, res, next) => {
  const { fullName } = req.params;
  const users = await User.findAll({ where: { full_name: fullName } });
  res.status(200).json({
    status: 'done',
    data: users,
  });
});

exports.getInforByEmail = catchAsync(async (req, res, next) => {
  const infor = await UserService.getInforByEmail(req.params.email);
  res.status(200).json({
    status: 'success',
    data: infor,
  });
});
