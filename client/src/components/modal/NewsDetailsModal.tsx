import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { fetchNewsById } from '../../slices/newsSlice';
import PreviewNewsModal from './PreviewNewsModal'; // Импортируем компонент для предварительного просмотра

interface NewsDetailsModalProps {
    show: boolean;
    newsId: string | null; // ID новости
    onHide: () => void;
}

const NewsDetailsModal: React.FC<NewsDetailsModalProps> = ({ show, newsId, onHide }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedNews, loading, error } = useSelector((state: RootState) => state.news);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (newsId && show) {
            dispatch(fetchNewsById(newsId)); // Загружаем данные о новости по ID
        }
    }, [dispatch, newsId, show]);

    if (!show) return null; // Окно не отображается

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Детали новости</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Загрузка */}
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">Загрузка...</p>
                    </div>
                )}

                {/* Ошибка */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Содержимое новости */}
                {selectedNews && (
                    <>
                        <p>
                            <strong>ID:</strong> {selectedNews._id}
                        </p>
                        <p>
                            <strong>Заголовок:</strong> {selectedNews.title}
                        </p>
                        <p>
                            <strong>Автор:</strong> {selectedNews.author}
                        </p>
                        <p>
                            <strong>Статус:</strong>{' '}
                            {selectedNews.status === 'active' ? 'Активен' : 'Неактивен'}
                        </p>
                        <p>
                            <strong>Отображается:</strong>{' '}
                            {selectedNews.isVisible ? 'Да' : 'Нет'}
                        </p>
                        <p>
                            <strong>Создано:</strong>{' '}
                            {new Date(selectedNews.createdAt).toLocaleString()}
                        </p>
                        <hr />
                        <p>
                            <strong>Содержимое:</strong>
                        </p>
                        <p>{selectedNews.content}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => setShowPreview(true)}
                    disabled={loading || !selectedNews}
                >
                    Просмотреть компонент
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>

            {/* Передаем данные о новости в PreviewNewsModal */}
            {selectedNews && (
                <PreviewNewsModal
                    show={showPreview}
                    news={{
                        title: selectedNews.title,
                        content: selectedNews.content,
                        author: selectedNews.author,
                        status: selectedNews.status,
                        imageUrl: selectedNews.imageUrl || '', // Обработка возможного отсутствия изображения
                        date: new Date(selectedNews.createdAt).toLocaleString(),
                        isVisible: selectedNews.isVisible,
                    }}
                    onHide={() => setShowPreview(false)}
                />
            )}
        </Modal>
    );
};

export default NewsDetailsModal;
