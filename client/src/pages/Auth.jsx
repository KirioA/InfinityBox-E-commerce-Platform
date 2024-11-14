// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Хук для регистрации и входа
import { useNavigate } from 'react-router-dom'; // Для редиректа после успешной регистрации
import { Form, Button, Container } from 'react-bootstrap';
import { useValidation } from '../hooks/useValidation'; // Подключаем кастомный хук для валидации
import { FaGoogle, FaTelegramPlane } from 'react-icons/fa'; // Иконки для Gmail и Telegram
import { useAuthCheck } from '../hooks/useAuthCheck.jsx'; // Подключаем хук для проверки аутентификации
import ErrorAlert from '../components/ErrorAlert'; // Подключаем компонент для отображения ошибок
import '../styles/auth.css'; // Стиль для формы

function Auth() {
    const { isAuthenticated } = useAuthCheck(); // Проверка аутентификации
    const { register, login, error, loading } = useAuth(); // Хук для регистрации/входа
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Для регистрации
    const [email, setEmail] = useState(''); // Для регистрации
    const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между регистрацией и входом
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Используем только один navigate

    // Если пользователь авторизован, перенаправляем его на главную страницу
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Можно перенаправить на главную страницу или страницу личного кабинета
        }
    }, [isAuthenticated, navigate]);

    // Используем хук для валидации
    const { message: validationMessage, variant: validationVariant, validateInput } = useValidation(username, password, confirmPassword, email, isLogin);

    // Сброс ошибок при переключении форм
    const handleFormSwitch = () => {
        setIsLogin(!isLogin);
        // Сбрасываем сообщения об ошибке
        setErrorMessage('');
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация данных перед отправкой
        if (!validateInput()) return;

        // Если форма регистрации
        if (isLogin) {
            await login(username, password);
        } else {
            await register(username, password, email); // Добавлено email при регистрации
        }

        if (error && error === 'success') {
            // Перенаправление на главную страницу после успешной регистрации
            navigate('/');
        } else {
            setErrorMessage(error); // Отображаем ошибку, если она есть
        }
    };

    return (
        <Container className="auth-form-container">
            <div className="auth-form-card">
                <h2 className="auth-form-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>

                {/* Компонент для отображения ошибки */}
                <ErrorAlert message={errorMessage || validationMessage} variant={validationVariant} />

                <Form onSubmit={handleSubmit}>
                    {/* Поле для имени пользователя */}
                    <Form.Group controlId="username">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    {/* Поле для почты (только для регистрации) */}
                    {!isLogin && (
                        <Form.Group controlId="email">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    )}

                    {/* Поле для пароля */}
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {/* Поле для подтверждения пароля (только для регистрации) */}
                    {!isLogin && (
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Подтверждение пароля</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Подтвердите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                    )}

                    <div className="auth-form-buttons">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                </Form>

                <div className="mt-3 text-center">
                    <Button variant="link" onClick={handleFormSwitch}>
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </Button>
                </div>

                {/* Подпись и кнопки альтернативной регистрации */}
                <div className="mt-4 text-center">
                    <p>Или зарегистрируйтесь с помощью:</p>
                    <div className="social-buttons">
                        <Button variant="outline-danger" className="social-btn">
                            <FaGoogle size={30}/>
                        </Button>
                        <Button variant="outline-info" className="social-btn">
                            <FaTelegramPlane size={30}/>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Auth;
