// components/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

interface AdminRouteProps {
    element: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
    const { isAdminAuthenticated, loading } = useAppSelector((state) => state.admin);

    if (loading) {
        return <div>Loading...</div>; // Индикатор загрузки
    }

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/auth" replace />;
    }

    return element; // Рендер защищённых маршрутов
};

export default AdminRoute;
