import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionCheck } from '../hooks/auth/useSessionCheck'; // Хук для проверки сессии

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user, loading } = useSessionCheck(); // Используем хук для проверки сессии

    if (loading) {
        return null; // Пока идет проверка сессии, ничего не отображаем
    }

    if (!user) {
        return <Navigate to="/auth" />; // Перенаправляем на страницу авторизации, если пользователь не авторизован
    }

    return <>{children}</>; // Рендерим дочерние компоненты, если пользователь авторизован
};

export default PrivateRoute;
