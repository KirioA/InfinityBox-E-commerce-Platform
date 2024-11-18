import { useState } from 'react';
import axios from '../../axiosConfig.ts';

interface UpdateUserData {
    username?: string;
    email?: string;
    password?: string;
}

export const useUpdateUser = () => {
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (data: UpdateUserData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Необходимо авторизоваться');
                return null;
            }

            const response = await axios.put('/api/v1/user/update', data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setError(null);
                return response.data.user; // Возвращаем обновленные данные пользователя
            } else {
                setError('Ошибка при обновлении данных пользователя');
                return null;
            }
        } catch (err) {
            setError('Ошибка при обновлении данных');
            console.error(err);
            return null;
        }
    };

    return { updateUser, error };
};
