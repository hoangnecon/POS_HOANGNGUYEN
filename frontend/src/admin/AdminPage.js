import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminMenus from './AdminMenus';
import AdminItems from './AdminItems';
import AdminPrintSettings from './AdminPrintSettings';

/**
 * Component chính cho trang quản trị, điều hướng giữa các khu vực quản lý.
 */
const AdminPage = ({ handleLogout, appData, MOCK_ORDERS_BY_DATE }) => {
    const [adminSection, setAdminSection] = useState('dashboard');
    
    // State cho dashboard admin, tách biệt với dashboard của nhân viên
    const [dashboardState, setDashboardState] = useState({
        selectedDate: new Date().toISOString().split('T')[0],
        paymentFilter: 'all',
        timeFilter: 'date',
    });

    const renderSection = () => {
        switch (adminSection) {
            case 'dashboard':
                return (
                    <AdminDashboard
                        {...dashboardState}
                        setSelectedDate={(date) => setDashboardState(s => ({ ...s, selectedDate: date }))}
                        setPaymentFilter={(filter) => setDashboardState(s => ({ ...s, paymentFilter: filter }))}
                        setTimeFilter={(filter) => setDashboardState(s => ({ ...s, timeFilter: filter }))}
                        MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
                        menuItems={appData.menuItems}
                        menuTypes={appData.menuTypes}
                    />
                );
            case 'menus':
                return <AdminMenus {...appData} />;
            case 'items':
                return <AdminItems {...appData} />;
            case 'settings':
                return <AdminPrintSettings />;
            default:
                return <AdminDashboard {...dashboardState} MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE} menuItems={appData.menuItems} menuTypes={appData.menuTypes} />;
        }
    };

    return (
        <div className="h-screen bg-primary-bg flex overflow-hidden">
            <AdminSidebar
                adminSection={adminSection}
                setAdminSection={setAdminSection}
                handleLogout={handleLogout}
            />
            <div className="flex-1 overflow-hidden">
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminPage;