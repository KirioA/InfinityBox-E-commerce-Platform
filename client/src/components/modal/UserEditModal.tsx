import React from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { User } from '../../pages/admin/UserManagement.tsx';

interface EditUserModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    onSave: (updatedUser: User) => void;
}

const UserEditModal: React.FC<EditUserModalProps> = ({ show, onHide, user, onSave }) => {
    const handleSave = () => {
        // Реализуй логику сохранения.
        onSave({
            ...user!,
            name: 'Updated Name', // Заменить на данные формы.
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={user?.name || ''}
                                    placeholder="Введите имя"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={user?.email || ' '}
                                    placeholder="Введите email"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Роль</Form.Label>
                                <Form.Select
                                    name="role"
                                    value={user?.role || ''}
                                >
                                    <option value="">Выберите роль</option>
                                    <option value="customer">Покупатель</option>
                                    <option value="manager">Менеджер</option>
                                    <option value="admin">Администратор</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Статус</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={user?.status || ''}
                                >
                                    <option value="">Выберите статус</option>
                                    <option value="active">Активен</option>
                                    <option value="blocked">Заблокирован</option>
                                    <option value="inactive">Неактивен</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    value={user?.phone || ''}

                                    placeholder="Введите номер телефона"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={user?.address || ''}

                                    placeholder="Введите адрес"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserEditModal;
