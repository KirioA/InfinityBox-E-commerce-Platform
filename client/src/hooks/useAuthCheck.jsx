import { useState, useEffect } from 'react';

export const useAuthCheck = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Получаем пользователя из localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Восстанавливаем пользователя из localStorage
        }
    }, []);

    return { user };
};