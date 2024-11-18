import { useState } from 'react';
import axios from '../../axiosConfig.ts';
import { useAuth } from '../../contexts/AuthContext'; // Импортируем хук для работы с контекстом

export const useLogout = () => {
    const [error, setError] = useState<string | null>(null);
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для обновления состояния авторизации

    const logout = async () => {
        try {
            // Здесь можно добавить вызов API для завершения сессии на сервере, если необходимо
            localStorage.removeItem('token'); // Удаляем токен из localStorage
            setIsAuthenticated(false); // Обновляем состояние авторизации
            setError(null);
        } catch (err) {
            setError('Ошибка при выходе');
            console.error(err);
        }
    };

    return { logout, error };
};
