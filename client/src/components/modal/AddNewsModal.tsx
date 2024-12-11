import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddNewsModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: (newNews: any) => void;
}

const AddNewsModal: React.FC<AddNewsModalProps> = ({ show, onHide, onConfirm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Новое поле для изображения
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('active'); // Поле статуса
    const [date, setDate] = useState('');

    const handleSubmit = () => {
        if (!title || !content || !author || !date) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const newNews = {
            id: Date.now().toString(),
            title,
            content,
            author,
            imageUrl,
            status,
            date,
            isVisible,
            createdAt: new Date().toISOString(),
        };

        onConfirm(newNews);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите заголовок"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Содержимое</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Введите содержимое новости"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Имя автора"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ссылка на изображение</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="URL изображения"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Статус</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Активно</option>
                            <option value="draft">Черновик</option>
                            <option value="archived">Архивировано</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата публикации</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        label="Отображать новость"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewsModal;
