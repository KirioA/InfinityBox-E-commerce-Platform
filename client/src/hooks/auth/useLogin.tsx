import { useState } from 'react';
import axios from '../../axiosConfig.ts';
import { useAuth } from '../../contexts/AuthContext'; // Импортируем хук для работы с контекстом

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для обновления состояния авторизации

    const login = async (name: string, password: string) => {
        try {
            const response = await axios.post('/api/v1/user/login', { name, password });
            if (response.data.success) {
                // Сохраняем токен в localStorage
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true); // Обновляем состояние авторизации
                setError(null);
                return true;  // Успешный логин, возвращаем true
            } else {
                setError('Неверный логин или пароль');
                console.log('Неверный логин или пароль');
                return false;  // Ошибка, если данные неверные
            }
        } catch (err) {
            setError('Ошибка при авторизации');
            console.error(err);
            return false;  // Ошибка при отправке запроса
        }
    };

    return { login, error };
};
