const sequelize = require('./../config/database');

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// const sendErrorProd = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went very wrong!',
//     });
//   }
// };

const uniqueConstrainError = (err) => {
  return err.errors.map((e) => e.message);
};

module.exports = (err, req, res, next) => {
  console.log('error controler running');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  const errorName = error.name;

  if (errorName == 'SequelizeUniqueConstraintError') {
    error.message = uniqueConstrainError(error);
  }
  next(err);
};
