import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/auth/useFetchData';
import { useUpdateUser } from '../hooks/auth/useUpdateUser';
import { useLogout } from '../hooks/auth/useLogout';
import { Container, Button, Row, Col, Card, Image, Alert, Table, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ChangePasswordModal from '../../src/components/modal/changePasswordModal.tsx';
import UploadAvatarModal from '../../src/components/modal/updateAvatarModal.tsx';

const Account: React.FC = () => {
    const { user, orderHistory, loading, error } = useFetchData();
    const { updateUser } = useUpdateUser();
    const { logout } = useLogout();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUploadAvatarModal, setShowUploadAvatarModal] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'success' | 'danger'>('success');

    useEffect(() => {
        if (user) {
            // Обновление состояния формы данными пользователя, если требуется
        }
    }, [user]);

    const handleUpdatePassword = async (newPassword: string) => {
        try {
            await updateUser({ password: newPassword });
            setMessage('Пароль успешно обновлен');
            setVariant('success');
        } catch {
            setMessage('Не удалось обновить пароль');
            setVariant('danger');
        }
        setShowChangePasswordModal(false);
    };

    const handleUpdateAvatar = async (avatarUrl: string) => {
        try {
            await updateUser({ avatarUrl });
            setMessage('Аватар успешно обновлен');
            setVariant('success');
        } catch {
            setMessage('Не удалось обновить аватар');
            setVariant('danger');
        }
        setShowUploadAvatarModal(false);
    };

    const handleLogout = async () => {
        await logout();
        window.location.href = '/auth';
    };

    const buttonStyles = {
        base: {
            padding: '12px',
            backgroundColor: '#ffffff',
            borderColor: '#81c784',
            color: '#81c784',
            border: '2px solid #81c784',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s',
        },
        hover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderColor: '#81c784',
        },
        active: {
            backgroundColor: '#66bb6a',
            color: '#ffffff',
            borderColor: '#66bb6a',
        },
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
                                    src={user?.avatarUrl || '/default-avatar.png'}
                                    roundedCircle
                                    className="mb-3"
                                    width="100"
                                    height="100"
                                />
                                <p>Имя пользователя: <strong>{user?.username}</strong></p>
                                <p>Email: <strong>{user?.email}</strong></p>
                                <Button
                                    style={buttonStyles.base}
                                    onMouseEnter={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, buttonStyles.base)}
                                    onMouseDown={(e) => Object.assign(e.target.style, buttonStyles.active)}
                                    onMouseUp={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                                    onClick={() => setShowChangePasswordModal(true)}
                                >
                                    Сменить пароль
                                </Button>
                                <Button
                                    style={{ ...buttonStyles.base, marginLeft: '10px' }}
                                    onMouseEnter={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, buttonStyles.base)}
                                    onMouseDown={(e) => Object.assign(e.target.style, buttonStyles.active)}
                                    onMouseUp={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                                    onClick={() => setShowUploadAvatarModal(true)}
                                >
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
                                <p>Баланс бонусных баллов: <strong>{user?.bonusPoints ?? 0}</strong></p>
                                <p>Статус аккаунта: <strong>{user?.status ?? 'Обычный'}</strong></p>
                                <p>Дата регистрации: <strong>{user?.registrationDate ?? 'Неизвестно'}</strong></p>
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
                                                <td>{order.date}</td>
                                                <td>{order.orderNumber}</td>
                                                <td>{order.status}</td>
                                                <td>{order.totalAmount} ₽</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>У вас пока нет заказов</p>
                                )}
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <Button
                    style={buttonStyles.base}
                    onMouseEnter={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, buttonStyles.base)}
                    onMouseDown={(e) => Object.assign(e.target.style, buttonStyles.active)}
                    onMouseUp={(e) => Object.assign(e.target.style, buttonStyles.hover)}
                    className="mt-4"
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </motion.div>

            <ChangePasswordModal
                show={showChangePasswordModal}
                onHide={() => setShowChangePasswordModal(false)}
                onSave={handleUpdatePassword}
            />

            <UploadAvatarModal
                show={showUploadAvatarModal}
                onHide={() => setShowUploadAvatarModal(false)}
                onSave={handleUpdateAvatar}
            />
        </Container>
    );
};

export default Account;
