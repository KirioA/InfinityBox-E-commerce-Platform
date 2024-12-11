import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateNews } from '../../slices/newsSlice';

interface EditNewsModalProps {
    show: boolean;
    newsId: string | null;
    onHide: () => void;
    loading: boolean;
    error: string | null;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({ show, newsId, onHide, loading, error }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedNews } = useSelector((state: RootState) => state.news);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [isVisible, setIsVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (selectedNews && newsId === selectedNews._id) {
            setTitle(selectedNews.title);
            setContent(selectedNews.content);
            setAuthor(selectedNews.author);
            setStatus(selectedNews.status);
            setIsVisible(selectedNews.isVisible);
            setImageUrl(selectedNews.imageUrl || ''); // Предположим, что поле imageUrl есть
            setDate(selectedNews.date || ''); // И поле date
        }
    }, [selectedNews, newsId]);

    const handleSubmit = () => {
        if (newsId) {
            dispatch(
                updateNews({
                    id: newsId,
                    updatedData: {
                        title,
                        content,
                        author,
                        imageUrl,
                        status,
                        date,
                        isVisible,
                        updatedAt: new Date().toISOString(),
                    },
                })
            );
            onHide();
        }
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
                    <Form.Group className="mb-3">
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Статус</Form.Label>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                            disabled={loading}
                        >
                            <option value="active">Активен</option>
                            <option value="inactive">Неактивен</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Изображение (URL)</Form.Label>
                        <Form.Control
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
