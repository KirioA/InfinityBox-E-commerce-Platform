import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { loginStart, loginSuccess, loginFailure } from '../../slices/adminSlice';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

const AdminAuthPage: React.FC = () => {
    // Form state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // UI interaction states
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Hooks and context
    const { theme } = useTheme();
    const { isAdminAuthenticated, error, loading } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Redirect on authentication
    useEffect(() => {
        if (isAdminAuthenticated) {
            navigate('/admin');
        }
    }, [isAdminAuthenticated, navigate]);

    // Form submission handler
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

    // Styles object
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
                    <h2 style={styles.authFormTitle}>Вход в панель администратора</h2>

                    {/* Error and Loading Handling */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {loading && <Alert variant="info">Загрузка...</Alert>}

                    {/* Auth Form */}
                    <Form onSubmit={handleLogin}>
                        {/* Username Input */}
                        <Form.Group className="mb-3">
                            <Form.Label>Логин администратора</Form.Label>
                            <Form.Control
                                style={styles.authFormInput}
                                type="text"
                                placeholder="Введите логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <div style={inputGroupStyle}>
                                <Form.Control
                                    style={styles.authFormInput}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
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
                            {loading ? 'Вход...' : 'Войти'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminAuthPage;