import { useState } from 'react';
export const useLogout = () => {
    const [error, setError] = useState<string | null>(null);

    const logout = async () => {
        try {
            // Здесь можно добавить вызов API для завершения сессии на сервере, если необходимо
            localStorage.removeItem('token'); // Удаляем токен из localStorage
            setError(null);
        } catch (err) {
            setError('Ошибка при выходе');
            console.error(err);
        }
    };

    return { logout, error };
};
