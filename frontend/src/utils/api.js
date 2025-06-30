import axios from 'axios';

// Tạo một instance của axios với cấu hình cơ bản
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Địa chỉ của backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor để tự động thêm token vào mỗi request.
 * Đây là cách làm chuyên nghiệp để quản lý token.
 */
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Nếu có token, gắn vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;