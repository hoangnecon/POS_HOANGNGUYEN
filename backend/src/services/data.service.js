const prisma = require('../config/prisma');

/**
 * Lấy tất cả dữ liệu cần thiết cho giao diện bán hàng.
 */
const getSalesScreenData = async () => {
  // Dùng Promise.all để thực thi các truy vấn song song, tăng hiệu năng
  const [menuItems, categories, menuTypes] = await Promise.all([
    prisma.menuItem.findMany(),
    prisma.category.findMany(),
    prisma.menuType.findMany()
  ]);
  return { menuItems, categories, menuTypes };
};

/**
 * Lấy cấu hình các loại bàn.
 */
const getTableTypes = async () => {
    return prisma.tableType.findMany();
};

module.exports = {
  getSalesScreenData,
  getTableTypes,
};