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
  Users,
  Star,
  Heart,
  ChefHat,
  Coffee,
  Edit3,
  MessageSquare
} from 'lucide-react';
import './App.css';

const MENU_ITEMS = [
  { 
    id: 1, 
    name: 'Phở Bò Đặc Biệt', 
    category: 'Phở', 
    price: 89000, 
    image: 'https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop',
    description: 'Phở bò truyền thống với thịt bò tươi',
    rating: 4.8,
    isPopular: true
  },
  { 
    id: 2, 
    name: 'Phở Gà Hà Nội', 
    category: 'Phở', 
    price: 75000, 
    image: 'https://images.unsplash.com/photo-1590420882553-4f9150b71f92?w=300&h=200&fit=crop',
    description: 'Phở gà thanh đạm hương vị Hà thành',
    rating: 4.6,
    isPopular: false
  },
  { 
    id: 3, 
    name: 'Bún Bò Huế', 
    category: 'Bún', 
    price: 79000, 
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=300&h=200&fit=crop',
    description: 'Bún bò cay nồng đậm đà miền Trung',
    rating: 4.7,
    isPopular: true
  },
  { 
    id: 4, 
    name: 'Bún Chả Hà Nội', 
    category: 'Bún', 
    price: 85000, 
    image: 'https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop',
    description: 'Chả nướng thơm lừng ăn kèm bún tươi',
    rating: 4.9,
    isPopular: true
  },
  { 
    id: 5, 
    name: 'Bánh Mì Thịt Nướng', 
    category: 'Bánh', 
    price: 35000, 
    image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop',
    description: 'Bánh mì giòn với thịt nướng đậm đà',
    rating: 4.5,
    isPopular: false
  },
  { 
    id: 6, 
    name: 'Gỏi Cuốn Tôm Thịt', 
    category: 'Khai vị', 
    price: 45000, 
    image: 'https://images.pexels.com/photos/6646082/pexels-photo-6646082.jpeg?w=300&h=200&fit=crop',
    description: 'Gỏi cuốn tươi mát với tôm và thịt',
    rating: 4.4,
    isPopular: false
  },
  { 
    id: 7, 
    name: 'Cơm Tấm Sài Gòn', 
    category: 'Cơm', 
    price: 95000, 
    image: 'https://images.pexels.com/photos/6646037/pexels-photo-6646037.jpeg?w=300&h=200&fit=crop',
    description: 'Cơm tấm với sườn nướng đặc biệt',
    rating: 4.8,
    isPopular: true
  },
  { 
    id: 8, 
    name: 'Cà Phê Đen Đá', 
    category: 'Đồ uống', 
    price: 25000, 
    image: 'https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=300&h=200&fit=crop',
    description: 'Cà phê phin truyền thống đậm đà',
    rating: 4.6,
    isPopular: true
  },
  { 
    id: 9, 
    name: 'Trà Sữa Thái Xanh', 
    category: 'Đồ uống', 
    price: 39000, 
    image: 'https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop',
    description: 'Trà sữa thái xanh thơm mát',
    rating: 4.3,
    isPopular: false
  },
  { 
    id: 10, 
    name: 'Chè Ba Màu', 
    category: 'Tráng miệng', 
    price: 32000, 
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=300&h=200&fit=crop',
    description: 'Chè ba màu truyền thống mát lạnh',
    rating: 4.2,
    isPopular: false
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: UtensilsCrossed },
  { id: 'popular', name: 'Phổ biến', icon: Star },
  { id: 'Phở', name: 'Phở', icon: Coffee },
  { id: 'Bún', name: 'Bún', icon: ChefHat },
  { id: 'Cơm', name: 'Cơm', icon: UtensilsCrossed },
  { id: 'Bánh', name: 'Bánh', icon: Coffee },
  { id: 'Khai vị', name: 'Khai vị', icon: Heart },
  { id: 'Đồ uống', name: 'Đồ uống', icon: Coffee },
  { id: 'Tráng miệng', name: 'Tráng miệng', icon: Heart }
];

function App() {
  const [activeSection, setActiveSection] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRecent, setShowRecent] = useState(false);
  const [orders, setOrders] = useState({});
  const [recentItems, setRecentItems] = useState([1, 3, 4, 7, 8]);
  const [tableNotes, setTableNotes] = useState({});
  const [itemNotes, setItemNotes] = useState({});
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [currentNoteType, setCurrentNoteType] = useState('table');
  const [currentNoteTarget, setCurrentNoteTarget] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [showItemNoteDialog, setShowItemNoteDialog] = useState(false);

  // Initialize tables
  const [tables, setTables] = useState(() => {
    const initialTables = {};
    for (let i = 1; i <= 32; i++) {
      initialTables[i] = {
        id: i,
        status: [1, 3, 7, 12, 15, 18, 22].includes(i) ? 'occupied' : 'available',
        customers: [1, 3, 7, 12, 15, 18, 22].includes(i) ? Math.floor(Math.random() * 6) + 1 : 0,
        orderTime: [1, 3, 7, 12, 15, 18, 22].includes(i) ? new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : null
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
      // Remove item note when item is removed
      const itemKey = `${selectedTable}-${itemId}`;
      const newItemNotes = { ...itemNotes };
      delete newItemNotes[itemKey];
      setItemNotes(newItemNotes);
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

  const handleNoteSubmit = () => {
    if (currentNoteType === 'table') {
      setTableNotes({
        ...tableNotes,
        [selectedTable]: noteInput
      });
    } else if (currentNoteType === 'item') {
      const itemKey = `${selectedTable}-${currentNoteTarget}`;
      setItemNotes({
        ...itemNotes,
        [itemKey]: noteInput
      });
    }
    setNoteInput('');
    setShowNoteDialog(false);
    setShowItemNoteDialog(false);
  };

  const openTableNoteDialog = () => {
    setCurrentNoteType('table');
    setNoteInput(tableNotes[selectedTable] || '');
    setShowNoteDialog(true);
  };

  const openItemNoteDialog = (itemId) => {
    setCurrentNoteType('item');
    setCurrentNoteTarget(itemId);
    const itemKey = `${selectedTable}-${itemId}`;
    setNoteInput(itemNotes[itemKey] || '');
    setShowItemNoteDialog(true);
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'popular') return matchesSearch && item.isPopular;
    
    const matchesCategory = item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRecentMenuItems = () => {
    return recentItems.map(id => MENU_ITEMS.find(item => item.id === id)).filter(Boolean);
  };

  const Sidebar = () => (
    <div className="w-20 bg-gradient-to-b from-primary-900 to-primary-800 flex flex-col items-center py-8 shadow-2xl">
      {/* Logo */}
      <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      
      {/* Main Navigation */}
      <div className="flex flex-col space-y-4 mb-10">
        <button
          onClick={() => setActiveSection('tables')}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
            activeSection === 'tables' 
              ? 'bg-white text-primary-600 shadow-lg' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Home size={22} />
          {activeSection === 'tables' && (
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full" />
          )}
        </button>
        
        <button
          onClick={() => setActiveSection('menu')}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
            activeSection === 'menu' 
              ? 'bg-white text-primary-600 shadow-lg' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <UtensilsCrossed size={22} />
          {activeSection === 'menu' && (
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full" />
          )}
        </button>
        
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
            activeSection === 'dashboard' 
              ? 'bg-white text-primary-600 shadow-lg' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BarChart3 size={22} />
          {activeSection === 'dashboard' && (
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full" />
          )}
        </button>
      </div>
      
      {/* Secondary Navigation */}
      <div className="flex-1 flex flex-col justify-end space-y-4">
        <button className="w-14 h-14 rounded-2xl text-white/50 hover:text-white/80 hover:bg-white/10 flex items-center justify-center transition-all duration-300">
          <Settings size={22} />
        </button>
        <button className="w-14 h-14 rounded-2xl text-white/50 hover:text-white/80 hover:bg-white/10 flex items-center justify-center transition-all duration-300">
          <LogOut size={22} />
        </button>
        <button className="w-14 h-14 rounded-2xl text-white/50 hover:text-white/80 hover:bg-white/10 flex items-center justify-center transition-all duration-300">
          <User size={22} />
        </button>
      </div>
    </div>
  );

  const TableGrid = () => (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-headline mb-3">
          CASHAA
        </h1>
        <p className="text-primary-paragraph text-lg">Quản lý bàn ăn hiện đại</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-paragraph" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-primary-main border border-primary-stroke rounded-2xl focus:ring-2 focus:ring-primary-highlight focus:border-primary-highlight transition-all duration-300 text-lg"
          />
        </div>
        <button className="w-16 h-16 bg-primary-main hover:bg-primary-secondary border border-primary-stroke rounded-2xl flex items-center justify-center transition-all duration-300">
          <Filter size={22} className="text-primary-button" />
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setShowRecent(false)}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
            !showRecent 
              ? 'bg-primary-button text-primary-main shadow-lg border-primary-button' 
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary border-primary-stroke'
          }`}
        >
          Sơ đồ bàn
        </button>
        <button
          onClick={() => setShowRecent(true)}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
            showRecent 
              ? 'bg-primary-button text-primary-main shadow-lg border-primary-button' 
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary border-primary-stroke'
          }`}
        >
          Món gần đây
        </button>
        <button className="px-6 py-3 bg-primary-main text-primary-button rounded-2xl hover:bg-primary-secondary font-semibold transition-all duration-300 border border-primary-stroke">
          Mang về
        </button>
      </div>

      {/* Content */}
      {!showRecent ? (
        <div className="grid grid-cols-8 gap-4">
          {Object.values(tables).map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg border-2 ${
                selectedTable === table.id
                  ? 'bg-primary-button text-primary-main shadow-xl border-primary-button'
                  : table.status === 'occupied'
                  ? 'bg-primary-tertiary text-primary-main shadow-xl border-primary-tertiary'
                  : 'bg-primary-main text-primary-button border-primary-stroke hover:border-primary-highlight hover:bg-primary-secondary'
              }`}
            >
              <div className="text-lg mb-1">
                {table.status === 'occupied' ? '🟢' : '⚪'}
              </div>
              <div className="font-bold text-sm">{table.id}</div>
              {table.status === 'occupied' && (
                <>
                  <div className="text-xs opacity-80 mt-1">
                    {table.customers} người
                  </div>
                  <div className="text-xs opacity-70">
                    {table.orderTime}
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getRecentMenuItems().map((item) => (
            <div
              key={item.id}
              onClick={() => addToOrder(item)}
              className="bg-primary-main rounded-3xl p-6 border border-primary-stroke hover:border-primary-highlight cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="w-full h-32 bg-primary-secondary rounded-2xl mb-4 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-primary-headline text-lg">{item.name}</h3>
                {item.isPopular && (
                  <div className="w-6 h-6 bg-primary-highlight rounded-full flex items-center justify-center">
                    <Star size={12} className="text-primary-main" />
                  </div>
                )}
              </div>
              <p className="text-sm text-primary-paragraph mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-primary-button font-bold text-xl">{item.price.toLocaleString('vi-VN')}đ</p>
                <div className="flex items-center text-primary-highlight">
                  <Star size={14} className="fill-current" />
                  <span className="text-xs text-primary-paragraph ml-1">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const MenuSection = () => (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-headline mb-3">
          Khám phá thực đơn
        </h1>
        <p className="text-primary-paragraph text-lg">Chọn món ăn ngon cho bàn {selectedTable}</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-paragraph" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-primary-main border border-primary-stroke rounded-2xl focus:ring-2 focus:ring-primary-highlight focus:border-primary-highlight transition-all duration-300 text-lg"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                selectedCategory === category.id
                  ? 'bg-primary-button text-primary-main shadow-lg border-primary-button'
                  : 'bg-primary-main text-primary-button hover:bg-primary-secondary border-primary-stroke'
              }`}
            >
              <IconComponent size={18} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => addToOrder(item)}
            className="bg-primary-main rounded-3xl p-6 border border-primary-stroke hover:border-primary-highlight cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="relative">
              <div className="w-full h-40 bg-primary-secondary rounded-2xl mb-4 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              {item.isPopular && (
                <div className="absolute top-3 right-3 bg-primary-highlight text-primary-main px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={12} className="fill-current" />
                  Phổ biến
                </div>
              )}
            </div>
            
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-primary-headline text-lg flex-1">{item.name}</h3>
              <div className="flex items-center text-primary-highlight ml-2">
                <Star size={14} className="fill-current" />
                <span className="text-xs text-primary-paragraph ml-1">{item.rating}</span>
              </div>
            </div>
            
            <p className="text-sm text-primary-paragraph mb-3 line-clamp-2">{item.description}</p>
            <p className="text-sm text-primary-button font-medium mb-4">{item.category}</p>
            
            <div className="flex items-center justify-between">
              <p className="text-primary-button font-bold text-xl">{item.price.toLocaleString('vi-VN')}đ</p>
              <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Plus size={18} className="text-primary-main" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-headline mb-3">
          Bảng điều khiển
        </h1>
        <p className="text-primary-paragraph text-lg">Tổng quan hoạt động nhà hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-primary-main rounded-3xl p-8 border border-primary-stroke shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary-headline">Doanh thu hôm nay</h3>
            <div className="w-12 h-12 bg-primary-highlight rounded-2xl flex items-center justify-center">
              <BarChart3 size={24} className="text-primary-main" />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary-headline mb-3">3,250,000đ</p>
          <p className="text-sm text-primary-highlight flex items-center">
            <span className="text-primary-tertiary">↗</span>
            <span className="ml-1">+15.5% từ hôm qua</span>
          </p>
        </div>

        <div className="bg-primary-main rounded-3xl p-8 border border-primary-stroke shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary-headline">Đơn hàng</h3>
            <div className="w-12 h-12 bg-primary-button rounded-2xl flex items-center justify-center">
              <Receipt size={24} className="text-primary-main" />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary-headline mb-3">184</p>
          <p className="text-sm text-primary-button flex items-center">
            <span className="text-primary-tertiary">↗</span>
            <span className="ml-1">+12% từ hôm qua</span>
          </p>
        </div>

        <div className="bg-primary-main rounded-3xl p-8 border border-primary-stroke shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary-headline">Bàn hoạt động</h3>
            <div className="w-12 h-12 bg-primary-tertiary rounded-2xl flex items-center justify-center">
              <Users size={24} className="text-primary-main" />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary-headline mb-3">{Object.values(tables).filter(t => t.status === 'occupied').length}/32</p>
          <p className="text-sm text-primary-tertiary flex items-center">
            <span className="text-primary-tertiary">◐</span>
            <span className="ml-1">22% công suất</span>
          </p>
        </div>
      </div>

      {/* Tables Overview */}
      <div className="bg-primary-main rounded-3xl p-8 border border-primary-stroke shadow-xl">
        <h3 className="text-2xl font-bold text-primary-headline mb-6">Trạng thái bàn chi tiết</h3>
        <div className="grid grid-cols-8 gap-3">
          {Object.values(tables).slice(0, 32).map((table) => (
            <div
              key={table.id}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm transition-all duration-300 border-2 ${
                table.status === 'occupied'
                  ? 'bg-primary-tertiary text-primary-main shadow-lg border-primary-tertiary'
                  : 'bg-primary-highlight text-primary-main shadow-lg border-primary-highlight'
              }`}
            >
              <div className="text-base mb-1">
                {table.status === 'occupied' ? '🟢' : '⚪'}
              </div>
              <div className="font-bold">{table.id}</div>
              {table.status === 'occupied' && (
                <div className="text-xs opacity-80 mt-1">
                  {table.customers}
                </div>
              )}
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
      <div className="w-[480px] bg-primary-main border-l border-primary-stroke flex flex-col h-screen shadow-2xl">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-primary-stroke bg-primary-main">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-button rounded-xl flex items-center justify-center">
              <span className="text-primary-main font-bold text-lg">{selectedTable}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-headline">BÀN {selectedTable}</h2>
              <p className="text-xs text-primary-paragraph flex items-center">
                <Users size={14} className="mr-1 text-primary-button" />
                {tables[selectedTable]?.status === 'occupied' ? 
                  `${tables[selectedTable]?.customers} khách • ${tables[selectedTable]?.orderTime}` : 
                  'Bàn trống'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Order Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-primary-button" />
              </div>
              <h3 className="text-lg font-bold text-primary-headline mb-1">Chưa có món nào</h3>
              <p className="text-primary-paragraph text-sm">Thêm món từ thực đơn</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentOrders.map((item) => {
                const itemKey = `${selectedTable}-${item.id}`;
                const itemNote = itemNotes[itemKey];
                return (
                  <div key={item.id} className="bg-primary-secondary rounded-2xl p-4 border border-primary-stroke">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary-bg rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-primary-headline text-sm truncate">{item.name}</h4>
                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="text-primary-paragraph hover:text-primary-tertiary transition-colors ml-2 p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-primary-paragraph mb-2">{item.description}</p>
                        
                        {/* Item Note */}
                        {itemNote ? (
                          <div className="bg-primary-bg rounded-lg p-2 mb-2 border border-primary-stroke">
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-primary-paragraph">{itemNote}</p>
                              <button
                                onClick={() => openItemNoteDialog(item.id)}
                                className="text-primary-button hover:text-primary-highlight"
                              >
                                <Edit3 size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => openItemNoteDialog(item.id)}
                            className="flex items-center gap-1 text-xs text-primary-button hover:text-primary-highlight mb-2"
                          >
                            <MessageSquare size={12} />
                            Thêm ghi chú
                          </button>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-primary-button font-bold text-lg">
                            {item.price.toLocaleString('vi-VN')}đ
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-xl bg-primary-bg hover:bg-primary-stroke flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-primary-headline">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-xl bg-primary-button hover:bg-primary-highlight text-primary-main flex items-center justify-center transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Payment Section - Fixed */}
        {currentOrders.length > 0 && (
          <div className="border-t border-primary-stroke bg-primary-secondary p-6">
            <div className="bg-primary-main rounded-2xl p-4 mb-4 border border-primary-stroke shadow-lg">
              <h3 className="text-lg font-bold text-center text-primary-headline mb-4">
                PHIẾU THANH TOÁN
              </h3>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Bàn số:</span>
                  <span className="font-bold text-primary-button">#{String(selectedTable).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Thời gian:</span>
                  <span className="font-bold text-primary-headline">{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Số món:</span>
                  <span className="font-bold text-primary-headline">{currentOrders.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                
                {/* Table Note */}
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Ghi chú bàn:</span>
                  <button
                    onClick={openTableNoteDialog}
                    className="text-primary-button hover:text-primary-highlight flex items-center gap-1"
                  >
                    {tableNotes[selectedTable] ? (
                      <span className="font-medium text-xs max-w-32 truncate">{tableNotes[selectedTable]}</span>
                    ) : (
                      <>
                        <Edit3 size={12} />
                        <span className="text-xs">Thêm ghi chú</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="border-t border-primary-stroke pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-headline">TỔNG CỘNG:</span>
                  <span className="text-xl font-bold text-primary-button">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-3 rounded-xl font-bold text-lg transition-all shadow-lg">
                THANH TOÁN
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-primary-main hover:bg-primary-secondary text-primary-button py-2 rounded-xl font-bold border border-primary-stroke transition-all flex items-center justify-center gap-1">
                  <Printer size={16} />
                  <span className="text-xs">IN HÓA ĐƠN</span>
                </button>
                <button className="bg-primary-main hover:bg-primary-secondary text-primary-button py-2 rounded-xl font-bold border border-primary-stroke transition-all flex items-center justify-center gap-1">
                  <FileText size={16} />
                  <span className="text-xs">GỬI BẾP</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Note Dialog */}
        {(showNoteDialog || showItemNoteDialog) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md border border-primary-stroke">
              <h3 className="text-lg font-bold text-primary-headline mb-4">
                {currentNoteType === 'table' ? 'Ghi chú bàn' : 'Ghi chú món ăn'}
              </h3>
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Nhập ghi chú..."
                className="w-full h-24 p-3 border border-primary-stroke rounded-xl bg-primary-secondary text-primary-headline resize-none focus:ring-2 focus:ring-primary-highlight"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleNoteSubmit}
                  className="flex-1 bg-primary-button text-primary-main py-2 rounded-xl font-bold"
                >
                  Lưu
                </button>
                <button
                  onClick={() => {
                    setShowNoteDialog(false);
                    setShowItemNoteDialog(false);
                    setNoteInput('');
                  }}
                  className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold border border-primary-stroke"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-primary-bg flex overflow-hidden">
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