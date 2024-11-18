// components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated, loading, error } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Показываем индикатор загрузки
    }

    if (error) {
        console.error('Ошибка сессии:', error);
        return <Navigate to="/auth" replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return element; // Показываем защищённую страницу
};

export default PrivateRoute;
