// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks.tsx';

interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>; // Индикатор загрузки
    }

    if (error) {
        console.error('Ошибка сессии:', error);
        return <Navigate to="/auth" replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return element; // Рендер защищённой страницы
};

export default PrivateRoute;
