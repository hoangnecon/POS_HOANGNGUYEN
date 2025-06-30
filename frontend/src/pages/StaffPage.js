import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import TableGrid from '../components/tables/TableGrid';
import MenuSection from '../components/menu/MenuSection';
import Dashboard from '../components/dashboard/Dashboard';
import OrderPanel from '../components/order/OrderPanel';

/**
 * Component chính cho giao diện nhân viên, bao gồm các khu vực chức năng.
 */
const StaffPage = ({
    auth,
    appData,
    order,
    ui,
    tables,
    autoOpenMenu,
    setAutoOpenMenu,
    MOCK_ORDERS_BY_DATE,
}) => {
    // State riêng cho dashboard của nhân viên
    const [dashboardState, setDashboardState] = useState({
        selectedDate: new Date().toISOString().split('T')[0],
        paymentFilter: 'all',
        timeFilter: 'date',
    });
    
    const renderMainSection = () => {
        switch (ui.activeSection) {
            case 'tables':
                return (
                    <TableGrid
                        tables={tables}
                        selectedTable={order.selectedTable}
                        setSelectedTable={order.setSelectedTable}
                        orders={order.orders}
                        tableFilter={ui.tableFilter}
                        setTableFilter={ui.setTableFilter}
                        recentItems={order.recentItems}
                        menuItems={appData.menuItems}
                        addToOrder={order.addToOrder}
                        autoOpenMenu={autoOpenMenu}
                        handleAutoOpenMenuToggle={() => setAutoOpenMenu(prev => !prev)}
                    />
                );
            case 'menu':
                return (
                    <MenuSection
                        selectedTable={order.selectedTable}
                        searchTerm={ui.searchTerm}
                        setSearchTerm={ui.setSearchTerm}
                        selectedCategory={ui.selectedCategory}
                        setSelectedCategory={ui.setSelectedCategory}
                        selectedMenuType={ui.selectedMenuType}
                        setSelectedMenuType={ui.setSelectedMenuType}
                        menuItems={appData.menuItems}
                        menuTypes={appData.menuTypes}
                        categories={appData.categories}
                        addToOrder={order.addToOrder}
                    />
                );
            case 'dashboard':
                return (
                    <Dashboard
                        {...dashboardState}
                        setSelectedDate={(date) => setDashboardState(s => ({ ...s, selectedDate: date }))}
                        setPaymentFilter={(filter) => setDashboardState(s => ({ ...s, paymentFilter: filter }))}
                        setTimeFilter={(filter) => setDashboardState(s => ({ ...s, timeFilter: filter }))}
                        MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Sidebar
                activeSection={ui.activeSection}
                setActiveSection={ui.setActiveSection}
                handleLogout={auth.handleLogout}
            />
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-hidden">
                    {renderMainSection()}
                </div>
                <OrderPanel
                    selectedTable={order.selectedTable}
                    orders={order.orders}
                    itemNotes={order.itemNotes}
                    tableNotes={order.tableNotes}
                    updateQuantity={order.updateQuantity}
                    clearTable={order.clearTable}
                    processPayment={order.processPayment}
                    openTableNoteDialog={() => ui.openTableNoteDialog(order.tableNotes, order.selectedTable)}
                    openItemNoteDialog={(itemId) => ui.openItemNoteDialog(itemId, order.itemNotes, order.selectedTable)}
                    openChangeTableDialog={() => ui.setShowChangeTableDialog(true)}
                    handlePrint={order.handlePrint}
                />
            </div>
        </>
    );
};

export default StaffPage;