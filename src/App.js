// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client'; // Updated for React 18
import './App.css';

// Import components
import LoginPage from './components/auth/LoginPage';
import AdminPage from './admin/AdminPage';
import Sidebar from './components/common/Sidebar';
import TableGrid from './components/tables/TableGrid';
import MenuSection from './components/menu/MenuSection';
import Dashboard from './components/dashboard/Dashboard';
import OrderPanel from './components/order/OrderPanel';
import ChangeTableDialog from './components/order/ChangeTableDialog';
import PrintReceipt from './components/order/PrintReceipt';
import { X } from 'lucide-react';

// Import data
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
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [currentNoteType, setCurrentNoteType] = useState('table');
  const [currentNoteTarget, setCurrentNoteTarget] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [showChangeTableDialog, setShowChangeTableDialog] = useState(false);
  const [autoOpenMenu, setAutoOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');
  const [menuTypes, setMenuTypes] = useState(MENU_TYPES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [tables, setTables] = useState(() => {
    const initialTables = {};
    for (let i = 1; i <= 30; i++) {
      initialTables[i] = { id: i };
    }
    return initialTables;
  });

  // Ref for PrintReceipt component
  const printRef = useRef();

const triggerPrint = (type) => {
  const currentOrders = orders[selectedTable] || [];
  if (currentOrders.length === 0) {
    alert('Không có món nào để in.');
    return;
  }

  // Tạo nội dung hóa đơn với ngày giờ hiện tại
  const total = currentOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tableName = selectedTable === 'takeaway' ? 'Mang về' : `Bàn ${selectedTable}`;
  const currentDate = new Date().toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }); // Ví dụ: 29/06/2025 17:00

  const printContent = `
    <div class="print-content">
      <div class="header">
        <h1>${type === 'provisional' ? 'PHIẾU TẠM TÍNH' : 'PHIẾU BẾP'}</h1>
        <p>Nhà hàng ABC</p>
        <p>123 Đường XYZ, Q.1, TP.HCM</p>
        <p>ĐT: 0909 123 456</p> <!-- Thêm thông tin liên hệ -->
      </div>
      <div class="line"></div>
      <p>Bàn: ${tableName} | Ngày: ${currentDate}</p>
      <div class="line"></div>
      ${currentOrders
        .map(
          (item) => `
            <div>${item.name} - ${item.quantity} x ${item.price.toLocaleString('vi-VN')}đ = ${(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
          `
        )
        .join('<div class="spacer"></div>')} <!-- Thêm khoảng cách giữa các món -->
      <div class="line"></div>
      ${type === 'provisional' ? `
        <div class="total">TỔNG CỘNG: ${total.toLocaleString('vi-VN')}đ</div>
        <div class="tax">Thuế GTGT: 10% = ${(total * 0.1).toLocaleString('vi-VN')}đ</div> <!-- Thêm thuế -->
        <div class="grand-total">THÀNH TIỀN: ${(total * 1.1).toLocaleString('vi-VN')}đ</div> <!-- Tổng bao gồm thuế -->
      ` : ''}
      <div class="footer">
        ${type === 'provisional' ? 'Cảm ơn quý khách! Vui lòng giữ hóa đơn!' : '--- YÊU CẦU BẾP CHUẨN BỊ ---'}
        <p>Quét QR để nhận ưu đãi: [QR Code Placeholder]</p> <!-- Thêm thông tin khuyến mãi -->
      </div>
    </div>
  `;

  // Mở cửa sổ in và thêm nội dung
  const printWindow = window.open('', '', 'width=200,height=200');
  if (!printWindow) {
    alert('Vui lòng cho phép popup để in hóa đơn.');
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Hóa đơn</title>
        <style>
          @page {
            size: 57mm auto;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 2mm;
            width: 57mm;
            font-family: 'Courier New', Courier, monospace;
            font-size: 9pt;
            -webkit-print-color-adjust: exact;
          }
          .header { text-align: center; margin-bottom: 2mm; }
          .header h1 { font-size: 12pt; margin: 0; }
          .header p { margin: 0.5mm 0; font-size: 8pt; }
          .line { border-top: 1px dashed #000; margin: 2mm 0; }
          .spacer { height: 2mm; } /* Khoảng cách giữa các món */
          .total, .tax, .grand-total { text-align: right; font-weight: bold; margin: 1mm 0; }
          .footer { text-align: center; margin-top: 2mm; font-style: italic; font-size: 8pt; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  printWindow.document.close();

  // Kiểm tra và in
  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
};

  useEffect(() => {
    if (selectedTable && autoOpenMenu) {
      setActiveSection('menu');
    }
  }, [selectedTable, autoOpenMenu]);

  const handleAutoOpenMenuToggle = () => {
    setAutoOpenMenu((prev) => !prev);
  };

  // ========================================================================
  // ĐỊNH NGHĨA CÁC HÀM XỬ LÝ
  // ========================================================================
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

  const addToOrder = (item) => {
    if (!selectedTable) return;

    const tableOrders = orders[selectedTable] || [];
    const existingItem = tableOrders.find((orderItem) => orderItem.id === item.id);

    if (existingItem) {
      setOrders({
        ...orders,
        [selectedTable]: tableOrders.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        ),
      });
    } else {
      setOrders({
        ...orders,
        [selectedTable]: [...tableOrders, { ...item, quantity: 1 }],
      });
    }

    setRecentItems((prev) => {
      const filtered = prev.filter((id) => id !== item.id);
      return [item.id, ...filtered].slice(0, 8);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (!selectedTable) return;

    if (newQuantity <= 0) {
      setOrders({
        ...orders,
        [selectedTable]: (orders[selectedTable] || []).filter((item) => item.id !== itemId),
      });
      const itemKey = `${selectedTable}-${itemId}`;
      const newItemNotes = { ...itemNotes };
      delete newItemNotes[itemKey];
      setItemNotes(newItemNotes);
    } else {
      setOrders({
        ...orders,
        [selectedTable]: (orders[selectedTable] || []).map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ),
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
    Object.keys(newItemNotes).forEach((key) => {
      if (key.startsWith(`${selectedTable}-`)) {
        delete newItemNotes[key];
      }
    });
    setItemNotes(newItemNotes);
  };

  const processPayment = (paymentData, type = 'full') => {
    if (type === 'full') {
      console.log('Payment processed (Full):', {
        tableId: selectedTable,
        items: orders[selectedTable] || [],
        ...paymentData,
        timestamp: new Date().toISOString(),
        cashier: 'Thu ngân A',
      });
      clearTable();
    } else if (type === 'partial') {
      console.log('Payment processed (Partial):', {
        tableId: selectedTable,
        ...paymentData,
        timestamp: new Date().toISOString(),
        cashier: 'Thu ngân A',
      });

      const currentOrder = [...(orders[selectedTable] || [])];
      const updatedOrder = currentOrder
        .map((orderItem) => {
          const paidItem = paymentData.paidItems.find((p) => p.id === orderItem.id);
          if (paidItem) {
            return { ...orderItem, quantity: orderItem.quantity - paidItem.quantity };
          }
          return orderItem;
        })
        .filter((item) => item.quantity > 0);

      setOrders({
        ...orders,
        [selectedTable]: updatedOrder,
      });
    }
  };

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

  const handleChangeTable = (targetTableId) => {
    if (!selectedTable || !orders[selectedTable]) return;

    const sourceOrder = orders[selectedTable] || [];
    const targetOrder = orders[targetTableId] || [];

    const mergedOrder = [...targetOrder];
    sourceOrder.forEach((sourceItem) => {
      const existingItemIndex = mergedOrder.findIndex(
        (item) => item.id === sourceItem.id
      );
      if (existingItemIndex > -1) {
        mergedOrder[existingItemIndex].quantity += sourceItem.quantity;
      } else {
        mergedOrder.push(sourceItem);
      }
    });

    setOrders({
      ...orders,
      [targetTableId]: mergedOrder,
      [selectedTable]: [],
    });

    const newTableNotes = { ...tableNotes };
    if (tableNotes[selectedTable]) {
      newTableNotes[targetTableId] =
        (newTableNotes[targetTableId] || '') + ' | ' + tableNotes[selectedTable];
      delete newTableNotes[selectedTable];
      setTableNotes(newTableNotes);
    }

    setShowChangeTableDialog(false);
    setSelectedTable(targetTableId);
  };

  const addMenuType = (id, name) => {
    const newMenu = { id, name };
    setMenuTypes([...menuTypes, newMenu]);
  };

  const deleteMenuType = (menuTypeId) => {
    setMenuTypes(menuTypes.filter((menu) => menu.id !== menuTypeId));
    setMenuItems(menuItems.filter((item) => item.menuType !== menuTypeId));
  };

  const addMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Math.max(0, ...menuItems.map((item) => item.id)) + 1,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItem = (itemId, itemData) => {
    setMenuItems(
      menuItems.map((item) => (item.id === itemId ? { ...item, ...itemData } : item))
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId));
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
              autoOpenMenu={autoOpenMenu}
              handleAutoOpenMenuToggle={handleAutoOpenMenuToggle}
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
          openChangeTableDialog={() => setShowChangeTableDialog(true)}
          handlePrint={triggerPrint}
        />
      </div>

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

      {showChangeTableDialog && selectedTable && (
        <ChangeTableDialog
          tables={tables}
          orders={orders}
          currentTable={selectedTable}
          onClose={() => setShowChangeTableDialog(false)}
          onTableSelect={handleChangeTable}
        />
      )}
    </div>
  );
}

export default App;