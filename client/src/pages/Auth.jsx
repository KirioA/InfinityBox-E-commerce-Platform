// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Хук для регистрации и входа
import { useNavigate } from 'react-router-dom'; // Для редиректа после успешной регистрации
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useValidation } from '../hooks/useValidation'; // Подключаем кастомный хук для валидации
import '../styles/auth.css'; // Стиль для формы

function Auth() {
    const { register, login, message, variant, loading, networkError } = useAuth(); // Хук для регистрации/входа
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между регистрацией и входом
    const navigate = useNavigate();

    // Используем хук для валидации
    const { message: validationMessage, variant: validationVariant, validateInput } = useValidation(username, password);

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация данных перед отправкой
        if (!validateInput()) return;

        if (isLogin) {
            await login(username, password);
        } else {
            await register(username, password);
        }

        if (message && variant === 'success') {
            // Перенаправление на главную страницу после успешной регистрации
            navigate('/');
        }
    };

    return (
        <Container className="auth-form-container">
            <div className="auth-form-card">
                <h2 className="auth-form-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>

                {/* Сообщение от кастомного хука валидации */}
                {validationMessage && <Alert variant={validationVariant}>{validationMessage}</Alert>}

                {/* Сообщение об ошибке при сетевой ошибке */}
                {networkError && (
                    <Alert variant="danger">Не удается подключиться к серверу. Попробуйте позже.</Alert>
                )}

                {/* Сообщения от успешной регистрации/входа */}
                {message && <Alert variant={variant}>{message}</Alert>}

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

                    <div className="auth-form-buttons">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                </Form>

                <div className="mt-3 text-center">
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Auth;
