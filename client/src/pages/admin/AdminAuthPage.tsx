// pages/AdminAuthPage.tsx
import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginStart, loginSuccess, loginFailure } from '../../slices/adminSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAdminAuthenticated, loading, error } = useAppSelector((state) => state.admin);

    console.log(isAdminAuthenticated)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAdminAuthenticated) {
            navigate('/admin');
        }
    }, [isAdminAuthenticated, navigate]);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await axios.post('/api/admin/login', { username, password });

            if (response.data.success) {
                dispatch(loginSuccess());
            } else {
                dispatch(loginFailure('Неверные данные для входа.'));
            }
        } catch (err) {
            dispatch(loginFailure('Ошибка сервера. Попробуйте позже.'));
        }
    };

    return (
        <div>
            <h1>Вход в панель администратора</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Логин:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AdminAuthPage;
