import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import { User } from './types';

interface EditUserModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, onHide, user, onSave }) => {
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
                <Modal.Title>Редактировать пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={user?.name || ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            defaultValue={user?.email || ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Роль</Form.Label>
                        <Form.Select defaultValue={user?.role || 'customer'}>
                            <option value="customer">Покупатель</option>
                            <option value="manager">Менеджер</option>
                            <option value="admin">Администратор</option>
                        </Form.Select>
                    </Form.Group>
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

export default EditUserModal;
