import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface UploadAvatarModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (avatarUrl: string) => void;
}

const UploadAvatarModal: React.FC<UploadAvatarModalProps> = ({ show, onHide, onSave }) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarUrl(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (avatarUrl) {
            onSave(avatarUrl);
            setMessage('Аватар успешно обновлен');
            setAvatarUrl('');
        } else {
            setMessage('Введите URL для нового аватара');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Загрузка нового аватара</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="avatarUrl">
                        <Form.Label>URL аватара</Form.Label>
                        <Form.Control
                            type="text"
                            value={avatarUrl}
                            onChange={handleChange}
                            placeholder="Введите URL изображения"
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

export default UploadAvatarModal;
