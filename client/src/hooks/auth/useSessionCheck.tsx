// hooks/auth/useSessionCheck.ts
import { useState, useEffect } from 'react';
import axios from '../../axiosConfig.ts';

export const useSessionCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.post('/api/v1/user/check', { token });

                    // Проверяем, успешен ли ответ
                    if (response.data.success) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        setError(response.data.message || 'Ошибка при проверке сессии');
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err: any) {
                console.error('Ошибка проверки сессии:', err);
                setError('Ошибка при проверке сессии');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, []);

    return { isAuthenticated, loading, error };
};
