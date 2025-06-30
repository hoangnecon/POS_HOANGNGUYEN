import React, { useState, useEffect } from 'react';
import './App.css';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useAppData } from './hooks/useAppData';
import { useOrder } from './hooks/useOrder';
import { useUI } from './hooks/useUI';

// Components
import LoginPage from './components/auth/LoginPage';
import AdminPage from './admin/AdminPage';
import StaffPage from './pages/StaffPage';
import NoteDialog from './components/common/NoteDialog';
import ChangeTableDialog from './components/order/ChangeTableDialog';

// Dữ liệu mẫu tạm thời cho dashboard
import { MOCK_ORDERS_BY_DATE } from './data/mockData'; 

function App() {
    const auth = useAuth();
    const appData = useAppData(auth.isLoggedIn, auth.token);
    const order = useOrder(auth.isLoggedIn, auth.token);
    const [autoOpenMenu, setAutoOpenMenu] = useState(false);
    const ui = useUI(order.selectedTable, autoOpenMenu);
    const [tables, setTables] = useState({});

    useEffect(() => {
        if (!appData.tableTypes || appData.tableTypes.length === 0) return;
        const newTables = {};
        appData.tableTypes.forEach(type => {
            if (type.isSpecial) {
                const specialId = type.name.toLowerCase().replace(/\s/g, '');
                newTables[specialId] = { id: specialId, name: type.name, type: type.id };
            } else {
                for (let i = 1; i <= type.quantity; i++) {
                    newTables[i] = { id: i, name: `Bàn ${i}`, type: type.id };
                }
            }
        });
        setTables(newTables);
    }, [appData.tableTypes]);

    useEffect(() => {
        if (!auth.isLoggedIn) {
            ui.setActiveSection('tables');
            order.setSelectedTable(null);
            order.setOrders({});
        }
    }, [auth.isLoggedIn, ui.setActiveSection, order.setSelectedTable, order.setOrders]);
    
    // --- RENDER LOGIC ---

    if (auth.isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white text-lg">
                Đang kiểm tra phiên đăng nhập...
            </div>
        );
    }
    
    if (!auth.isLoggedIn) {
        return <LoginPage 
            loginEmail={auth.loginEmail}
            setLoginEmail={auth.setLoginEmail}
            loginPassword={auth.loginPassword}
            setLoginPassword={auth.setLoginPassword}
            handleLogin={auth.handleLogin}
            error={auth.error}
        />;
    }

    if (appData.isLoading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white text-lg">Đang tải dữ liệu nhà hàng...</div>;
    }

    if (appData.error) {
         return <div className="h-screen w-screen flex items-center justify-center bg-red-900 text-white text-lg p-8 text-center">{appData.error}</div>;
    }
    
    if (auth.isAdmin) {
        return (
            <AdminPage
                handleLogout={auth.handleLogout}
                appData={appData}
                MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
            />
        );
    }
    
    return (
        <div className="h-screen bg-primary-bg flex overflow-hidden">
            <StaffPage
                auth={auth}
                appData={appData}
                order={order}
                ui={ui}
                tables={tables}
                autoOpenMenu={autoOpenMenu}
                setAutoOpenMenu={setAutoOpenMenu}
                MOCK_ORDERS_BY_DATE={MOCK_ORDERS_BY_DATE}
            />
            
            <NoteDialog
                isOpen={ui.showNoteDialog}
                noteType={ui.currentNoteType}
                noteInput={ui.noteInput}
                setNoteInput={ui.setNoteInput}
                onClose={() => ui.setShowNoteDialog(false)}
                onSubmit={() => ui.handleNoteSubmit({ 
                    setTableNotes: order.setTableNotes, 
                    setItemNotes: order.setItemNotes, 
                    selectedTable: order.selectedTable 
                })}
            />
            {ui.showChangeTableDialog && order.selectedTable && (
                <ChangeTableDialog
                    tables={tables}
                    orders={order.orders}
                    currentTable={order.selectedTable}
                    onClose={() => ui.setShowChangeTableDialog(false)}
                    onTableSelect={(targetTableId) => {
                        order.handleChangeTable(targetTableId);
                        ui.setShowChangeTableDialog(false);
                    }}
                />
            )}
        </div>
    );
}

export default App;
