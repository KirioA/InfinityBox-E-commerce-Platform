// src/hooks/useAuthCheck.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем наличие токена в localStorage или sessionStorage
        const token = localStorage.getItem('token'); // или sessionStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return { isAuthenticated, navigate };
};
