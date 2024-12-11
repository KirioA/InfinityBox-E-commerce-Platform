import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

interface EditNewsModalProps {
    show: boolean;
    newsId: string | null;
    onHide: () => void;
    onSave: (updatedNews: any) => void;
    loading: boolean;
    error: string | null;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({ show, newsId, onHide, onSave, loading, error }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (newsId) {
            // Заглушка, замените на запрос данных по ID
            setTitle('Пример новости');
            setContent('Содержимое новости...');
            setAuthor('Администратор');
            setIsVisible(true);
        }
    }, [newsId]);

    const handleSubmit = () => {
        onSave({
            id: newsId,
            title,
            content,
            author,
            isVisible,
            updatedAt: new Date().toISOString(),
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать новость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="text-center mb-3">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">Загрузка...</p>
                    </div>
                )}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Содержимое</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        label="Отображать новость"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                        disabled={loading}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditNewsModal;
