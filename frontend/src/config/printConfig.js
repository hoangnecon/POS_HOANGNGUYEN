export const initialPrintSettings = {
    fontFamily: 'Courier New',
    lineSpacing: 2,
    useSeparatorLine: true,
    restaurantName: 'Nhà hàng ABC',
    address: '123 Đường XYZ, Q.1, TP.HCM',
    phone: '0909 123 456',
    showStoreName: true,
    headerStyle: { fontSize: 14, fontWeight: 'bold', fontStyle: 'normal' },
    subHeaderStyle: { fontSize: 8, fontWeight: 'normal', fontStyle: 'normal' },
    showDateTime: true,
    showCashier: false,
    orderInfoStyle: { fontSize: 9, fontWeight: 'normal', fontStyle: 'normal' },
    itemsHeaderStyle: { fontSize: 9, fontWeight: 'bold', fontStyle: 'normal' },
    itemsBodyStyle: { fontSize: 9, fontWeight: 'normal', fontStyle: 'normal' },
    totalLabel: 'TỔNG CỘNG:',
    thankYouMessage: 'Cảm ơn quý khách!',
    showQrCode: false,
    totalStyle: { fontSize: 10, fontWeight: 'bold', fontStyle: 'normal' },
    footerStyle: { fontSize: 8, fontWeight: 'normal', fontStyle: 'italic' },
    showWifi: true,
    wifiPassword: 'your_wifi_password',
    wifiStyle: { fontSize: 9, fontWeight: 'bold', fontStyle: 'normal' },
    defaultPrinter: '',
    printerShareName: '',
};

/**
 * Gửi yêu cầu in đến ứng dụng Electron cục bộ.
 * @param {string} type - Loại phiếu in ('provisional' hoặc 'kitchen').
 * @param {Array} currentOrders - Danh sách các món trong đơn hàng.
 * @param {string | number} selectedTable - Bàn đang được chọn.
 */
export const triggerPrint = async (type, currentOrders, selectedTable) => {
    if (!currentOrders || currentOrders.length === 0) {
        alert('Không có món nào để in.');
        return;
    }

    // Lấy cấu hình đã lưu hoặc dùng mặc định
    const savedSettings = localStorage.getItem('printSettings');
    const settings = savedSettings ? { ...initialPrintSettings, ...JSON.parse(savedSettings) } : initialPrintSettings;

    if (!settings.printerShareName) {
        alert('Vui lòng cấu hình "Share name" của máy in trong Admin > Cài đặt in hóa đơn.');
        return;
    }

    // Chuẩn bị payload để gửi đi
    const total = currentOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tableName = selectedTable === 'takeaway' ? 'Mang về' : `Bàn ${selectedTable}`;
    const currentDate = new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const payload = {
        isKitchenPrint: type === 'kitchen',
        tableName,
        currentDate,
        items: currentOrders.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        total,
        settings, // Gửi toàn bộ cấu hình
    };

    console.log('Sending print payload:', payload); // Debug payload

    try {
        const response = await fetch('http://localhost:9898/print', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Lỗi máy chủ in: ${await response.text()}`);
        }

        const result = await response.json();
        console.log('Server response:', result);
        alert(result.message || 'In thành công!');
    } catch (error) {
        console.error('Lỗi khi in:', error);
        alert(`Không thể in: ${error.message}.\nVui lòng kiểm tra:\n- Ứng dụng Electron hỗ trợ in đang chạy.\n- Máy in đã được chia sẻ với Share name "${settings.printerShareName}".`);
    }
};