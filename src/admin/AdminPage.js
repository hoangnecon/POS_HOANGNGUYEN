import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminMenus from './AdminMenus';
import AdminItems from './AdminItems';

const AdminPage = ({
  adminSection,
  setAdminSection,
  handleLogout,
  // Thêm các props cần thiết cho các trang con
  menuTypes,
  menuItems,
  addMenuType,
  deleteMenuType,
  setMenuTypes,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  selectedDate,
  setSelectedDate,
  paymentFilter,
  setPaymentFilter,
  MOCK_ORDERS_BY_DATE,
}) => {
  return (
    <div className="h-screen bg-primary-bg flex overflow-hidden">
      <AdminSidebar
        adminSection={adminSection}
        setAdminSection={setAdminSection}
        handleLogout={handleLogout}
      />
      <div className="flex-1 overflow-hidden">
        {adminSection === 'dashboard' && (
          <AdminDashboard
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            paymentFilter={paymentFilter}
            setPaymentFilter={setPaymentFilter}
            MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
            menuItems={menuItems}
            menuTypes={menuTypes}
          />
        )}
        {adminSection === 'menus' && (
          <AdminMenus
            menuTypes={menuTypes}
            setMenuTypes={setMenuTypes}
            menuItems={menuItems}
            addMenuType={addMenuType}
            deleteMenuType={deleteMenuType}
          />
        )}
        {adminSection === 'items' && (
          <AdminItems
            menuItems={menuItems}
            menuTypes={menuTypes}
            addMenuItem={addMenuItem}
            updateMenuItem={updateMenuItem}
            deleteMenuItem={deleteMenuItem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;