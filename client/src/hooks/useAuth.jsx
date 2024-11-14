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
                const response = await axios.get('/api/auth/check');
                if (response.data.authenticated) {
                    // Если сервер подтверждает авторизацию, восстанавливаем пользователя из сессии
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser)); // Восстанавливаем пользователя
                    }
                } else {
                    // Если сервер не подтверждает авторизацию, очищаем localStorage
                    localStorage.removeItem('user');
                }
            } catch (err) {
                console.error('Ошибка при проверке сессии:', err);
                setError('Ошибка проверки сессии');
                localStorage.removeItem('user');
            } finally {
                setLoading(false); // Заканчиваем загрузку
            }
        };

        loadUser();
    }, []);

    // Функция для авторизации
    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем данные о пользователе в localStorage
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
    const register = async (username, password, email) => {
        try {
            const response = await axios.post('/api/auth/register', { username, password, email });
            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем данные о пользователе в localStorage
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
            await axios.post('/api/auth/logout'); // Отправляем запрос на сервер для выхода
            setUser(null);
            localStorage.removeItem('user'); // Очищаем localStorage
        } catch (err) {
            console.error('Ошибка при выходе:', err);
        }
    };

    return { user, loading, error, login, register, logout };
};
