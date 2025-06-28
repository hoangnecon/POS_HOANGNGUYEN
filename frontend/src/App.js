import React, { useState, useEffect } from 'react';
import { 
  Home, 
  UtensilsCrossed, 
  BarChart3, 
  Settings, 
  LogOut, 
  User, 
  Search, 
  Filter,
  Plus,
  Minus,
  X,
  ShoppingCart,
  Receipt,
  Printer,
  FileText,
  Clock,
  Users
} from 'lucide-react';
import './App.css';

const MENU_ITEMS = [
  { id: 1, name: 'Tôm Chiên Dầu', category: 'Phở', price: 65000, image: '/api/placeholder/60/60' },
  { id: 2, name: 'Cà Phê Đen', category: 'Đồ uống', price: 18000, image: '/api/placeholder/60/60' },
  { id: 3, name: 'Cà Phê Sữa', category: 'Đồ uống', price: 20000, image: '/api/placeholder/60/60' },
  { id: 4, name: 'Cà Phê Sữa Đá Dồn', category: 'Đồ uống', price: 25000, image: '/api/placeholder/60/60' },
  { id: 5, name: 'Trà Sữa Thái Đỏ', category: 'Đồ uống', price: 35000, image: '/api/placeholder/60/60' },
  { id: 6, name: 'Phở Bò', category: 'Phở', price: 60000, image: '/api/placeholder/60/60' },
  { id: 7, name: 'Bún Bò Huế', category: 'Bún', price: 70000, image: '/api/placeholder/60/60' },
  { id: 8, name: 'Bún Chả', category: 'Bún', price: 75000, image: '/api/placeholder/60/60' },
  { id: 9, name: 'Cơm Tấm', category: 'Cơm', price: 80000, image: '/api/placeholder/60/60' },
  { id: 10, name: 'Bánh Mì', category: 'Bánh', price: 25000, image: '/api/placeholder/60/60' },
];

const CATEGORIES = ['Tất cả', 'Phở', 'Bún', 'Cơm', 'Bánh', 'Đồ uống'];

function App() {
  const [activeSection, setActiveSection] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [showRecent, setShowRecent] = useState(false);
  const [orders, setOrders] = useState({});
  const [recentItems, setRecentItems] = useState([1, 3, 5, 7]);

  // Initialize tables
  const [tables, setTables] = useState(() => {
    const initialTables = {};
    for (let i = 1; i <= 32; i++) {
      initialTables[i] = {
        id: i,
        status: [1, 3, 7, 12, 15].includes(i) ? 'occupied' : 'available',
        customers: [1, 3, 7, 12, 15].includes(i) ? Math.floor(Math.random() * 6) + 1 : 0
      };
    }
    return initialTables;
  });

  const addToOrder = (item) => {
    const tableOrders = orders[selectedTable] || [];
    const existingItem = tableOrders.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setOrders({
        ...orders,
        [selectedTable]: tableOrders.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      });
    } else {
      setOrders({
        ...orders,
        [selectedTable]: [...tableOrders, { ...item, quantity: 1 }]
      });
    }

    setRecentItems(prev => {
      const filtered = prev.filter(id => id !== item.id);
      return [item.id, ...filtered].slice(0, 8);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setOrders({
        ...orders,
        [selectedTable]: (orders[selectedTable] || []).filter(item => item.id !== itemId)
      });
    } else {
      setOrders({
        ...orders,
        [selectedTable]: (orders[selectedTable] || []).map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      });
    }
  };

  const getCurrentOrders = () => orders[selectedTable] || [];
  const getTotalAmount = () => {
    return getCurrentOrders().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRecentMenuItems = () => {
    return recentItems.map(id => MENU_ITEMS.find(item => item.id === id)).filter(Boolean);
  };

  const Sidebar = () => (
    <div className="w-16 bg-white shadow-sm border-r border-gray-100 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
        <span className="text-white font-bold text-lg">C</span>
      </div>
      
      {/* Main Navigation */}
      <div className="flex flex-col space-y-3 mb-8">
        <button
          onClick={() => setActiveSection('tables')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            activeSection === 'tables' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Home size={20} />
        </button>
        
        <button
          onClick={() => setActiveSection('menu')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            activeSection === 'menu' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          <UtensilsCrossed size={20} />
        </button>
        
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            activeSection === 'dashboard' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BarChart3 size={20} />
        </button>
      </div>
      
      {/* Secondary Navigation */}
      <div className="flex-1 flex flex-col justify-end space-y-3">
        <button className="w-12 h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all duration-200">
          <Settings size={20} />
        </button>
        <button className="w-12 h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all duration-200">
          <LogOut size={20} />
        </button>
        <button className="w-12 h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all duration-200">
          <User size={20} />
        </button>
      </div>
    </div>
  );

  const TableGrid = () => (
    <div className="p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CASHAA</h1>
        <p className="text-gray-500">Quản lý bàn ăn</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
          />
        </div>
        <button className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-all duration-200">
          <Filter size={20} className="text-gray-600" />
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShowRecent(false)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            !showRecent 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Bàn ăn
        </button>
        <button
          onClick={() => setShowRecent(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            showRecent 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Gần đây
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium transition-all duration-200">
          Mang về
        </button>
      </div>

      {/* Content */}
      {!showRecent ? (
        <div className="grid grid-cols-8 gap-3">
          {Object.values(tables).map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                selectedTable === table.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : table.status === 'occupied'
                  ? 'bg-red-50 text-red-600 border-2 border-red-200'
                  : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="text-lg mb-1">
                {table.status === 'occupied' ? '🔴' : '⚪'}
              </div>
              <div className="font-semibold text-xs">{table.id}</div>
              {table.status === 'occupied' && (
                <div className="text-xs opacity-75">
                  {table.customers}
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {getRecentMenuItems().map((item) => (
            <div
              key={item.id}
              onClick={() => addToOrder(item)}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-300 cursor-pointer transition-all duration-200 hover:shadow-lg group"
            >
              <div className="w-full h-16 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{item.category}</p>
              <p className="text-orange-600 font-bold text-sm">{item.price.toLocaleString('vi-VN')} VND</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const MenuSection = () => (
    <div className="p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thực đơn</h1>
        <p className="text-gray-500">Chọn món ăn cho bàn {selectedTable}</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => addToOrder(item)}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-300 cursor-pointer transition-all duration-200 hover:shadow-lg group"
          >
            <div className="w-full h-20 bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
            <p className="text-orange-600 font-bold">{item.price.toLocaleString('vi-VN')} VND</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bảng điều khiển</h1>
        <p className="text-gray-500">Tổng quan hoạt động nhà hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Tổng doanh thu</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">2,450,000đ</p>
          <p className="text-sm text-green-600">+12% từ hôm qua</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Số đơn hàng</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">147</p>
          <p className="text-sm text-blue-600">+8% từ hôm qua</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Bàn đang sử dụng</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{Object.values(tables).filter(t => t.status === 'occupied').length}/32</p>
          <p className="text-sm text-orange-600">15% công suất</p>
        </div>
      </div>

      {/* Tables Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Trạng thái bàn</h3>
        <div className="grid grid-cols-8 gap-2">
          {Object.values(tables).slice(0, 32).map((table) => (
            <div
              key={table.id}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${
                table.status === 'occupied'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <div className="text-sm mb-1">
                {table.status === 'occupied' ? '🔴' : '⚪'}
              </div>
              <div className="font-semibold">{table.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OrderPanel = () => {
    const currentOrders = getCurrentOrders();
    const totalAmount = getTotalAmount();

    return (
      <div className="w-80 bg-white border-l border-gray-100 flex flex-col h-screen">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-1">BÀN {selectedTable}</h2>
          <p className="text-sm text-gray-500 flex items-center">
            <Users size={16} className="mr-1" />
            {tables[selectedTable]?.status === 'occupied' ? 
              `${tables[selectedTable]?.customers} khách` : 
              'Bàn trống'
            }
          </p>
        </div>

        {/* Order Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Chưa có món nào</p>
              <p className="text-sm text-gray-400 mt-1">Thêm món từ thực đơn</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentOrders.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-orange-600 font-medium mb-3">
                        {item.price.toLocaleString('vi-VN')} VND
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Số lượng:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Section - Fixed */}
        {currentOrders.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 p-6">
            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
              <h3 className="text-lg font-bold text-orange-600 text-center mb-4">PHIẾU THANH TOÁN</h3>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">GHI CHÚ BÀN:</span>
                  <span className="font-medium">Bàn {selectedTable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MÃ ĐƠN HÀNG:</span>
                  <span className="font-medium">#{String(selectedTable).padStart(3, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VÀO:</span>
                  <span className="font-medium">{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">TỔNG TÍNH:</span>
                  <span className="text-xl font-bold text-orange-600">
                    {totalAmount.toLocaleString('vi-VN')} VND
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg">
                THANH TOÁN
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 transition-colors flex items-center justify-center gap-2">
                <Printer size={18} />
                IN BILL
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 transition-colors flex items-center justify-center gap-2">
                <FileText size={18} />
                IN ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {activeSection === 'tables' && <TableGrid />}
          {activeSection === 'menu' && <MenuSection />}
          {activeSection === 'dashboard' && <Dashboard />}
        </div>
        
        <OrderPanel />
      </div>
    </div>
  );
}

export default App;