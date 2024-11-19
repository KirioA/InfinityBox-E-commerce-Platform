import { useState, useEffect } from 'react';
import axios from '../../axiosConfig.ts';

interface Order {
    date: string;
    orderNumber: string;
    status: string;
    totalAmount: number;
}

interface User {
    username: string;
    email: string;
    bonusPoints: number;
    status: string;
    registrationDate: string;
}

interface UseFetchDataResponse {
    user: User | null;
    orderHistory: Order[] | null;
    loading: boolean;
    error: string | null;
}

export const useFetchData = (): UseFetchDataResponse => {
    const [user, setUser] = useState<User | null>(null);
    const [orderHistory, setOrderHistory] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Необходимо авторизоваться');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/v1/user/fetchdata', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setUser(response.data.user);
                    setOrderHistory(response.data.orderHistory);
                } else {
                    setError('Не удалось загрузить данные пользователя');
                }
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, orderHistory, loading, error };
};
