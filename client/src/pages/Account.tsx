import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useFetchData } from '../hooks/auth/useFetchData'; // Импортируем переименованный хук
import { useUpdateUser } from '../hooks/auth/useUpdateUser';
import { useLogout } from '../hooks/auth/useLogout';
import { Form, Button, Container, Alert, Row, Col, Card, Table, Modal } from 'react-bootstrap';

interface FormData {
    username: string;
    email: string;
    password?: string;
}

const Account: React.FC = () => {
    const { user, orderHistory, loading, error } = useFetchData(); // Используем новый хук
    const { updateUser } = useUpdateUser();
    const { logout } = useLogout();
    const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'success' | 'danger'>('success');
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Стейт для отображения модального окна
    const [isEditing, setIsEditing] = useState(false); // Стейт для переключения режима редактирования

    useEffect(() => {
        if (user) {
            setFormData({ username: user.username, email: user.email });
        }
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setMessage('Информация обновлена');
            setVariant('success');
            setIsEditing(false); // После успешного обновления возвращаемся в режим просмотра
        } catch (error) {
            setMessage('Не удалось обновить информацию');
            setVariant('danger');
        }
    };

    const handleLogout = async () => {
        await logout();
        setShowLogoutModal(false);
        // Здесь можно перенаправить пользователя на страницу входа
        window.location.href = '/auth';
    };

    if (loading) return <p>Загрузка...</p>; // Показать сообщение, пока идет загрузка данных

    return (
        <Container>
            <h2 className="mb-4">Личный кабинет</h2>
            {message && <Alert variant={variant}>{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>Личная информация</Card.Header>
                        <Card.Body>
                            {!isEditing ? (
                                <>
                                    <p>Имя пользователя: <strong>{user?.username}</strong></p>
                                    <p>Email: <strong>{user?.email}</strong></p>
                                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                                        Редактировать информацию
                                    </Button>
                                </>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Имя пользователя</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email" className="mt-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password" className="mt-3">
                                        <Form.Label>Новый пароль</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Введите новый пароль"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        Обновить
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>Информация о покупках</Card.Header>
                        <Card.Body>
                            <p>Баланс бонусных баллов: <strong>{user?.bonusPoints ?? 0}</strong></p>
                            <p>Статус аккаунта: <strong>{user?.status ?? 'Обычный'}</strong></p>
                            <p>Дата регистрации: <strong>{user?.registrationDate ?? 'Неизвестно'}</strong></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
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
                </Col>
            </Row>

            <Button variant="danger" className="mt-4" onClick={() => setShowLogoutModal(true)}>
                Выйти
            </Button>

            {/* Модальное окно для подтверждения выхода */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение выхода</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите выйти?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Выйти
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Account;
