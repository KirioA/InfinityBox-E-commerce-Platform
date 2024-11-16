import { useState } from 'react';
import axios from '../../axiosConfig.ts';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);

    const login = async (name: string, password: string) => {
        try {
            const response = await axios.post('/api/v1/user/login', { name, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setError(null);
                return response.data.user;
            } else {
                setError('Неверный логин или пароль');
                return null;
            }
        } catch (err) {
            setError('Ошибка при авторизации');
            console.error(err);
            return null;
        }
    };

    return { login, error };
};
