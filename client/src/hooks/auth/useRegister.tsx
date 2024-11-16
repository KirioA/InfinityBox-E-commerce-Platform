// src/hooks/auth/useRegister.tsx
import { useState } from 'react';
import axios from '../../axiosConfig.ts';

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);

    const register = async (name: string, password: string, mail: string) => {
        try {
            // Отправляем данные на сервер
            const response = await axios.post('/api/v1/user/register', { name, mail, password });

            if (response.data.success) {
                // Если регистрация успешна, сохраняем токен в localStorage
                localStorage.setItem('token', response.data.token);
                setError(null);
                return response.data.token;  // Возвращаем токен
            } else {
                // Если сервер вернул успешный код, но с ошибкой
                setError(response.data.message || 'Ошибка регистрации. Попробуйте еще раз.');
                return null;
            }
        } catch (err) {
            // Обработка ошибок запроса
            if (axios.isAxiosError(err)) {
                // Устанавливаем сообщение об ошибке из ответа сервера, если оно есть
                setError(err.response?.data || 'Ошибка при регистрации');
            } else {
                setError('Ошибка при регистрации');
            }
            console.error(err);
            return null;
        }
    };

    return { register, error };
};
