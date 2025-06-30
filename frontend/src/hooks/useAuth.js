import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api'; 

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');

    const validateToken = useCallback(async () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            try {
                const response = await api.get('/auth/me');
                const currentUser = response.data;
                setUser(currentUser);
                setToken(storedToken);
            } catch (err) {
                console.error('[Auth] Lỗi xác thực token:', err.response?.data?.error?.message || err.message);
                localStorage.removeItem('authToken');
                setToken(null);
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    const handleLogin = async () => {
        setError('');
        try {
            const response = await api.post('/auth/login', {
                email: loginEmail,
                password: loginPassword,
            });

            const { user: loggedInUser, token: receivedToken } = response.data;
            
            localStorage.setItem('authToken', receivedToken);
            setUser(loggedInUser);
            setToken(receivedToken);

            setLoginEmail('');
            setLoginPassword('');
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || 'Email hoặc mật khẩu không đúng.';
            setError(errorMessage);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
    };

    return {
        user,
        token,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'ADMIN',
        isLoading,
        error,
        loginEmail,
        loginPassword,
        setLoginEmail,
        setLoginPassword,
        handleLogin,
        handleLogout,
    };
};