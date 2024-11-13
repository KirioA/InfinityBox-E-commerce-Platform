// src/hooks/useAuth.jsx
import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const register = async (username, password) => {
        setLoading(true);
        setMessage(''); // Сбрасываем предыдущие сообщения
        setVariant('');

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password
            });

            if (response.status === 201) {
                setMessage('Регистрация успешна!');
                setVariant('success');
            }
        } catch (error) {
            if (error.response) {
                // Сервер вернул ошибку
                setMessage(error.response.data.message || 'Ошибка регистрации');
                setVariant('danger');
            } else if (error.request) {
                // Ошибка сети или отсутствие ответа от сервера
                setMessage('Не удалось подключиться к серверу. Попробуйте позже.');
                setVariant('danger');
            } else {
                // Неизвестная ошибка
                setMessage('Неизвестная ошибка. Попробуйте снова.');
                setVariant('danger');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        setLoading(true);
        setMessage(''); // Сбрасываем предыдущие сообщения
        setVariant('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });

            if (response.status === 200) {
                setMessage('Вход успешен!');
                setVariant('success');
            }
        } catch (error) {
            if (error.response) {
                // Сервер вернул ошибку
                setMessage(error.response.data.message || 'Ошибка входа');
                setVariant('danger');
            } else if (error.request) {
                // Ошибка сети или отсутствие ответа от сервера
                setMessage('Не удалось подключиться к серверу. Попробуйте позже.');
                setVariant('danger');
            } else {
                // Неизвестная ошибка
                setMessage('Неизвестная ошибка. Попробуйте снова.');
                setVariant('danger');
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, message, variant, register, login };
};
