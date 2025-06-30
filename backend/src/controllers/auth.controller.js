const httpStatus = require('http-status');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service'); // Phải có dòng này
const ApiError = require('../utils/ApiError');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUserWithEmailAndPassword(email, password);
    // Gọi đến tokenService để tạo token
    const token = tokenService.generateAuthToken(user);
    
    delete user.password;
    
    res.status(httpStatus.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
    try {
        const userResponse = { ...req.user };
        delete userResponse.password; 
        res.status(httpStatus.OK).json(userResponse);
    } catch (error) {
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Không thể lấy thông tin người dùng"));
    }
};

module.exports = {
  login,
  getMe,
};
