const AppError = require('./../utils/appError');

const HandleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value =
    err.errmsg && typeof err.errmsg === 'string'
      ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
      : null;
  //   const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  //   console.log(value);
  const message = `Duplicate field value: ${value} please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.erros).map((el) => el.message);

  const message = `invalide input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
  const message = 'Invalid token, please login again';
  return new AppError(message, 401);
};
const handleJsonWebTokenExpiredError = () => {
  const message = 'Token expired, please login again';
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'something went wrong',
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error('Error: ', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong, please try again later.',
    });
  }
  if (err.isOperational) {
    res.status(err.statusCode).render('error', {
      title: 'something went wrong',
      msg: err.message,
    });
  } else {
    console.error('Error: ', err);
    res.status(err.statusCode).render('error', {
      title: 'something went wrong',
      msg: 'please try again later',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err.message);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    err.message = err.message;
    if (error.name === 'CastError') error = HandleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
    if (error.name === 'TokenExpiredError')
      error = handleJsonWebTokenExpiredError();

    sendErrorProd(error, req, res);
  }
};
