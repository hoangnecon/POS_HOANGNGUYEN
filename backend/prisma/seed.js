const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu gieo mầm dữ liệu (seeding)...');

  // --- 1. Tạo Users ---
  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
  await prisma.user.upsert({
    where: { email: 'admin@pos.com' },
    update: {},
    create: {
      email: 'admin@pos.com',
      password: hashedAdminPassword,
      fullName: 'Quản trị viên',
      role: 'ADMIN',
    },
  });

  const hashedStaffPassword = await bcrypt.hash('staffpassword', 10);
  await prisma.user.upsert({
    where: { email: 'staff@pos.com' },
    update: {},
    create: {
      email: 'staff@pos.com',
      password: hashedStaffPassword,
      fullName: 'Nhân Viên A',
      role: 'STAFF',
    },
  });
  console.log('✅ Đã tạo User admin và staff.');

  // --- 2. Tạo Loại Bàn (Table Types) ---
  await prisma.tableType.upsert({
    where: { name: 'Bàn Thường' },
    update: {},
    create: { name: 'Bàn Thường', quantity: 30, isSpecial: false },
  });
  await prisma.tableType.upsert({
    where: { name: 'Mang Về' },
    update: {},
    create: { name: 'Mang Về', quantity: 1, isSpecial: true },
  });
  console.log('✅ Đã tạo các loại bàn.');

  // --- 3. Tạo Loại Menu (Menu Types) ---
  const regularMenu = await prisma.menuType.upsert({
    where: { code: 'regular' },
    update: {},
    create: { code: 'regular', name: 'Thực đơn thường ngày' },
  });
  const holidayMenu = await prisma.menuType.upsert({
    where: { code: 'holiday' },
    update: {},
    create: { code: 'holiday', name: 'Thực đơn Tết' },
  });
  console.log('✅ Đã tạo các loại menu.');

  // --- 4. Tạo Danh mục (Categories) ---
  const phoCategory = await prisma.category.upsert({ where: { name: 'Phở' }, update: {}, create: { name: 'Phở' } });
  const bunCategory = await prisma.category.upsert({ where: { name: 'Bún' }, update: {}, create: { name: 'Bún' } });
  const comCategory = await prisma.category.upsert({ where: { name: 'Cơm' }, update: {}, create: { name: 'Cơm' } });
  const banhCategory = await prisma.category.upsert({ where: { name: 'Bánh' }, update: {}, create: { name: 'Bánh' } });
  const appetizerCategory = await prisma.category.upsert({ where: { name: 'Khai vị' }, update: {}, create: { name: 'Khai vị' } });
  const drinkCategory = await prisma.category.upsert({ where: { name: 'Đồ uống' }, update: {}, create: { name: 'Đồ uống' } });
  const tetCategory = await prisma.category.upsert({ where: { name: 'Món Tết' }, update: {}, create: { name: 'Món Tết' } });
  console.log('✅ Đã tạo các danh mục.');

  // --- 5. Tạo Món ăn (Menu Items) ---
  const menuItemsToCreate = [
    { name: 'Phở Bò Đặc Biệt', price: 89000, imageUrl: '[https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop)', isPopular: true, categoryId: phoCategory.id, menuTypeId: regularMenu.id },
    { name: 'Phở Gà Hà Nội', price: 75000, imageUrl: '[https://images.unsplash.com/photo-1590420882553-4f9150b71f92?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1590420882553-4f9150b71f92?w=300&h=200&fit=crop)', isPopular: false, categoryId: phoCategory.id, menuTypeId: regularMenu.id },
    { name: 'Bún Bò Huế', price: 79000, imageUrl: '[https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=300&h=200&fit=crop](https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=300&h=200&fit=crop)', isPopular: true, categoryId: bunCategory.id, menuTypeId: regularMenu.id },
    { name: 'Bún Chả Hà Nội', price: 85000, imageUrl: '[https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop](https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop)', isPopular: true, categoryId: bunCategory.id, menuTypeId: regularMenu.id },
    { name: 'Bánh Mì Thịt Nướng', price: 35000, imageUrl: '[https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop)', isPopular: false, categoryId: banhCategory.id, menuTypeId: regularMenu.id },
    { name: 'Gỏi Cuốn Tôm Thịt', price: 45000, imageUrl: '[https://images.pexels.com/photos/6646082/pexels-photo-6646082.jpeg?w=300&h=200&fit=crop](https://images.pexels.com/photos/6646082/pexels-photo-6646082.jpeg?w=300&h=200&fit=crop)', isPopular: false, categoryId: appetizerCategory.id, menuTypeId: regularMenu.id },
    { name: 'Cơm Tấm Sài Gòn', price: 95000, imageUrl: '[https://images.pexels.com/photos/6646037/pexels-photo-6646037.jpeg?w=300&h=200&fit=crop](https://images.pexels.com/photos/6646037/pexels-photo-6646037.jpeg?w=300&h=200&fit=crop)', isPopular: true, categoryId: comCategory.id, menuTypeId: regularMenu.id },
    { name: 'Cà Phê Đen Đá', price: 25000, imageUrl: '[https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=300&h=200&fit=crop)', isPopular: true, categoryId: drinkCategory.id, menuTypeId: regularMenu.id },
    { name: 'Phở Bò Đặc Biệt Tết', price: 120000, imageUrl: '[https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop)', isPopular: true, categoryId: phoCategory.id, menuTypeId: holidayMenu.id },
    { name: 'Bánh Chưng Chiên', price: 65000, imageUrl: '[https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop](https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop)', isPopular: true, categoryId: tetCategory.id, menuTypeId: holidayMenu.id },
    { name: 'Thịt Kho Tàu', price: 150000, imageUrl: '[https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop](https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop)', isPopular: true, categoryId: tetCategory.id, menuTypeId: holidayMenu.id }
  ];

  for (const item of menuItemsToCreate) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: { price: item.price, imageUrl: item.imageUrl },
      create: item,
    });
  }
  console.log(`✅ Đã tạo ${menuItemsToCreate.length} món ăn.`);

  console.log('Gieo mầm dữ liệu hoàn tất.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });