import { useState } from 'react';

interface ValidationResult {
    message: string;
    variant: 'warning' | 'error' | 'success' | '';
    validateInput: () => boolean;
}

export const useValidation = (
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    isLogin: boolean
): ValidationResult => {
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'warning' | 'error' | 'success' | ''>('');

    const validateInput = (): boolean => {
        const englishAlphabet = /^[A-Za-z0-9]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!username || !password || (!isLogin && !confirmPassword)) {
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
        if (!emailPattern.test(email) && !isLogin) {
            setMessage('Пожалуйста, введите правильный email.');
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
        if (!isLogin && password !== confirmPassword) {
            setMessage('Пароли не совпадают.');
            setVariant('warning');
            return false;
        }

        setMessage('');
        setVariant('');
        return true;
    };

    return { message, variant, validateInput };
};
