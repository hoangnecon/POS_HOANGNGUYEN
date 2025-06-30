// backend/src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Bạn chưa đăng nhập, vui lòng cung cấp token'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Người dùng của token này không còn tồn tại'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token không hợp lệ hoặc đã hết hạn'));
  }
};

const authorize = (...requiredRoles) => (req, res, next) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'Bạn không có quyền truy cập vào tài nguyên này'));
    }
    next();
};

// Sửa lỗi tại đây: Thêm "authorize" vào phần export
module.exports = {
    protect,
    authorize, 
};