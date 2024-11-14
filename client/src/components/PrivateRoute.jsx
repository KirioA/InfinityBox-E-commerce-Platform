// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // Или компонент загрузки, пока данные загружаются
    }

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return children;
}

export default PrivateRoute;
