import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [user, setUser] = useState({user: 'boba'});

    // Загрузка пользователя из localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Восстанавливаем пользователя из localStorage
        }
    }, []);

    const register = async (username, email, password) => {
        setLoading(true);
        setMessage('');
        setVariant('');

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                setUser({ username, email });
                localStorage.setItem('user', JSON.stringify({ username, email })); // Сохраняем в localStorage
                setMessage('Регистрация успешна!');
                setVariant('success');
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Ошибка сети. Попробуйте позже.';
            setMessage(errorMessage);
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        setLoading(true);
        setMessage('');
        setVariant('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });

            if (response.status === 200) {
                setUser({ username });
                localStorage.setItem('user', JSON.stringify({ username })); // Сохраняем в localStorage
                setMessage('Вход успешен!');
                setVariant('success');
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Ошибка сети. Попробуйте позже.';
            setMessage(errorMessage);
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Удаляем данные о пользователе из localStorage
        setMessage('Вы вышли из аккаунта.');
        setVariant('info');
    };

    return { loading, message, variant, user, register, login, logout };
};
