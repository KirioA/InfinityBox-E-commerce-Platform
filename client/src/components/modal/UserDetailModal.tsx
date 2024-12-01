import React from 'react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { User } from './types'; // Создай файл с типами для удобства переиспользования.

interface UserDetailModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    renderStatusBadge: (status: string) => JSX.Element;
    renderRoleBadge: (role: string) => JSX.Element;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
                                                             show,
                                                             onHide,
                                                             user,
                                                             renderStatusBadge,
                                                             renderRoleBadge
                                                         }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Подробная информация о пользователе</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user && (
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body className="text-center">
                                    <div className="mb-3">
                                        {renderRoleBadge(user.role)}{' '}
                                        {renderStatusBadge(user.status)}
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
                                            <strong>Адрес:</strong> {user.address || 'Не указан'}
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={6}>
                                            <strong>Дата регистрации:</strong>{' '}
                                            {new Date(user.registrationDate).toLocaleString()}
                                        </Col>
                                        <Col md={6}>
                                            <strong>Последний вход:</strong>{' '}
                                            {user.lastLogin
                                                ? new Date(user.lastLogin).toLocaleString()
                                                : 'Нет данных'}
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
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailModal;
