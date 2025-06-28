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
  Clock,
  Users,
  Star,
  Heart,
  ChefHat,
  Coffee,
  Edit3,
  MessageSquare,
  Eye,
  PieChart,
  TrendingUp,
  Calendar,
  DollarSign,
  CreditCard,
  Banknote,
  Trash2,
  CalendarDays,
  ArrowLeft,
  Check,
  Percent,
  Calculator
} from 'lucide-react';
import './App.css';

const MENU_ITEMS = [
  { 
    id: 1, 
    name: 'Phở Bò Đặc Biệt', 
    category: 'Phở', 
    price: 89000, 
    image: 'https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'regular'
  },
  { 
    id: 2, 
    name: 'Phở Gà Hà Nội', 
    category: 'Phở', 
    price: 75000, 
    image: 'https://images.unsplash.com/photo-1590420882553-4f9150b71f92?w=300&h=200&fit=crop',
    isPopular: false,
    menuType: 'regular'
  },
  { 
    id: 3, 
    name: 'Bún Bò Huế', 
    category: 'Bún', 
    price: 79000, 
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'regular'
  },
  { 
    id: 4, 
    name: 'Bún Chả Hà Nội', 
    category: 'Bún', 
    price: 85000, 
    image: 'https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'regular'
  },
  { 
    id: 5, 
    name: 'Bánh Mì Thịt Nướng', 
    category: 'Bánh', 
    price: 35000, 
    image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop',
    isPopular: false,
    menuType: 'regular'
  },
  { 
    id: 6, 
    name: 'Gỏi Cuốn Tôm Thịt', 
    category: 'Khai vị', 
    price: 45000, 
    image: 'https://images.pexels.com/photos/6646082/pexels-photo-6646082.jpeg?w=300&h=200&fit=crop',
    isPopular: false,
    menuType: 'regular'
  },
  { 
    id: 7, 
    name: 'Cơm Tấm Sài Gòn', 
    category: 'Cơm', 
    price: 95000, 
    image: 'https://images.pexels.com/photos/6646037/pexels-photo-6646037.jpeg?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'regular'
  },
  { 
    id: 8, 
    name: 'Cà Phê Đen Đá', 
    category: 'Đồ uống', 
    price: 25000, 
    image: 'https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'regular'
  },
  // Holiday menu items
  { 
    id: 11, 
    name: 'Phở Bò Đặc Biệt Tết', 
    category: 'Phở', 
    price: 120000, 
    image: 'https://images.unsplash.com/photo-1533787761082-492a5b83e614?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'holiday'
  },
  { 
    id: 12, 
    name: 'Bánh Chưng Chiên', 
    category: 'Món Tết', 
    price: 65000, 
    image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'holiday'
  },
  { 
    id: 13, 
    name: 'Thịt Kho Tàu', 
    category: 'Món Tết', 
    price: 150000, 
    image: 'https://images.pexels.com/photos/2059153/pexels-photo-2059153.jpeg?w=300&h=200&fit=crop',
    isPopular: true,
    menuType: 'holiday'
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
  { id: 'Món Tết', name: 'Món Tết', icon: Star }
];

const MENU_TYPES = [
  { id: 'regular', name: 'Thực đơn thường ngày' },
  { id: 'holiday', name: 'Thực đơn Tết' }
];

// Mock data for analytics with different dates
const MOCK_ORDERS_BY_DATE = {
  '2024-01-15': [
    {
      id: 'ORD001',
      tableNumber: 5,
      date: '2024-01-15',
      time: '14:30',
      cashier: 'Nguyễn Văn A',
      paymentMethod: 'cash',
      total: 245000,
      items: [
        { name: 'Phở Bò Đặc Biệt', quantity: 2, price: 89000 },
        { name: 'Cà Phê Đen Đá', quantity: 2, price: 25000 },
        { name: 'Bánh Mì Thịt Nướng', quantity: 1, price: 35000 }
      ]
    },
    {
      id: 'ORD002',
      tableNumber: 12,
      date: '2024-01-15',
      time: '15:45',
      cashier: 'Trần Thị B',
      paymentMethod: 'transfer',
      total: 190000,
      items: [
        { name: 'Bún Bò Huế', quantity: 2, price: 79000 },
        { name: 'Trà Sữa Thái Xanh', quantity: 1, price: 39000 }
      ]
    }
  ],
  '2024-01-14': [
    {
      id: 'ORD003',
      tableNumber: 8,
      date: '2024-01-14',
      time: '16:20',
      cashier: 'Lê Văn C',
      paymentMethod: 'cash',
      total: 180000,
      items: [
        { name: 'Bún Chả Hà Nội', quantity: 2, price: 85000 },
        { name: 'Cà Phê Đen Đá', quantity: 1, price: 25000 }
      ]
    }
  ]
};

function App() {
  const [activeSection, setActiveSection] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMenuType, setSelectedMenuType] = useState('regular');
  const [orders, setOrders] = useState({});
  const [recentItems, setRecentItems] = useState([1, 3, 4, 7, 8]);
  const [tableNotes, setTableNotes] = useState({});
  const [itemNotes, setItemNotes] = useState({});
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [currentNoteType, setCurrentNoteType] = useState('table');
  const [currentNoteTarget, setCurrentNoteTarget] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [showItemNoteDialog, setShowItemNoteDialog] = useState(false);
  const [tableFilter, setTableFilter] = useState('all'); // 'all', 'available', 'used'
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'transfer'
  const [discountType, setDiscountType] = useState('none'); // 'none', 'percent', 'amount'
  const [discountValue, setDiscountValue] = useState(0);
  const [partialPayment, setPartialPayment] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Admin states
  const [adminSection, setAdminSection] = useState('dashboard');
  const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newMenuType, setNewMenuType] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Nguyễn Văn A', role: 'Thu ngân', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', role: 'Bếp trưởng', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Lê Văn C', role: 'Phục vụ', status: 'active', joinDate: '2024-01-20' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin states
  const [adminSection, setAdminSection] = useState('dashboard');
  const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newMenuType, setNewMenuType] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Nguyễn Văn A', role: 'Thu ngân', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', role: 'Bếp trưởng', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Lê Văn C', role: 'Phục vụ', status: 'active', joinDate: '2024-01-20' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin states
  const [adminSection, setAdminSection] = useState('dashboard');
  const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newMenuType, setNewMenuType] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Nguyễn Văn A', role: 'Thu ngân', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', role: 'Bếp trưởng', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Lê Văn C', role: 'Phục vụ', status: 'active', joinDate: '2024-01-20' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin states
  const [adminSection, setAdminSection] = useState('dashboard');
  const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newMenuType, setNewMenuType] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Nguyễn Văn A', role: 'Thu ngân', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', role: 'Bếp trưởng', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Lê Văn C', role: 'Phục vụ', status: 'active', joinDate: '2024-01-20' }
  ]);
  
  // Dashboard states
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Initialize tables
  const [tables, setTables] = useState(() => {
    const initialTables = {};
    for (let i = 1; i <= 32; i++) {
      initialTables[i] = {
        id: i,
        status: [1, 3, 7, 12, 15, 18, 22].includes(i) ? 'occupied' : 'available',
        orderTime: [1, 3, 7, 12, 15, 18, 22].includes(i) ? new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : null
      };
    }
    return initialTables;
  });

  // Authentication functions
  const handleLogin = () => {
    // Simple frontend-only login - accept any email/password
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setShowLoginPage(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginPage(true);
    setSelectedTable(null);
    setOrders({});
    setActiveSection('tables');
  };

  const handleAdminLogin = () => {
    // For admin direct access
    setShowLoginPage(true);
  };

  const addToOrder = (item) => {
    if (!selectedTable) return;
    
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
    if (!selectedTable) return;
    
    if (newQuantity === 0) {
      setOrders({
        ...orders,
        [selectedTable]: (orders[selectedTable] || []).filter(item => item.id !== itemId)
      });
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

  const clearTable = () => {
    if (!selectedTable) return;
    
    setOrders({
      ...orders,
      [selectedTable]: []
    });
    
    // Clear table notes
    const newTableNotes = { ...tableNotes };
    delete newTableNotes[selectedTable];
    setTableNotes(newTableNotes);
    
    // Clear item notes for this table
    const newItemNotes = { ...itemNotes };
    Object.keys(newItemNotes).forEach(key => {
      if (key.startsWith(`${selectedTable}-`)) {
        delete newItemNotes[key];
      }
    });
    setItemNotes(newItemNotes);
    
    setShowClearDialog(false);
  };

  const getCurrentOrders = () => selectedTable ? (orders[selectedTable] || []) : [];
  const getTotalAmount = () => {
    return getCurrentOrders().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    const total = getTotalAmount();
    if (discountType === 'percent') {
      return (total * discountValue) / 100;
    } else if (discountType === 'amount') {
      return discountValue;
    }
    return 0;
  };

  const getFinalAmount = () => {
    return getTotalAmount() - getDiscountAmount();
  };

  const getRemainingAmount = () => {
    if (partialPayment) {
      return Math.max(0, getFinalAmount() - paidAmount);
    }
    return 0;
  };

  const processPayment = () => {
    const finalAmount = getFinalAmount();
    const paymentData = {
      tableId: selectedTable,
      items: getCurrentOrders(),
      subtotal: getTotalAmount(),
      discount: getDiscountAmount(),
      total: finalAmount,
      paymentMethod: paymentMethod,
      partialPayment: partialPayment,
      paidAmount: partialPayment ? paidAmount : finalAmount,
      remainingAmount: getRemainingAmount(),
      timestamp: new Date().toISOString(),
      cashier: 'Thu ngân A' // In real app, get from auth
    };

    // In real app, save to backend
    console.log('Payment processed:', paymentData);
    
    if (!partialPayment || getRemainingAmount() === 0) {
      // Clear table if fully paid
      clearTable();
    }
    
    setShowPaymentDialog(false);
    // Show success notification in real app
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

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMenuType = item.menuType === selectedMenuType;
    
    if (selectedCategory === 'all') return matchesSearch && matchesMenuType;
    if (selectedCategory === 'popular') return matchesSearch && matchesMenuType && item.isPopular;
    
    const matchesCategory = item.category === selectedCategory;
    return matchesSearch && matchesCategory && matchesMenuType;
  });

  const getRecentMenuItems = () => {
    return recentItems.map(id => MENU_ITEMS.find(item => item.id === id)).filter(Boolean).slice(0, 6);
  };

  const getOrdersForDate = () => {
    return MOCK_ORDERS_BY_DATE[selectedDate] || [];
  };

  const getFilteredOrders = () => {
    const ordersForDate = getOrdersForDate();
    if (paymentFilter === 'all') return ordersForDate;
    return ordersForDate.filter(order => order.paymentMethod === paymentFilter);
  };

  const getRevenueByPayment = () => {
    const ordersForDate = getOrdersForDate();
    const cashRevenue = ordersForDate
      .filter(order => order.paymentMethod === 'cash')
      .reduce((sum, order) => sum + order.total, 0);
    
    const transferRevenue = ordersForDate
      .filter(order => order.paymentMethod === 'transfer')
      .reduce((sum, order) => sum + order.total, 0);
    
    return { cash: cashRevenue, transfer: transferRevenue };
  };

  const getBestSellingItems = () => {
    const ordersForDate = getOrdersForDate();
    const itemCount = {};
    ordersForDate.forEach(order => {
      order.items.forEach(item => {
        itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
      });
    });
    
    return Object.entries(itemCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  };

  const getFilteredTables = () => {
    const allTables = Object.values(tables);
    
    if (tableFilter === 'available') {
      return allTables.filter(table => !orders[table.id] || orders[table.id].length === 0);
    } else if (tableFilter === 'used') {
      return allTables.filter(table => orders[table.id] && orders[table.id].length > 0);
    }
    
    return allTables;
  };

  // Login Page Component
  const LoginPage = () => (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Login to your account</h1>
          <p className="text-gray-400 text-sm">Enter your email below to login to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-white text-sm font-medium">Password</label>
              <button className="text-orange-500 text-sm hover:text-orange-400">
                Forgot your password?
              </button>
            </div>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Login
          </button>

          <div className="text-center text-gray-400 text-sm">
            <p>Or continue with</p>
          </div>

          <button 
            onClick={() => setShowLoginPage(false)}
            className="w-full bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>🔑</span>
            Login as Admin
          </button>

          <div className="text-center text-gray-400 text-sm">
            <span>Don't have an account? </span>
            <button className="text-white hover:text-orange-400">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );

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
              ? 'bg-primary-button text-white shadow-lg' 
              : 'bg-primary-button text-white/70 hover:text-white hover:bg-primary-highlight'
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
              ? 'bg-primary-button text-white shadow-lg' 
              : 'bg-primary-button text-white/70 hover:text-white hover:bg-primary-highlight'
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
              ? 'bg-primary-button text-white shadow-lg' 
              : 'bg-primary-button text-white/70 hover:text-white hover:bg-primary-highlight'
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
        <button className="w-14 h-14 rounded-2xl bg-primary-button text-white/50 hover:text-white/80 hover:bg-primary-highlight flex items-center justify-center transition-all duration-300">
          <Settings size={22} />
        </button>
        <button 
          onClick={handleLogout}
          className="w-14 h-14 rounded-2xl bg-primary-button text-white/50 hover:text-white/80 hover:bg-primary-highlight flex items-center justify-center transition-all duration-300"
        >
          <LogOut size={22} />
        </button>
        <button className="w-14 h-14 rounded-2xl bg-primary-button text-white/50 hover:text-white/80 hover:bg-primary-highlight flex items-center justify-center transition-all duration-300">
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

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTableFilter('all')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'all' 
              ? 'bg-primary-button text-primary-main shadow-lg' 
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
          }`}
        >
          Tất cả bàn
        </button>
        <button
          onClick={() => setTableFilter('available')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'available' 
              ? 'bg-primary-button text-primary-main shadow-lg' 
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
          }`}
        >
          Còn trống
        </button>
        <button
          onClick={() => setTableFilter('used')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'used' 
              ? 'bg-primary-button text-primary-main shadow-lg' 
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
          }`}
        >
          Đã sử dụng
        </button>
      </div>

      {/* Recent Items Row */}
      {recentItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-primary-headline mb-4">Món gần đây</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {getRecentMenuItems().map((item) => (
              <button
                key={item.id}
                onClick={() => addToOrder(item)}
                className="flex-shrink-0 px-4 py-2 bg-primary-main rounded-xl hover:bg-primary-secondary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="text-sm font-medium text-primary-headline whitespace-nowrap">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table Grid */}
      <div className="grid grid-cols-8 gap-4">
        {/* Takeaway Button - First position */}
        <button
          onClick={() => setSelectedTable('takeaway')}
          className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg ${
            selectedTable === 'takeaway'
              ? 'bg-primary-button text-primary-main shadow-xl'
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
          }`}
        >
          <div className="text-lg mb-1">📦</div>
          <div className="font-bold text-xs">Mang về</div>
        </button>

        {/* Regular Tables */}
        {getFilteredTables().map((table) => {
          const hasOrders = orders[table.id] && orders[table.id].length > 0;
          return (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg ${
                selectedTable === table.id
                  ? 'bg-primary-button text-primary-main shadow-xl'
                  : hasOrders
                  ? 'bg-primary-button-light text-primary-button shadow-md'
                  : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
              }`}
            >
              <div className="text-lg mb-1">
                {hasOrders ? '🟢' : '⚪'}
              </div>
              <div className="font-bold text-sm">{table.id}</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const MenuSection = () => (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-headline mb-3">
          Khám phá thực đơn
        </h1>
        <p className="text-primary-paragraph text-lg">
          Chọn món ăn ngon cho {selectedTable === 'takeaway' ? 'đơn mang về' : `bàn ${selectedTable}`}
        </p>
      </div>

      {/* Menu Type and Search */}
      <div className="flex gap-4 mb-8">
        <select
          value={selectedMenuType}
          onChange={(e) => setSelectedMenuType(e.target.value)}
          className="px-4 py-3 bg-primary-main rounded-2xl text-primary-button focus:ring-2 focus:ring-primary-highlight min-w-48 shadow-md"
        >
          {MENU_TYPES.map((menuType) => (
            <option key={menuType.id} value={menuType.id}>
              {menuType.name}
            </option>
          ))}
        </select>
        
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-paragraph" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-primary-main rounded-2xl focus:ring-2 focus:ring-primary-highlight focus:border-transparent transition-all duration-300 shadow-md"
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
                selectedCategory === category.id
                  ? 'bg-primary-button text-primary-main shadow-lg'
                  : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
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
            className="bg-primary-main rounded-3xl p-6 hover:bg-primary-secondary cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group shadow-lg"
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
            
            <h3 className="font-bold text-primary-headline text-lg mb-2">{item.name}</h3>
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

  const Dashboard = () => {
    const revenueData = getRevenueByPayment();
    const bestSelling = getBestSellingItems();
    const filteredOrders = getFilteredOrders();
    const ordersForDate = getOrdersForDate();

    return (
      <div className="p-8 h-full overflow-y-auto bg-primary-bg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-headline mb-3">
            Bảng điều khiển
          </h1>
          <p className="text-primary-paragraph text-lg">Tổng quan hoạt động nhà hàng</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-primary-button" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-primary-main rounded-xl text-primary-button focus:ring-2 focus:ring-primary-highlight shadow-md"
            />
          </div>
          
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 bg-primary-main rounded-xl text-primary-button focus:ring-2 focus:ring-primary-highlight shadow-md"
          >
            <option value="all">Tất cả thanh toán</option>
            <option value="cash">Tiền mặt</option>
            <option value="transfer">Chuyển khoản</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary-headline">Tổng doanh thu</h3>
              <div className="w-10 h-10 bg-primary-highlight rounded-2xl flex items-center justify-center">
                <DollarSign size={20} className="text-primary-main" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary-headline mb-2">
              {(revenueData.cash + revenueData.transfer).toLocaleString('vi-VN')}đ
            </p>
            <p className="text-sm text-primary-highlight">
              {selectedDate === new Date().toISOString().split('T')[0] ? 'Hôm nay' : selectedDate}
            </p>
          </div>

          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary-headline">Tiền mặt</h3>
              <div className="w-10 h-10 bg-primary-button rounded-2xl flex items-center justify-center">
                <Banknote size={20} className="text-primary-main" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary-headline mb-2">
              {revenueData.cash.toLocaleString('vi-VN')}đ
            </p>
            <p className="text-sm text-primary-button">
              {ordersForDate.filter(o => o.paymentMethod === 'cash').length} đơn hàng
            </p>
          </div>

          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary-headline">Chuyển khoản</h3>
              <div className="w-10 h-10 bg-primary-tertiary rounded-2xl flex items-center justify-center">
                <CreditCard size={20} className="text-primary-main" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary-headline mb-2">
              {revenueData.transfer.toLocaleString('vi-VN')}đ
            </p>
            <p className="text-sm text-primary-tertiary">
              {ordersForDate.filter(o => o.paymentMethod === 'transfer').length} đơn hàng
            </p>
          </div>

          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary-headline">Tổng đơn hàng</h3>
              <div className="w-10 h-10 bg-primary-secondary rounded-2xl flex items-center justify-center">
                <Receipt size={20} className="text-primary-button" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary-headline mb-2">{ordersForDate.length}</p>
            <p className="text-sm text-primary-paragraph">
              {selectedDate === new Date().toISOString().split('T')[0] ? 'Hôm nay' : selectedDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Best Selling Items */}
          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-primary-headline mb-6">Món bán chạy nhất</h3>
            {bestSelling.length > 0 ? (
              <div className="space-y-4">
                {bestSelling.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-primary-secondary rounded-xl shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-button rounded-full flex items-center justify-center text-primary-main font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-primary-headline">{item.name}</span>
                    </div>
                    <span className="font-bold text-primary-button">{item.count} phần</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-primary-paragraph text-center py-8">Không có dữ liệu cho ngày này</p>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary-headline">Đơn hàng</h3>
              <span className="text-sm text-primary-paragraph">{filteredOrders.length} đơn hàng</span>
            </div>
            {filteredOrders.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-primary-secondary rounded-xl shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary-headline">{order.id}</span>
                        <span className="text-sm text-primary-paragraph">Bàn {order.tableNumber}</span>
                      </div>
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="text-primary-button hover:text-primary-highlight transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {order.paymentMethod === 'cash' ? (
                          <Banknote size={14} className="text-primary-button" />
                        ) : (
                          <CreditCard size={14} className="text-primary-tertiary" />
                        )}
                        <span className="text-sm text-primary-paragraph">
                          {order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                        </span>
                      </div>
                      <span className="font-bold text-primary-button">{order.total.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-primary-paragraph">
                      <span>{order.date} • {order.time}</span>
                      <span>Thu ngân: {order.cashier}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-primary-paragraph text-center py-8">Không có đơn hàng cho ngày này</p>
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-primary-headline">Chi tiết đơn hàng {selectedOrder.id}</h3>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-primary-paragraph hover:text-primary-headline"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-primary-headline mb-3">Thông tin đơn hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-paragraph">Mã đơn:</span>
                      <span className="font-medium text-primary-headline">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-paragraph">Bàn số:</span>
                      <span className="font-medium text-primary-headline">{selectedOrder.tableNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-paragraph">Ngày giờ:</span>
                      <span className="font-medium text-primary-headline">{selectedOrder.date} {selectedOrder.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-paragraph">Thu ngân:</span>
                      <span className="font-medium text-primary-headline">{selectedOrder.cashier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-paragraph">Thanh toán:</span>
                      <div className="flex items-center gap-1">
                        {selectedOrder.paymentMethod === 'cash' ? (
                          <Banknote size={14} className="text-primary-button" />
                        ) : (
                          <CreditCard size={14} className="text-primary-tertiary" />
                        )}
                        <span className="font-medium text-primary-headline">
                          {selectedOrder.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-primary-headline mb-3">Tổng kết</h4>
                  <div className="bg-primary-secondary rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-headline">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-primary-button">
                        {selectedOrder.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-primary-headline mb-3">Chi tiết món ăn</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-primary-secondary rounded-xl shadow-md">
                      <div>
                        <span className="font-medium text-primary-headline">{item.name}</span>
                        <span className="text-sm text-primary-paragraph ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold text-primary-button">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const OrderPanel = () => {
    const currentOrders = getCurrentOrders();
    const totalAmount = getTotalAmount();

    return (
      <div className="w-[480px] bg-primary-main flex flex-col h-screen shadow-2xl">
        {/* Header - Fixed */}
        <div className="p-6 bg-primary-main shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-button rounded-xl flex items-center justify-center">
                <span className="text-primary-main font-bold text-lg">
                  {selectedTable === 'takeaway' ? '📦' : selectedTable || '?'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-headline">
                  {selectedTable === 'takeaway' ? 'MANG VỀ' : `BÀN ${selectedTable || '?'}`}
                </h2>
                <p className="text-xs text-primary-paragraph">
                  {selectedTable === 'takeaway' ? 'Đơn hàng mang về' : 'Đơn hàng tại bàn'}
                </p>
              </div>
            </div>
            
            {currentOrders.length > 0 && (
              <button
                onClick={() => setShowClearDialog(true)}
                className="text-primary-paragraph hover:text-primary-tertiary transition-colors p-2"
              >
                <Trash2 size={20} />
              </button>
            )}
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
              <p className="text-primary-paragraph text-sm">
                {selectedTable ? 'Thêm món từ thực đơn' : 'Chọn bàn để bắt đầu'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentOrders.map((item) => {
                const itemKey = `${selectedTable}-${item.id}`;
                const itemNote = itemNotes[itemKey];
                return (
                  <div key={item.id} className="bg-primary-secondary rounded-2xl p-4 shadow-md">
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
                        
                        {/* Item Note */}
                        {itemNote ? (
                          <div className="bg-primary-bg rounded-lg p-2 mb-2 shadow-sm">
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
          <div className="bg-primary-secondary p-6 shadow-inner">
            <div className="bg-primary-main rounded-2xl p-4 mb-4 shadow-lg">
              <h3 className="text-lg font-bold text-center text-primary-headline mb-4">
                PHIẾU THANH TOÁN
              </h3>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">
                    {selectedTable === 'takeaway' ? 'Mang về:' : 'Bàn số:'}
                  </span>
                  <span className="font-bold text-primary-button">
                    {selectedTable === 'takeaway' ? 'Mang về' : `#${String(selectedTable).padStart(2, '0')}`}
                  </span>
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
                  <span className="text-primary-paragraph">Ghi chú:</span>
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
              <button 
                className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-3 rounded-xl font-bold text-lg transition-all shadow-lg"
                onClick={() => setShowPaymentDialog(true)}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        )}

        {/* Clear Table Dialog */}
        {showClearDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
              <h3 className="text-lg font-bold text-primary-headline mb-4">Xác nhận xóa</h3>
              <p className="text-primary-paragraph mb-6">
                Bạn có chắc chắn muốn xóa tất cả món ăn trong{' '}
                {selectedTable === 'takeaway' ? 'đơn mang về' : `bàn ${selectedTable}`}?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={clearTable}
                  className="flex-1 bg-primary-tertiary text-primary-main py-2 rounded-xl font-bold shadow-md"
                >
                  Xóa
                </button>
                <button
                  onClick={() => setShowClearDialog(false)}
                  className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md"
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

  // Payment Dialog Component
  const PaymentDialog = () => {
    const currentOrders = getCurrentOrders();
    const subtotal = getTotalAmount();
    const discountAmount = getDiscountAmount();
    const finalAmount = getFinalAmount();

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-primary-main rounded-3xl w-full max-w-5xl max-h-[90vh] shadow-2xl flex overflow-hidden">
          {/* Left side - Order details */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="w-12 h-12 bg-primary-secondary rounded-xl flex items-center justify-center hover:bg-primary-highlight transition-colors"
              >
                <ArrowLeft size={20} className="text-primary-button" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-primary-headline">Thanh toán</h1>
                <p className="text-primary-paragraph">
                  {selectedTable === 'takeaway' ? 'Đơn mang về' : `Bàn ${selectedTable}`}
                </p>
              </div>
            </div>

            {/* Order Items - Scrollable */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-headline mb-4">Chi tiết đơn hàng</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {currentOrders.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-primary-secondary rounded-xl shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-bg rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-headline">{item.name}</h4>
                        <p className="text-sm text-primary-paragraph">Số lượng: {item.quantity}</p>
                        <p className="text-sm text-primary-button font-medium">{item.price.toLocaleString('vi-VN')}đ x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-button">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-headline mb-4">Giảm giá</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => setDiscountType('none')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'none' 
                      ? 'bg-primary-button text-primary-main' 
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  Không giảm
                </button>
                <button
                  onClick={() => setDiscountType('percent')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'percent' 
                      ? 'bg-primary-button text-primary-main' 
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  <Percent size={16} className="inline mr-1" />
                  Theo %
                </button>
                <button
                  onClick={() => setDiscountType('amount')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'amount' 
                      ? 'bg-primary-button text-primary-main' 
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  <DollarSign size={16} className="inline mr-1" />
                  Số tiền
                </button>
              </div>
              
              {discountType !== 'none' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    placeholder={discountType === 'percent' ? 'Nhập % giảm' : 'Nhập số tiền giảm'}
                    className="flex-1 p-3 bg-primary-secondary rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                  />
                  <span className="text-primary-paragraph">
                    {discountType === 'percent' ? '%' : 'VND'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-primary-secondary rounded-xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-primary-paragraph">Tạm tính:</span>
                  <span className="font-bold text-primary-headline">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-lg text-red-600">
                    <span>Giảm giá:</span>
                    <span className="font-bold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                
                <div className="border-t border-primary-stroke pt-3">
                  <div className="flex justify-between text-2xl">
                    <span className="font-bold text-primary-headline">Tổng cộng:</span>
                    <span className="font-bold text-primary-button">{finalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Payment options */}
          <div className="w-80 bg-primary-secondary p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-primary-headline mb-6">Phương thức thanh toán</h2>
            
            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-primary-headline mb-3">Hình thức</h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl font-medium transition-all shadow-md ${
                    paymentMethod === 'cash' 
                      ? 'bg-primary-button text-primary-main' 
                      : 'bg-primary-main text-primary-button'
                  }`}
                >
                  <Banknote size={20} className="inline mr-2" />
                  Tiền mặt
                </button>
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-xl font-medium transition-all shadow-md ${
                    paymentMethod === 'transfer' 
                      ? 'bg-primary-button text-primary-main' 
                      : 'bg-primary-main text-primary-button'
                  }`}
                >
                  <CreditCard size={20} className="inline mr-2" />
                  Chuyển khoản
                </button>
              </div>
            </div>

            {/* Partial Payment */}
            <div className="mb-6">
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={partialPayment}
                  onChange={(e) => setPartialPayment(e.target.checked)}
                  className="w-5 h-5 text-primary-button"
                />
                <span className="text-lg font-bold text-primary-headline">Thanh toán một phần</span>
              </label>
              
              {partialPayment && (
                <div className="space-y-3">
                  <input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    placeholder="Số tiền thanh toán"
                    className="w-full p-3 bg-primary-main rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                  />
                  <div className="text-sm text-primary-paragraph">
                    <p>Còn lại: <span className="font-bold text-primary-tertiary">{getRemainingAmount().toLocaleString('vi-VN')}đ</span></p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-primary-headline mb-3">Số tiền nhanh</h3>
              <div className="grid grid-cols-2 gap-2">
                {[50000, 100000, 200000, 500000, 1000000, 2000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => partialPayment ? setPaidAmount(amount) : null}
                    className="p-2 bg-primary-main hover:bg-primary-button hover:text-primary-main rounded-lg text-sm font-medium transition-all shadow-md"
                  >
                    {(amount / 1000).toLocaleString('vi-VN')}k
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Actions */}
            <div className="space-y-3">
              <button
                onClick={processPayment}
                disabled={partialPayment && (paidAmount <= 0 || paidAmount > finalAmount)}
                className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-4 rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} className="inline mr-2" />
                {partialPayment ? 'Thanh toán một phần' : 'Hoàn tất thanh toán'}
              </button>
              
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="w-full bg-primary-main hover:bg-primary-paragraph text-primary-button py-3 rounded-xl font-bold transition-all shadow-md"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show login page if not logged in
  if (showLoginPage && !isLoggedIn) {
    return <LoginPage />;
  }

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

      {/* Payment Dialog Modal */}
      {showPaymentDialog && <PaymentDialog />}

      {/* Note Dialog */}
      {(showNoteDialog || showItemNoteDialog) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-primary-headline mb-4">
              {currentNoteType === 'table' ? 'Ghi chú đơn hàng' : 'Ghi chú món ăn'}
            </h3>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Nhập ghi chú..."
              className="w-full h-24 p-3 rounded-xl bg-primary-secondary text-primary-headline resize-none focus:ring-2 focus:ring-primary-highlight shadow-md"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleNoteSubmit}
                className="flex-1 bg-primary-button text-primary-main py-2 rounded-xl font-bold shadow-md"
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setShowNoteDialog(false);
                  setShowItemNoteDialog(false);
                  setNoteInput('');
                }}
                className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;