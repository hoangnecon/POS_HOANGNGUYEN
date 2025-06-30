const httpStatus = require('http-status');

// Ví dụ một hàm cho admin
const getAdminData = async (req, res) => {
    // Vì đã qua middleware, chúng ta biết req.user là admin
    res.status(httpStatus.OK).json({
        message: `Chào mừng Admin ${req.user.fullName}!`,
        data: "Đây là dữ liệu chỉ admin thấy."
    });
};

module.exports = {
    getAdminData,
};