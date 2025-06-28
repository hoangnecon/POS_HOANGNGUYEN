import React, { useState, useEffect } from 'react';
import './App.css';

const MENU_ITEMS = [
  { id: 1, name: 'Phở Bò', category: 'Phở', price: 65000, image: '🍜' },
  { id: 2, name: 'Phở Gà', category: 'Phở', price: 60000, image: '🍜' },
  { id: 3, name: 'Bún Bò Huế', category: 'Bún', price: 70000, image: '🍲' },
  { id: 4, name: 'Bún Chả', category: 'Bún', price: 75000, image: '🍲' },
  { id: 5, name: 'Cơm Tấm', category: 'Cơm', price: 80000, image: '🍚' },
  { id: 6, name: 'Cơm Gà', category: 'Cơm', price: 85000, image: '🍚' },
  { id: 7, name: 'Bánh Mì', category: 'Bánh', price: 25000, image: '🥖' },
  { id: 8, name: 'Bánh Cuốn', category: 'Bánh', price: 35000, image: '🥟' },
  { id: 9, name: 'Chả Cá', category: 'Món chính', price: 120000, image: '🐟' },
  { id: 10, name: 'Nem Nướng', category: 'Món chính', price: 90000, image: '🥢' },
];

const CATEGORIES = ['Tất cả', 'Phở', 'Bún', 'Cơm', 'Bánh', 'Món chính', 'Đồ uống'];

function App() {
  const [activeSection, setActiveSection] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [showRecent, setShowRecent] = useState(false);
  const [orders, setOrders] = useState({});
  const [recentItems, setRecentItems] = useState([1, 3, 5, 7]); // Recent menu item IDs

  // Initialize tables with some having orders
  const [tables, setTables] = useState(() => {
    const initialTables = {};
    for (let i = 1; i <= 12; i++) {
      initialTables[i] = {
        id: i,
        status: i === 1 || i === 3 || i === 7 ? 'occupied' : 'available',
        customers: i === 1 ? 4 : i === 3 ? 2 : i === 7 ? 6 : 0
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

    // Update recent items
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
    <div className="w-16 lg:w-20 bg-gray-100 h-full flex flex-col items-center py-6 space-y-6">
      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">C</span>
      </div>
      
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setActiveSection('tables')}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeSection === 'tables' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </button>
        
        <button
          onClick={() => setActiveSection('menu')}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeSection === 'menu' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
        
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeSection === 'dashboard' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </button>
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="flex flex-col space-y-4">
        <button className="w-12 h-12 rounded-lg bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
          </svg>
        </button>
        
        <button className="w-12 h-12 rounded-lg bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
          </svg>
        </button>
        
        <button className="w-12 h-12 rounded-lg bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );

  const TableGrid = () => (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm món ăn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        <button className="lg:w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setShowRecent(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !showRecent ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Bàn ăn
          </button>
          <button
            onClick={() => setShowRecent(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showRecent ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Gần đây
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
            Mang về
          </button>
        </div>
      </div>

      {!showRecent ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Object.values(tables).map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 ${
                selectedTable === table.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : table.status === 'occupied'
                  ? 'bg-red-100 text-red-800 border-2 border-red-200'
                  : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="text-2xl mb-2">
                {table.status === 'occupied' ? '💻' : '🖥️'}
              </div>
              <div className="font-semibold">Bàn {table.id}</div>
              {table.status === 'occupied' && (
                <div className="text-xs mt-1 opacity-75">
                  {table.customers} khách
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
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="text-3xl mb-2">{item.image}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-orange-600 font-bold">{item.price.toLocaleString('vi-VN')}đ</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const MenuSection = () => (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm món ăn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => addToOrder(item)}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 cursor-pointer transition-all hover:shadow-md group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.image}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
            <p className="text-orange-600 font-bold text-lg">{item.price.toLocaleString('vi-VN')}đ</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Tổng doanh thu</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">2,450,000đ</p>
          <p className="text-sm text-green-600 mt-2">+12% từ hôm qua</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Số đơn hàng</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">147</p>
          <p className="text-sm text-blue-600 mt-2">+8% từ hôm qua</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Bàn đang sử dụng</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{Object.values(tables).filter(t => t.status === 'occupied').length}/12</p>
          <p className="text-sm text-orange-600 mt-2">75% công suất</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Món ăn bán chạy</h3>
          <div className="space-y-4">
            {MENU_ITEMS.slice(0, 5).map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{item.image}</div>
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{Math.floor(Math.random() * 50) + 10}</p>
                  <p className="text-sm text-gray-500">đã bán</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng thái bàn</h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.values(tables).map((table) => (
              <div
                key={table.id}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm ${
                  table.status === 'occupied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <div className="text-lg mb-1">
                  {table.status === 'occupied' ? '💻' : '🖥️'}
                </div>
                <div className="font-semibold">Bàn {table.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const OrderPanel = () => {
    const currentOrders = getCurrentOrders();
    const totalAmount = getTotalAmount();

    return (
      <div className="w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Bàn {selectedTable}</h2>
          <p className="text-sm text-gray-500">
            {tables[selectedTable]?.status === 'occupied' ? 
              `${tables[selectedTable]?.customers} khách` : 
              'Bàn trống'
            }
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {currentOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🍽️</div>
              <p className="text-gray-500">Chưa có món nào</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentOrders.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.price.toLocaleString('vi-VN')}đ</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {currentOrders.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-orange-50">
            <div className="relative">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,10 L90,10 L90,90 L10,90 Z M20,20 L80,20 L80,80 L20,80 Z"/>
                </svg>
              </div>
              
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                  <span className="text-xl font-bold text-orange-600">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Thanh toán
                  </button>
                  <button className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
                    In hóa đơn
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Lưu tạm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
            <h1 className="text-xl font-bold text-orange-500">CASHAA</h1>
          </div>
          
          {activeSection === 'tables' && <TableGrid />}
          {activeSection === 'menu' && <MenuSection />}
          {activeSection === 'dashboard' && <Dashboard />}
        </div>
        
        <div className="lg:block">
          <OrderPanel />
        </div>
      </div>
    </div>
  );
}

export default App;