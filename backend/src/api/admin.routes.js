const express = require('express');
const { authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

// Middleware authorize('ADMIN') đảm bảo chỉ admin mới vào được các route bên dưới
router.get('/dashboard-summary', authorize('ADMIN'), (req, res) => {
    res.json({ message: `Chào mừng Admin ${req.user.fullName} đến với khu vực quản trị!` });
});

// Các routes CRUD cho món ăn, danh mục... sẽ được thêm vào đây
// Ví dụ: router.post('/menu-items', ...)

module.exports = router;