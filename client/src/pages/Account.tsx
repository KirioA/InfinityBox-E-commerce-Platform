import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.tsx';
import { fetchUserData } from '../slices/userSlice';
import { useLogout } from '../hooks/auth/useLogout';
import { Container, Button, Row, Col, Card, Image, Alert, Table, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ChangePasswordModal from '../../src/components/modal/changePasswordModal.tsx';
import UploadAvatarModal from '../../src/components/modal/updateAvatarModal.tsx';

const Account: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, orderHistory, loading, error } = useAppSelector((state) => state.user);
    const { logout } = useLogout();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUploadAvatarModal, setShowUploadAvatarModal] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'success' | 'danger'>('success');
    const token = localStorage.getItem('token'); // Используем токен для авторизации

    useEffect(() => {
        if (token) {
            console.log('[INFO] Token used for fetch:', token);
            dispatch(fetchUserData(token))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        console.log('[INFO] Fetched user data:', response.payload);
                    } else {
                        console.error('[ERROR] Fetching user data failed:', response.error.message);
                    }
                })
                .catch((error) => {
                    console.error('[ERROR] Unexpected fetch error:', error);
                });
        } else {
            console.warn('[WARNING] Token is missing.');
        }
    }, [dispatch, token]);

    const formatValue = (value: string | undefined | null, defaultValue: string = 'Не указан') =>
        value && value !== 'None' ? value : defaultValue;

    const handleUpdatePassword = async (newPassword: string) => {
        try {
            console.log('[INFO] Updating password with:', newPassword);
            setMessage('Пароль успешно обновлен');
            setVariant('success');
        } catch {
            console.error('[ERROR] Error updating password');
            setMessage('Не удалось обновить пароль');
            setVariant('danger');
        }
        setShowChangePasswordModal(false);
    };

    const handleUpdateAvatar = async (avatarUrl: string) => {
        try {
            console.log('[INFO] Updating avatar with URL:', avatarUrl);
            setMessage('Аватар успешно обновлен');
            setVariant('success');
        } catch {
            console.error('[ERROR] Error updating avatar');
            setMessage('Не удалось обновить аватар');
            setVariant('danger');
        }
        setShowUploadAvatarModal(false);
    };

    const handleLogout = async () => {
        await logout();
        window.location.href = '/auth';
    };

    if (loading) {
        return (
            <Container
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spinner animation="border" style={{ color: '#81c784' }} />
            </Container>
        );
    }

    return (
        <Container style={{ minHeight: '80vh' }}>
            <motion.h2
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Личный кабинет
            </motion.h2>

            {message && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <Alert variant={variant}>{message}</Alert>
                </motion.div>
            )}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <Alert variant="danger">{error}</Alert>
                </motion.div>
            )}

            <Row>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                    >
                        <Card className="mb-4">
                            <Card.Header>Личная информация</Card.Header>
                            <Card.Body>
                                <Image
                                    src={formatValue(user?.profilePicture, '/default-avatar.png')}
                                    roundedCircle
                                    className="mb-3"
                                    width="100"
                                    height="100"
                                />
                                <p>Имя пользователя: <strong>{formatValue(user?.message)}</strong></p>
                                <p>Email: <strong>{formatValue(user?.mail)}</strong></p>
                                <p>Имя: <strong>{formatValue(user?.firstName)}</strong></p>
                                <p>Фамилия: <strong>{formatValue(user?.lastName)}</strong></p>
                                <Button onClick={() => setShowChangePasswordModal(true)}>Сменить пароль</Button>
                                <Button onClick={() => setShowUploadAvatarModal(true)} className="ml-2">
                                    Изменить аватар
                                </Button>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>

                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.6 }}
                    >
                        <Card className="mb-4">
                            <Card.Header>Информация о покупках</Card.Header>
                            <Card.Body>
                                <p>Баланс бонусных баллов: <strong>{formatValue(user?.bonusPoints, '0')}</strong></p>
                                <p>Статус аккаунта: <strong>{formatValue(user?.status, 'Обычный')}</strong></p>
                                <p>Дата регистрации: <strong>{formatValue(new Date(user?.createdAt).toLocaleDateString())}</strong></p>
                                <p>Адрес:
                                    <strong>
                                        {formatValue(user?.address?.street)}
                                        , {formatValue(user?.address?.city)}
                                    </strong>
                                </p>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.8 }}
                    >
                        <Card className="mb-4">
                            <Card.Header>История заказов</Card.Header>
                            <Card.Body>
                                {orderHistory && orderHistory.length > 0 ? (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                        <tr>
                                            <th>Дата</th>
                                            <th>Заказ №</th>
                                            <th>Статус</th>
                                            <th>Сумма</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderHistory.map((order, index) => (
                                            <tr key={index}>
                                                <td>{formatValue(order.date)}</td>
                                                <td>{formatValue(order.orderNumber)}</td>
                                                <td>{formatValue(order.status)}</td>
                                                <td>{order.totalAmount ? `${order.totalAmount} ₽` : 'Не указано'}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>Нет истории заказов.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <Button variant="danger" onClick={handleLogout}>Выйти</Button>

            <ChangePasswordModal
                show={showChangePasswordModal}
                onHide={() => setShowChangePasswordModal(false)}
                onSubmit={handleUpdatePassword}
            />
            <UploadAvatarModal
                show={showUploadAvatarModal}
                onHide={() => setShowUploadAvatarModal(false)}
                onSubmit={handleUpdateAvatar}
            />
        </Container>
    );
};

export default Account;
