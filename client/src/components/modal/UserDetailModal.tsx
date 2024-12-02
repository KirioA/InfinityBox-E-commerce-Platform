import React from 'react';
import { Modal, Button, Row, Col, Card, Badge, Image } from 'react-bootstrap';
import { User } from '../../pages/admin/UserManagement.tsx'; // Предполагаем, что интерфейс User экспортирован

interface UserDetailsModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
}

const renderStatusBadge = (status: string) => {
    switch(status) {
        case 'active':
            return <Badge bg="success">Активен</Badge>;
        case 'blocked':
            return <Badge bg="danger">Заблокирован</Badge>;
        case 'inactive':
            return <Badge bg="secondary">Неактивен</Badge>;
        default:
            return <Badge bg="secondary">Неизвестно</Badge>;
    }
};

const renderRoleBadge = (role: string) => {
    switch(role) {
        case 'admin':
            return <Badge bg="danger">Администратор</Badge>;
        case 'manager':
            return <Badge bg="warning">Менеджер</Badge>;
        case 'customer':
            return <Badge bg="primary">Покупатель</Badge>;
        default:
            return <Badge bg="secondary">Неизвестно</Badge>;
    }
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ show, onHide, user }) => {
    if (!user) return null;

    // Функция для отображения адреса, если он существует
    const renderAddress = (address: { street?: string, city?: string, postalCode?: string, country?: string }) => {
        if (!address) return 'Не указан';
        const { street, city, postalCode, country } = address;
        return (
            <>
                {street && <p>{street}</p>}
                {city && <p>{city}</p>}
                {postalCode && <p>{postalCode}</p>}
                {country && <p>{country}</p>}
            </>
        );
    };

    // URL аватарки или путь к дефолтному изображению
    const avatarUrl = user.profilePicture || '/default-avatar.png';

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Подробная информация о пользователе</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Body className="text-center">
                                <div className="mb-3">
                                    {renderRoleBadge(user.role)}
                                    {' '}
                                    {renderStatusBadge(user.status)}
                                </div>
                                {/* Отображаем аватарку */}
                                <div className="mb-3">
                                    {user.profilePicture ? (
                                        <Image
                                            src={`http://localhost:3000${avatarUrl}`}
                                            roundedCircle
                                            className="mb-3"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <p>Аватарка не установлена</p>
                                    )}
                                </div>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <strong>Телефон:</strong> {user.phone || 'Не указан'}
                                    </Col>
                                    <Col md={6}>
                                        <strong>Адрес:</strong> {renderAddress(user.address)}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <strong>Дата регистрации:</strong> {new Date(user.registrationDate).toLocaleString()}
                                    </Col>
                                    <Col md={6}>
                                        <strong>Последний вход:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Нет данных'}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <strong>Количество заказов:</strong> {user.orders}
                                    </Col>
                                    <Col md={6}>
                                        <strong>Общая сумма покупок:</strong> {user.totalSpent} ₽
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsModal;
