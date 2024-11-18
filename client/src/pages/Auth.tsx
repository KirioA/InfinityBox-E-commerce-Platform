import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/auth/useLogin';
import { useRegister } from '../hooks/auth/useRegister';
import { useValidation } from '../hooks/useValidation';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import ErrorAlert from '../components/ErrorAlert';
import { FaGoogle, FaTelegramPlane } from 'react-icons/fa';
import '../styles/auth.css';
import '../styles/global.css';
import { useAuth } from '../contexts/AuthContext'; // Импортируйте хук для авторизации

const Auth = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { login, error: loginError } = useLogin();
    const { register, error: registerError } = useRegister();
    const { message, variant, validateInput } = useValidation(username, password, confirmPassword, email, isLogin);
    const navigate = useNavigate();

    // Получаем информацию о пользователе и его состоянии авторизации
    const { isAuthenticated } = useAuth(); // Используем хук из AuthContext

    useEffect(() => {
        // Если пользователь уже авторизован, перенаправляем его на страницу аккаунта
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate]); // Слежение за состоянием авторизации

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateInput()) {
            if (isLogin) {
                try {
                    const success = await login(username, password);
                    if (success) {
                        setSuccessMessage('Вы успешно вошли в аккаунт!');
                        setError(null);
                        console.log('Успешный вход');

                        // Редирект после успешного логина
                        setTimeout(() => {
                            window.location.reload()                        }, 2000);
                    } else {
                        setError(loginError || 'Ошибка при входе');
                        console.error('Ошибка входа:', loginError);
                    }
                } catch (err) {
                    setError('Не удалось выполнить вход');
                    console.error('Ошибка в handleSubmit при логине:', err);
                }
            } else {
                const registrationSuccess = await register(username, password, email);
                if (!registerError && registrationSuccess) {
                    setIsLogin(true);
                    setSuccessMessage('Вы успешно зарегистрированы, теперь войдите в аккаунт');
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setEmail('');
                    setError(null);
                } else {
                    setError(registerError || 'Ошибка при регистрации');
                    console.error('Ошибка регистрации:', registerError);
                }
            }
        }
    };

    const toggleLoginMode = () => {
        setIsLogin((prevState) => !prevState);
        setSuccessMessage(null);
        setError(null);
    };

    useEffect(() => {
        setError(null);
    }, [isLogin]);

    return (
        <div className="auth-container">
            <Card className="auth-form-card">
                <Card.Body>
                    <h2 className="auth-form-title">{isLogin ? 'Войти' : 'Зарегистрироваться'}</h2>

                    <ErrorAlert message={successMessage || error} />
                    {message && <Alert variant={variant}>{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="text"
                                placeholder="Введите логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        {!isLogin && (
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="auth-form-input"
                                    type="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {!isLogin && (
                            <Form.Group className="mb-3">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <Form.Control
                                    className="auth-form-input"
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <Button variant="primary" type="submit" className="auth-form-button">
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                        <Button
                            variant="link"
                            onClick={toggleLoginMode}
                            className="auth-form-toggle-link"
                        >
                            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                        </Button>
                    </Form>

                    <div className="alternative-login">
                        <p>Или войдите с помощью:</p>
                        <div className="social-icons">
                            <Button variant="outline-danger" className="social-icon-btn">
                                <FaGoogle size={24} />
                            </Button>
                            <Button variant="outline-primary" className="social-icon-btn">
                                <FaTelegramPlane size={24} />
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Auth;
