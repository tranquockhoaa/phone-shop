const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandle = require('./controllers/errorController');
const errorHandler = require('./middlewares/erroMiddleware');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const colorRouter = require('./routes/colorRouter');
const productDetailRouter = require('./routes/productDetailsRouter');
const ramRouter = require('./routes/ramRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/color', colorRouter);
app.use('/api/v1/productDetails', productDetailRouter);
app.use('/api/v1/ram', ramRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`));
});
app.use(errorHandler);
app.use(globalErrorHandle);

module.exports = app;
