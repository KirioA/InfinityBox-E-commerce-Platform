import { useState } from 'react';
import axios from '../../axiosConfig.ts';

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);

    const register = async (name: string, password: string, mail: string) => {
        try {
            const response = await axios.post('/api/v1/user/register', { name, mail, password });

            if (response.data.success) {
                // Если регистрация успешна, сохраняем токен в localStorage
                localStorage.setItem('token', response.data.token);
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
