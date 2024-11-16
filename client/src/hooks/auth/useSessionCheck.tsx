import { useState, useEffect } from 'react';
import axios from '../../axiosConfig.ts';

export const useSessionCheck = () => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/api/v1/user/check', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.authenticated) setUser(response.data.user);
                    else setUser(null);
                } else setUser(null);
            } catch (err) {
                setError('Ошибка проверки сессии');
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    return { user, loading, error };
};
