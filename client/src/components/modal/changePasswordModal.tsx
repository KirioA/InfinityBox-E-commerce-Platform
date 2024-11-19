import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface ChangePasswordModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ show, onHide, onSave }) => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword) {
            onSave(newPassword);
            setMessage('Пароль успешно обновлен');
            setNewPassword('');
        } else {
            setMessage('Введите новый пароль');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Смена пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={handleChange}
                            placeholder="Введите новый пароль"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordModal;
