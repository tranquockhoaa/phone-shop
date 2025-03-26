const { Sequelize } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof Sequelize.UniqueConstraintError
  ) {
    return res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Đã có lỗi xảy ra!',
  });
};

module.exports = errorHandler;
