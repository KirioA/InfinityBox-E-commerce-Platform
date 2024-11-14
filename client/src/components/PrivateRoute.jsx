// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Хук для проверки авторизации

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth(); // Проверяем, авторизован ли пользователь

    if (!isAuthenticated) {
        // Если не авторизован, перенаправляем на страницу входа
        return <Navigate to="/auth" />;
    }

    // Если авторизован, показываем дочерние компоненты (страницу аккаунта)
    return children;
}

export default PrivateRoute;
