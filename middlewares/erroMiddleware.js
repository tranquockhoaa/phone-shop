const { Sequelize } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.log('error midlware running');
  if (err instanceof Sequelize.UniqueConstraintError) {
    return res.status(400).json({
      status: 'fail',
      message: err.errors.map((e) => e),
    });
  }

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = errorHandler;
