const jwt = require('jsonwebtoken');

/**
 * Tạo một JWT token.
 * @param {object} user - Đối tượng người dùng.
 * @returns {string}
 */
const generateAuthToken = (user) => {
  const payload = {
    userId: user.id,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  generateAuthToken,
};