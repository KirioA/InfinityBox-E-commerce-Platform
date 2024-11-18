import { useState } from 'react';
import axios from '../../axiosConfig.ts';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);

    const login = async (name: string, password: string) => {
        try {
            const response = await axios.post('/api/v1/user/login', { name, password });
            if (response.data.success) {
                // Сохраняем токен в localStorage
                localStorage.setItem('token', response.data.token);
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
