import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { login, register, clearError } from '../slices/authSlice';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import ErrorAlert from '../components/ErrorAlert';
import { FaGoogle, FaTelegramPlane,FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useValidation } from '../hooks/useValidation'; // Assuming the hook is in this file path

const Auth: React.FC = () => {
    // Form state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);

    // UI interaction states
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Use custom validation hook
    const { message, variant, validateInput } = useValidation(
        username,
        password,
        confirmPassword,
        email,
        isLogin
    );

    // Hooks and context
    const { theme } = useTheme();
    const { isAuthenticated, error, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Redirect on authentication
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate]);

    // Clear errors when switching between login/register
    useEffect(() => {
        dispatch(clearError());
    }, [isLogin, dispatch]);

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate input first
        if (!validateInput()) {
            return;
        }

        // Attempt login or registration
        if (isLogin) {
            dispatch(login({ username, password }));
        } else {
            dispatch(register({ username, password, email }));
        }
    };

    // Toggle between login and register modes
    const toggleLoginMode = () => {
        setIsLogin((prevState) => !prevState);
        // Reset form fields
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        // Clear errors
        dispatch(clearError());
    };

    // Styles object (unchanged from previous version)
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
    const inputGroupStyle = {
        position: 'relative' as const,
        width: '100%',
    };

    const eyeIconStyle = {
        position: 'absolute' as const,
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: theme === 'light' ? '#666666' : '#ffffff',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5px',
    };

    return (
        <div style={styles.authContainer}>
            <Card style={styles.authFormCard}>
                <Card.Body>
                    <h2 style={styles.authFormTitle}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </h2>

                    {/* Validation Message Handling */}
                    {message && (
                        <Alert
                            variant={
                                variant === 'warning' ? 'warning' :
                                    variant === 'error' ? 'danger' :
                                        variant === 'success' ? 'success' :
                                            'info'
                            }
                            className="mb-3"
                        >
                            {message}
                        </Alert>
                    )}

                    {/* Error and Loading Handling */}
                    {error && <ErrorAlert message={error} />}
                    {loading && <Alert variant="info">Загрузка...</Alert>}

                    {/* Auth Form */}
                    <Form onSubmit={handleSubmit}>
                        {/* Username Input */}
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

                        {/* Email Input (Registration Only) */}
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
                            <div style={inputGroupStyle}>
                                <Form.Control
                                    style={styles.authFormInput}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    style={eyeIconStyle}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </Form.Group>

                        {/* Confirm Password Input (Registration Only) */}
                        {!isLogin && (
                            <Form.Group className="mb-3">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <div style={inputGroupStyle}>
                                    <Form.Control
                                        style={styles.authFormInput}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Подтвердите пароль"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        style={eyeIconStyle}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>
                            </Form.Group>
                        )}

                        {/* Submit Button */}
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
                            disabled={loading}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                        {/* Toggle Login/Register Mode */}
                        <Button
                            variant="link"
                            onClick={toggleLoginMode}
                            style={styles.authFormToggleLink}
                        >
                            {isLogin
                                ? 'Нет аккаунта? Зарегистрируйтесь'
                                : 'Уже есть аккаунт? Войдите'}
                        </Button>
                    </Form>

                    {/* Alternative Login Options */}
                    <div style={styles.alternativeLogin}>
                        <p>Или войдите с помощью:</p>
                        <div style={styles.socialIcons}>
                            <Button
                                variant="outline-danger"
                                style={styles.googleBtn}
                                onClick={() => {/* Implement Google OAuth */}}
                            >
                                <FaGoogle size={24} />
                            </Button>
                            <Button
                                variant="outline-primary"
                                style={styles.telegramBtn}
                                onClick={() => {/* Implement Telegram OAuth */}}
                            >
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