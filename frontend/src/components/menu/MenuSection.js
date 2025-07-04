// frontend/src/components/menu/MenuSection.js
import React from 'react';
import { Search, Plus, Star } from 'lucide-react';

const MenuSection = ({
  selectedTable,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedMenuType,
  setSelectedMenuType,
  menuItems,
  menuTypes,
  categories,
  addToOrder,
}) => {
  const filteredMenuItems = menuItems.filter((item) => {
    // --- LOGIC ĐÃ ĐƯỢC SỬA LỖI ---
    
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    // 1. Lọc theo loại menu (Thường ngày, Tết, ...)
    const selectedMenuTypeObject = menuTypes.find(mt => mt.code === selectedMenuType);
    if (!selectedMenuTypeObject) return false; // Bỏ qua nếu không tìm thấy loại menu
    const matchesMenuType = item.menuTypeId === selectedMenuTypeObject.id;

    // 2. Lọc theo danh mục (Phở, Bún, Cơm, ...)
    let matchesCategory;
    if (selectedCategory === 'all') {
      matchesCategory = true; // Nếu chọn "Tất cả" thì luôn đúng
    } else if (selectedCategory === 'popular') {
      matchesCategory = item.isPopular; // Nếu chọn "Phổ biến" thì lọc theo isPopular
    } else {
      // Nếu chọn danh mục cụ thể, so sánh bằng categoryId
      matchesCategory = item.categoryId === selectedCategory;
    }

    return matchesSearch && matchesMenuType && matchesCategory;
  });

  return (
    <div className="p-8 h-full flex flex-col bg-primary-bg">
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-headline mb-3">
            Khám phá thực đơn
          </h1>
        </div>
        <div className="flex gap-4 mb-8">
          <select
            value={selectedMenuType}
            onChange={(e) => setSelectedMenuType(e.target.value)}
            className="px-4 py-3 bg-primary-main rounded-2xl text-primary-headline focus:ring-2 focus:ring-primary-highlight min-w-48 shadow-md"
          >
            {menuTypes.map((menuType) => (
              // Sử dụng menuType.code ('regular', 'holiday') làm value
              <option key={menuType.id} value={menuType.code}>
                {menuType.name}
              </option>
            ))}
          </select>
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-paragraph"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-primary-main rounded-2xl focus:ring-2 focus:ring-primary-highlight focus:border-transparent transition-all duration-300 shadow-md"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
                  selectedCategory === category.id
                    ? 'bg-primary-button text-primary-main shadow-lg'
                    : 'bg-primary-main text-primary-headline'
                }`}
              >
                <IconComponent size={18} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredMenuItems.map((item) => (
                <div
                key={item.id}
                onClick={() => addToOrder(item)}
                className="bg-primary-main rounded-3xl p-6 hover:bg-primary-secondary cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group shadow-lg"
                >
                <div className="relative">
                    <div className="w-full h-40 bg-primary-secondary rounded-2xl mb-4 overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    </div>
                    {item.isPopular && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} className="fill-current" />
                        Phổ biến
                    </div>
                    )}
                </div>
                <h3 className="font-bold text-primary-headline text-lg mb-2">
                    {item.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-primary-headline font-bold text-xl">
                    {item.price.toLocaleString('vi-VN')}đ
                    </p>
                    <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Plus size={18} className="text-primary-main" />
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-primary-button" />
              </div>
              <h3 className="text-lg font-bold text-primary-headline mb-1">
                Không tìm thấy món ăn
              </h3>
              <p className="text-primary-paragraph text-sm">
                Vui lòng thử lại với bộ lọc khác.
              </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;