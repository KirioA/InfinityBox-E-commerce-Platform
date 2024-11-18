import { useState } from 'react';
import axios from '../../axiosConfig.ts';
import { useAuth } from '../../contexts/AuthContext'; // Импортируем хук для работы с контекстом

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для обновления состояния авторизации

    const register = async (name: string, password: string, mail: string) => {
        try {
            const response = await axios.post('/api/v1/user/register', { name, mail, password });

            if (response.data.success) {
                // Если регистрация успешна, сохраняем токен в localStorage
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true); // Обновляем состояние авторизации
                setError(null);
                return response.data.token;  // Возвращаем токен
            } else {
                setError(response.data.message || 'Ошибка регистрации. Попробуйте еще раз.');
                return null;
            }
        } catch (err) {
            setError('Ошибка при регистрации');
            console.error(err);
            return null;
        }
    };

    return { register, error };
};
