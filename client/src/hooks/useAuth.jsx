// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем axios для HTTP-запросов

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Для обработки ошибок

    useEffect(() => {
        const loadUser = async () => {
            try {
                // Проверка авторизации на сервере
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/api/auth/check', {
                        headers: {
                            Authorization: `Bearer ${token}` // Отправляем JWT в заголовке
                        }
                    });
                    if (response.data.authenticated) {
                        setUser(response.data.user); // Сохраняем данные о пользователе
                    } else {
                        setUser(null); // Если не авторизован, очищаем данные о пользователе
                    }
                } else {
                    setUser(null); // Если нет токена, очищаем данные о пользователе
                }
            } catch (err) {
                console.error('Ошибка при проверке сессии:', err);
                setError('Ошибка проверки сессии');
            } finally {
                setLoading(false); // Заканчиваем загрузку
            }
        };

        loadUser();
    }, []);

    // Функция для авторизации
    const login = async (name, password) => {
        try {
            const response = await axios.post('/api/auth/login', { name, password });
            if (response.data.success) {
                const { token, user } = response.data; // Получаем JWT и данные пользователя
                localStorage.setItem('token', token); // Сохраняем JWT в localStorage
                setUser(user);
                setError(null); // Очищаем ошибки
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (err) {
            setError('Ошибка при авторизации');
            console.error(err);
        }
    };

    // Функция для регистрации
    const register = async (name, password, mail) => {
        try {
            const response = await axios.post('/api/v1/user/register', { name, password, mail });
            if (response.data.success) {
                const { token, user } = response.data; // Получаем JWT и данные пользователя
                localStorage.setItem('token', token); // Сохраняем JWT в localStorage
                setUser(user);
                setError(null); // Очищаем ошибки
            } else {
                setError('Ошибка регистрации. Попробуйте еще раз.');
            }
        } catch (err) {
            setError('Ошибка при регистрации');
            console.error(err);
        }
    };

    // Функция для выхода из аккаунта
    const logout = async () => {
        try {
            localStorage.removeItem('token'); // Удаляем токен из localStorage
            setUser(null); // Очищаем данные о пользователе
        } catch (err) {
            console.error('Ошибка при выходе:', err);
        }
    };

    return { user, loading, error, login, register, logout };
};
