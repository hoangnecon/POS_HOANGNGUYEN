import React, { useState } from 'react';
import './App.css';

// Import các component đã được tách
import LoginPage from './components/auth/LoginPage';
import AdminPage from './admin/AdminPage';
import Sidebar from './components/common/Sidebar';
import TableGrid from './components/tables/TableGrid';
import MenuSection from './components/menu/MenuSection';
import Dashboard from './components/dashboard/Dashboard';
import OrderPanel from './components/order/OrderPanel';
import { X, MessageSquare, Edit3 } from 'lucide-react';

// Import dữ liệu
import { MENU_ITEMS, CATEGORIES, MENU_TYPES, MOCK_ORDERS_BY_DATE } from './data/mockData';

function App() {
    // STATE MANAGEMENT
    const [activeSection, setActiveSection] = useState('tables');
    const [selectedTable, setSelectedTable] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedMenuType, setSelectedMenuType] = useState('regular');
    const [orders, setOrders] = useState({});
    const [recentItems, setRecentItems] = useState([1, 3, 4, 7, 8]);
    const [tableNotes, setTableNotes] = useState({});
    const [itemNotes, setItemNotes] = useState({});
    const [tableFilter, setTableFilter] = useState('all');
    
    // Dialog states
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [currentNoteType, setCurrentNoteType] = useState('table');
    const [currentNoteTarget, setCurrentNoteTarget] = useState(null);
    const [noteInput, setNoteInput] = useState('');
    
    // Authentication states
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // Admin states
    const [adminSection, setAdminSection] = useState('dashboard');
    const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
    const [menuItems, setMenuItems] = useState(MENU_ITEMS);
    
    // Dashboard states
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentFilter, setPaymentFilter] = useState('all');

    // MOCKUP TABLE STATE
    const [tables, setTables] = useState(() => {
        const initialTables = {};
        for (let i = 1; i <= 32; i++) {
          initialTables[i] = { id: i };
        }
        return initialTables;
    });

    // FUNCTIONS
    
    // Authentication
    const handleLogin = () => {
        if (loginEmail && loginPassword) {
          setIsLoggedIn(true);
          setShowLoginPage(false);
          if (loginEmail.includes('admin') || loginPassword.includes('admin')) {
            setIsAdmin(true);
          }
          setLoginEmail('');
          setLoginPassword('');
        }
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setShowLoginPage(true);
        setSelectedTable(null);
        setOrders({});
        setActiveSection('tables');
        setAdminSection('dashboard');
    };
    
    const handleAdminLogin = () => {
        setIsAdmin(true);
        setIsLoggedIn(true);
        setShowLoginPage(false);
    };

    // Order Management
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
        
        if (newQuantity <= 0) {
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
        
        setOrders({ ...orders, [selectedTable]: [] });
        
        const newTableNotes = { ...tableNotes };
        delete newTableNotes[selectedTable];
        setTableNotes(newTableNotes);
        
        const newItemNotes = { ...itemNotes };
        Object.keys(newItemNotes).forEach(key => {
          if (key.startsWith(`${selectedTable}-`)) {
            delete newItemNotes[key];
          }
        });
        setItemNotes(newItemNotes);
    };

    const processPayment = (paymentData) => {
        console.log('Payment processed:', {
            tableId: selectedTable,
            items: orders[selectedTable] || [],
            ...paymentData,
            timestamp: new Date().toISOString(),
            cashier: 'Thu ngân A'
        });
    
        if (!paymentData.partialPayment || paymentData.remainingAmount === 0) {
          clearTable();
        }
    };

    // Note Management
    const handleNoteSubmit = () => {
        if (currentNoteType === 'table') {
          setTableNotes({ ...tableNotes, [selectedTable]: noteInput });
        } else if (currentNoteType === 'item') {
          const itemKey = `${selectedTable}-${currentNoteTarget}`;
          setItemNotes({ ...itemNotes, [itemKey]: noteInput });
        }
        setNoteInput('');
        setShowNoteDialog(false);
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
        setShowNoteDialog(true);
    };

    // Admin Functions
    const addMenuType = (id, name) => {
        const newMenu = { id, name };
        setMenuTypes([...menuTypes, newMenu]);
    };
    
    const deleteMenuType = (menuTypeId) => {
        setMenuTypes(menuTypes.filter(menu => menu.id !== menuTypeId));
        setMenuItems(menuItems.filter(item => item.menuType !== menuTypeId));
    };
    
    const addMenuItem = (itemData) => {
        const newItem = {
          ...itemData,
          id: Math.max(0, ...menuItems.map(item => item.id)) + 1
        };
        setMenuItems([...menuItems, newItem]);
    };
    
    const updateMenuItem = (itemId, itemData) => {
        setMenuItems(menuItems.map(item =>
          item.id === itemId ? { ...item, ...itemData } : item
        ));
    };
    
    const deleteMenuItem = (itemId) => {
        setMenuItems(menuItems.filter(item => item.id !== itemId));
    };


    // RENDER LOGIC
    if (showLoginPage && !isLoggedIn) {
        return (
            <LoginPage
                loginEmail={loginEmail}
                setLoginEmail={setLoginEmail}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                handleLogin={handleLogin}
                handleAdminLogin={handleAdminLogin}
            />
        );
    }
    
    if (isAdmin) {
        return (
            <AdminPage
                adminSection={adminSection}
                setAdminSection={setAdminSection}
                handleLogout={handleLogout}
                menuTypes={menuTypes}
                setMenuTypes={setMenuTypes}
                menuItems={menuItems}
                addMenuType={addMenuType}
                deleteMenuType={deleteMenuType}
                addMenuItem={addMenuItem}
                updateMenuItem={updateMenuItem}
                deleteMenuItem={deleteMenuItem}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                paymentFilter={paymentFilter}
                setPaymentFilter={setPaymentFilter}
                MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
            />
        );
    }

    return (
        <div className="h-screen bg-primary-bg flex overflow-hidden">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}
            />
            
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-hidden">
                    {activeSection === 'tables' && (
                        <TableGrid
                            tables={tables}
                            selectedTable={selectedTable}
                            setSelectedTable={setSelectedTable}
                            orders={orders}
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                            recentItems={recentItems}
                            menuItems={menuItems}
                            addToOrder={addToOrder}
                        />
                    )}
                    {activeSection === 'menu' && (
                        <MenuSection
                            selectedTable={selectedTable}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedMenuType={selectedMenuType}
                            setSelectedMenuType={setSelectedMenuType}
                            menuItems={menuItems}
                            menuTypes={menuTypes}
                            categories={CATEGORIES}
                            addToOrder={addToOrder}
                        />
                    )}
                    {activeSection === 'dashboard' && (
                        <Dashboard 
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            paymentFilter={paymentFilter}
                            setPaymentFilter={setPaymentFilter}
                            MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
                        />
                    )}
                </div>
                
                <OrderPanel 
                    selectedTable={selectedTable}
                    orders={orders}
                    itemNotes={itemNotes}
                    tableNotes={tableNotes}
                    updateQuantity={updateQuantity}
                    clearTable={clearTable}
                    processPayment={processPayment}
                    openTableNoteDialog={openTableNoteDialog}
                    openItemNoteDialog={openItemNoteDialog}
                />
            </div>
    
            {/* Note Dialog */}
            {showNoteDialog && (
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