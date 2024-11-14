// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Хук для проверки авторизации

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth(); // Проверяем, авторизован ли пользователь

    if (isAuthenticated) {
        // Если авторизован, перенаправляем на личный кабинет
        return <Navigate to="/account" />;
    }

    // Если не авторизован, показываем страницу с формой регистрации/входа
    return children;
}

export default PrivateRoute;
