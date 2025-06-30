const express = require('express');
const cors = require('cors');
const apiRouter = require('./src/api');
const httpStatus = require('http-status');
const ApiError = require('./src/utils/ApiError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// Middleware xử lý lỗi 404 cho các route không tồn tại
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
    },
  });
});

module.exports = app;