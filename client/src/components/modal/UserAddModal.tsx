import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { User } from '../../pages/admin/UserManagement.tsx';

interface UserDeleteModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    onSave: () => void;
}

const UserAddModal: React.FC<UserDeleteModalProps> = ({
                                                             show,
                                                             onHide,
                                                             user,
                                                             onSave
                                                         }) => {
    const handleSave = () => {
        // Реализуй логику сохранения.
        onSave({
            ...user!,
            name: 'Updated Name', // Заменить на данные формы.
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление нового пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Роль</Form.Label>
                        <Form.Select>
                            <option>Выберите роль</option>
                            <option value="customer">Покупатель</option>
                            <option value="manager">Менеджер</option>
                            <option value="admin">Администратор</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="tel" placeholder="Введите номер телефона" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Добавить пользователя
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Добавить пользователя
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default UserAddModal;