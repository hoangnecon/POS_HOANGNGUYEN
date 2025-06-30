import { useState, useEffect } from 'react';
import { UtensilsCrossed, Star, Coffee, ChefHat, Heart } from 'lucide-react';
import api from '../utils/api'; // Sử dụng instance axios đã được cấu hình

export const useAppData = (isLoggedIn, token) => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [menuTypes, setMenuTypes] = useState([]);
    const [tableTypes, setTableTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const categoryIcons = {
        'Phở': Coffee, 'Bún': ChefHat, 'Cơm': UtensilsCrossed, 'Bánh': Coffee,
        'Khai vị': Heart, 'Đồ uống': Coffee, 'Món Tết': Star
    };

    useEffect(() => {
        // Chỉ fetch dữ liệu khi người dùng đã đăng nhập và có token
        if (!isLoggedIn || !token) {
            setMenuItems([]); setCategories([]); setMenuTypes([]); setTableTypes([]);
            return;
        };

        const fetchInitialData = async () => {
            console.log('%c[useAppData] Bắt đầu quá trình tải dữ liệu...', 'color: blue');
            setIsLoading(true);
            setError(null);
            try {
                // Gọi song song các API để tăng tốc
                const [menuRes, tablesRes] = await Promise.all([
                    api.get('/data/menu'),
                    api.get('/data/tables')
                ]);
                
                // Log dữ liệu thật sự nhận được từ server
                console.log('%c[useAppData] Dữ liệu Menu nhận được:', 'color: green', menuRes.data);
                console.log('%c[useAppData] Dữ liệu Bàn nhận được:', 'color: green', tablesRes.data);

                const categoriesFromApi = menuRes.data.categories || [];
                const categoriesWithIcons = categoriesFromApi.map(cat => ({
                    ...cat,
                    icon: categoryIcons[cat.name] || UtensilsCrossed
                }));
                
                const finalCategories = [
                    { id: 'all', name: 'Tất cả', icon: UtensilsCrossed },
                    { id: 'popular', name: 'Phổ biến', icon: Star },
                    ...categoriesWithIcons
                ];

                setMenuItems(menuRes.data.menuItems || []);
                setCategories(finalCategories);
                setMenuTypes(menuRes.data.menuTypes || []);
                setTableTypes(tablesRes.data.tableTypes || []);

            } catch (err) {
                console.error("LỖI KHI TẢI DỮ LIỆU:", err);
                const errorMessage = err.response?.data?.error?.message || "Không thể tải dữ liệu từ server. Vui lòng kiểm tra kết nối và backend.";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
                console.log('%c[useAppData] Quá trình tải dữ liệu kết thúc.', 'color: blue');
            }
        };

        fetchInitialData();
    }, [isLoggedIn, token]); 

    // Các hàm quản trị (CRUD) sẽ được cập nhật sau
    const addMenuItem = (itemData) => { console.log("TODO: Call API to add item", itemData); };
    const updateMenuItem = (itemId, itemData) => { console.log("TODO: Call API to update item", itemId, itemData); };
    const deleteMenuItem = (itemId) => { console.log("TODO: Call API to delete item", itemId); };
    
    return {
        menuItems, categories, menuTypes, tableTypes, isLoading, error,
        addMenuItem, updateMenuItem, deleteMenuItem
    };
};