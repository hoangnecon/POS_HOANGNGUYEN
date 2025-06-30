import { useState, useEffect } from 'react';
import api from '../utils/api'; 

export const useOrder = (isLoggedIn, token) => {
    const [orders, setOrders] = useState({});
    const [selectedTable, setSelectedTable] = useState(null);
    const [recentItems, setRecentItems] = useState(() => {
        const savedRecents = localStorage.getItem('recentItems');
        return savedRecents ? JSON.parse(savedRecents) : [];
    });
    
    // Các state ghi chú sẽ được hoàn thiện sau
    const [tableNotes, setTableNotes] = useState({});
    const [itemNotes, setItemNotes] = useState({});

    // Effect để lấy các đơn hàng đang hoạt động khi đăng nhập
    useEffect(() => {
        if (!isLoggedIn || !token) { setOrders({}); return; }
        const fetchActiveOrders = async () => {
            try {
                const response = await api.get('/orders/active');
                setOrders(response.data || {});
            } catch (error) { console.error("Không thể tải các đơn hàng đang hoạt động:", error); }
        };
        fetchActiveOrders();
    }, [isLoggedIn, token]);

    // Effect để lưu các món gần đây vào localStorage
    useEffect(() => {
        localStorage.setItem('recentItems', JSON.stringify(recentItems));
    }, [recentItems]);


    const addToOrder = async (item) => {
        if (!selectedTable) { alert("Vui lòng chọn bàn trước!"); return; }
        
        // Optimistic Update: Cập nhật giao diện ngay lập tức
        const currentOrder = orders[selectedTable] || [];
        const existingItem = currentOrder.find(i => i.id === item.id);
        
        let optimisticOrder;
        if (existingItem) {
            optimisticOrder = currentOrder.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
            optimisticOrder = [...currentOrder, { ...item, quantity: 1, orderItemId: Date.now() }]; // Tạm thời dùng timestamp làm key
        }
        setOrders(prev => ({ ...prev, [selectedTable]: optimisticOrder }));
        
        // Gửi yêu cầu lên server
        try {
            const response = await api.post('/orders/add-item', { tableId: selectedTable, itemId: item.id, quantity: 1 });
            // Cập nhật lại state của bàn đó với dữ liệu chính xác từ server
            setOrders(prev => ({ ...prev, [response.data.tableId]: response.data.items }));
            
            setRecentItems((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 8));
        } catch (error) { 
            console.error("Lỗi khi thêm món:", error); 
            alert('Không thể thêm món.');
            // Rollback: Nếu lỗi, lấy lại toàn bộ đơn hàng để đảm bảo đồng bộ
            const res = await api.get('/orders/active');
            setOrders(res.data);
        }
    };

    const updateQuantity = async (orderItemId, newQuantity) => {
        if (!selectedTable || !orderItemId) return;

        // Optimistic Update
        const originalOrder = orders[selectedTable];
        let optimisticOrder;
        if (newQuantity <= 0) {
            optimisticOrder = originalOrder.filter(i => i.orderItemId !== orderItemId);
        } else {
            optimisticOrder = originalOrder.map(i => i.orderItemId === orderItemId ? { ...i, quantity: newQuantity } : i);
        }
        setOrders(prev => ({ ...prev, [selectedTable]: optimisticOrder }));

        try {
            const response = await api.put(`/orders/item/${orderItemId}`, { quantity: newQuantity });
            setOrders(prev => ({ ...prev, [response.data.tableId]: response.data.items }));
        } catch (error) { 
            console.error("Lỗi khi cập nhật số lượng:", error);
            alert('Không thể cập nhật số lượng.');
            setOrders(prev => ({ ...prev, [selectedTable]: originalOrder })); // Rollback
        }
    };
    
    const clearTable = async () => {
        if (!selectedTable) return;
        const originalOrders = { ...orders };

        // Optimistic Update
        setOrders(prev => ({ ...prev, [selectedTable]: [] }));
        
        try {
            const response = await api.delete(`/orders/table/${selectedTable}`);
            setOrders(prev => ({...prev, [response.data.tableId]: response.data.items }));
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            alert('Không thể xóa đơn hàng.');
            setOrders(originalOrders); // Rollback
        }
    };
    
    // Các hàm này sẽ được hiện thực ở các bước tiếp theo
    const handleChangeTable = (targetTableId) => { console.log("TODO: Implement Change Table API call"); };
    const processPayment = (paymentData, type) => { console.log("TODO: Implement Payment API call"); };
    const handlePrint = (type) => { console.log("TODO: Implement Print logic"); };

    return {
        orders, selectedTable, recentItems, tableNotes, itemNotes,
        setOrders, setSelectedTable,
        addToOrder, updateQuantity, clearTable, handleChangeTable, processPayment, handlePrint,
    };
};
