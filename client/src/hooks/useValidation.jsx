// src/hooks/useValidation.jsx
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const useValidation = (username, password) => {
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const validateInput = () => {
        const englishAlphabet = /^[A-Za-z0-9]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!username || !password) {
            setMessage('Пожалуйста, заполните все поля.');
            setVariant('warning');
            return false;
        }
        if (!englishAlphabet.test(username)) {
            setMessage('Логин должен содержать только английские буквы и цифры.');
            setVariant('warning');
            return false;
        }
        if (username.length <= 4) {
            setMessage('Логин должен быть длиннее 4 символов.');
            setVariant('warning');
            return false;
        }
        if (password.length < 6) {
            setMessage('Пароль должен быть не менее 6 символов.');
            setVariant('warning');
            return false;
        }
        if (!passwordPattern.test(password)) {
            setMessage('Пароль должен содержать хотя бы одну заглавную букву, цифру и спецсимвол.');
            setVariant('warning');
            return false;
        }
        setMessage('');
        return true;
    };

    return { message, variant, validateInput };
};
