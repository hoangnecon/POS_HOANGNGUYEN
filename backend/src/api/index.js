const express = require('express');
const authRoutes = require('./auth.routes');
const dataRoutes = require('./data.routes');
const adminRoutes = require('./admin.routes');
const orderRoutes = require('./order.routes'); // <-- Import route mới
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);

// Các route bên dưới ĐỀU YÊU CẦU phải đăng nhập
router.use(protect);

router.use('/data', dataRoutes);
router.use('/orders', orderRoutes); // <-- Sử dụng orderRoutes
router.use('/admin', adminRoutes);

module.exports = router;
