import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/auth/useLogin';
import { useRegister } from '../hooks/auth/useRegister';
import { useValidation } from '../hooks/useValidation';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import ErrorAlert from '../components/ErrorAlert';
import { FaGoogle, FaTelegramPlane } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Auth = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { theme } = useTheme();

    const { login, error: loginError } = useLogin();
    const { register, error: registerError } = useRegister();
    const { message, variant, validateInput } = useValidation(username, password, confirmPassword, email, isLogin);
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateInput()) {
            if (isLogin) {
                try {
                    const success = await login(username, password);
                    if (success) {
                        setSuccessMessage('Вы успешно вошли в аккаунт!');
                        setError(null);

                        setTimeout(() => {
                            navigate('/account');
                        }, 2000);
                    } else {
                        setError(loginError || 'Ошибка при входе');
                    }
                } catch {
                    setError('Не удалось выполнить вход');
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

    const styles = {
        authContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        },
        authFormCard: {
            width: '100%',
            maxWidth: 400,
            padding: 20,
            borderRadius: 20,
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
            color: theme === 'light' ? '#000000' : '#ffffff',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
        },
        authFormTitle: {
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 24,
            fontWeight: 'bold',
            color: theme === 'light' ? '#000000' : '#ffffff',
        },
        authFormInput: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#666666',
            color: theme === 'light' ? '#333333' : '#ffffff',
            border: `1px solid ${theme === 'light' ? '#81c784' : '#81c784'}`,
            borderRadius: 5,
            padding: 12,
            width: '100%',
            marginBottom: 15,
        },
        authFormButton: {
            width: '100%',
            padding: 12,
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
            borderColor: '#81c784',
            color: theme === 'light' ? '#81c784' : '#ffffff',
            border: '2px solid #81c784',
            borderRadius: 5,
            fontSize: 16,
            fontWeight: 'bold',
        },
        authFormButtonHover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderColor: '#81c784',
        },
        authFormButtonActive: {
            backgroundColor: '#66bb6a',
            color: '#ffffff',
            borderColor: '#66bb6a',
        },
        authFormToggleLink: {
            display: 'block',
            textAlign: 'center',
            color: '#bdbdbd',
            fontSize: 14,
            marginTop: 15,
            textDecoration: 'none',
        },
        alternativeLogin: {
            marginTop: 30,
            textAlign: 'center',
        },
        socialIcons: {
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            marginTop: 20,
        },
        googleBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#db4437',
            border: 'none',
            color: 'white',
            transition: 'all 0.3s',
        },
        telegramBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#0088cc',
            border: 'none',
            color: 'white',
            transition: 'all 0.3s',
        },
    };
    return (
        <div style={styles.authContainer}>
            <Card style={styles.authFormCard}>
                <Card.Body>
                    <h2 style={styles.authFormTitle}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</h2>

                    <ErrorAlert message={successMessage || error} />
                    {message && <Alert variant={variant}>{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                style={styles.authFormInput}
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
                                    style={styles.authFormInput}
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
                                style={styles.authFormInput}
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
                                    style={styles.authFormInput}
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <Button
                            type="submit"
                            style={{
                                ...styles.authFormButton,
                                ...(isHovered ? styles.authFormButtonHover : {}),
                                ...(isActive ? styles.authFormButtonActive : {}),
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onMouseDown={() => setIsActive(true)}
                            onMouseUp={() => setIsActive(false)}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                        <Button variant="link" onClick={toggleLoginMode} style={styles.authFormToggleLink}>
                            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                        </Button>
                    </Form>

                    <div style={styles.alternativeLogin}>
                        <p>Или войдите с помощью:</p>
                        <div style={styles.socialIcons}>
                            <Button variant="outline-danger" style={styles.googleBtn}>
                                <FaGoogle size={24} />
                            </Button>
                            <Button variant="outline-primary" style={styles.telegramBtn}>
                                <FaTelegramPlane size={24} />
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

const styles = {


    authFormButtonHover: {
        backgroundColor: '#81c784', // Цвет фона при наведении
        color: '#ffffff', // Цвет текста при наведении
        borderColor: '#81c784', // Обводка не меняется
    },
    authFormButtonActive: {
        backgroundColor: '#66bb6a', // Цвет фона при нажатии
        color: '#ffffff', // Цвет текста при нажатии
        borderColor: '#66bb6a', // Обводка меняется на более темный зеленый
    },
    authFormToggleLink: {
        display: 'block',
        textAlign: 'center',
        color: '#bdbdbd', // Светло-черный цвет
        fontSize: 14,
        marginTop: 15,
        textDecoration: 'none',
    },
    alternativeLogin: {
        marginTop: 30,
        textAlign: 'center',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
    },
    googleBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#db4437', // Красный фон для Google
        border: 'none',
        color: 'white',
        transition: 'all 0.3s',
    },
    telegramBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#0088cc', // Синий фон для Telegram
        border: 'none',
        color: 'white',
        transition: 'all 0.3s',
    },
};

export default Auth;
