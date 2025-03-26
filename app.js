const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandle = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`));
});
app.use(globalErrorHandle);

module.exports = app;
