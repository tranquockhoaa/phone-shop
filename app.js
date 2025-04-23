const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');

const errorHandler = require('./middlewares/erroMiddleware');
const globalErrorHandle = require('./controllers/errorController');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const colorRouter = require('./routes/colorRouter');
const productDetailRouter = require('./routes/productDetailsRouter');
const ramRouter = require('./routes/ramRouter');
const brandRouter = require('./routes/brandRouter');
const cartRouter = require('./routes/cartRouter');
const reviewRouter = require('./routes/reviewRouter');
const cartDetailRouter = require('./routes/cartDetailRouter');
const memoryRouter = require('./routes/memoryRouter');
const voucherRouter = require('./routes/voucherRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/color', colorRouter);
app.use('/api/v1/productDetails', productDetailRouter);
app.use('/api/v1/ram', ramRouter);
app.use('/api/v1/brand', brandRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/cartDetail', cartDetailRouter);
app.use('/api/v1/memory', memoryRouter);
app.use('/api/v1/voucher', voucherRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`));
});

app.use(errorHandler);
// app.use(globalErrorHandle);

module.exports = app;
