import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup, Dropdown, Card } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, deleteNews, updateNews, addNews } from '../../slices/newsSlice';
import { RootState } from '../../redux/store';
import DeleteNewsModal from '../../components/modal/DeleteNewsModal';
import NewsDetailsModal from '../../components/modal/NewsDetailsModal';
import AddNewsModal from '../../components/modal/AddNewsModal';
import EditNewsModal from '../../components/modal/EditNewsModal';

interface News {
    id: string;
    title: string;
    content: string;
    author: string;
    status: string; // "active" или "inactive"
    createdAt: string;
    updatedAt: string;
    isVisible: boolean; // Отображается ли новость
}

const AdminNewsManagement: React.FC = () => {
    const dispatch = useDispatch();
    const { news, loading, error } = useSelector((state: RootState) => state.news);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

    const [visibleNewsCount, setVisibleNewsCount] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    useEffect(() => {
        console.log('Новости загружены:', news); // Проверка данных
        const count = news.filter((item: News) => item.isVisible).length;
        setVisibleNewsCount(count);
    }, [news]);

    useEffect(() => {
        // Обновление количества видимых новостей
        const count = news.filter((item: News) => item.isVisible).length;
        setVisibleNewsCount(count);
    }, [news]);

    const filteredNews = useMemo(() => {
        return news.filter((item: News) => {
            const matchesSearch = searchTerm
                ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            const matchesStatus = statusFilter ? item.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }, [news, searchTerm, statusFilter]);

    const handleNewsDelete = () => {
        if (selectedNewsId) {
            dispatch(deleteNews(selectedNewsId));
            setShowDeleteModal(false);
        }
    };

    const handleSaveEditNews = (updatedNews: News) => {
        if (updatedNews.id) {
            dispatch(updateNews({ id: updatedNews.id, updatedData: updatedNews }));
            setShowEditModal(false);
        }
    };

    const handleConfirmAddNews = (newNews: News) => {
        dispatch(addNews(newNews));
        setShowAddNewsModal(false);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Управление новостями</h1>

            <Row className="mb-4">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Поиск новостей"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="inactive">Неактивные</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Button
                        variant="success"
                        onClick={() => setShowAddNewsModal(true)}
                        className="w-100"
                    >
                        <FaPlus /> Добавить новость
                    </Button>
                </Col>
            </Row>

            <Card className="mb-4">
                <Card.Body>
                    <h5>Количество отображающихся новостей</h5>
                    <p className="h3">{visibleNewsCount}</p>
                </Card.Body>
            </Card>

            {loading && <div>Загрузка...</div>}
            {error && <div>Ошибка: {error}</div>}

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Заголовок</th>
                    <th>Автор</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Отображается</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {filteredNews.map((item: News, index: number) => (
                    <tr key={`${item.id}-${index}`}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>
                            <span
                                className={`badge ${
                                    item.status === 'active' ? 'bg-success' : 'bg-danger'
                                }`}
                            >
                                {item.status === 'active' ? 'Активен' : 'Неактивен'}
                            </span>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                            {item.isVisible ? (
                                <span className="badge bg-primary">Да</span>
                            ) : (
                                <span className="badge bg-secondary">Нет</span>
                            )}
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary">Действия</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSelectedNewsId(item.id);
                                            setShowDetailsModal(true);
                                        }}
                                    >
                                        <FaEye /> Просмотр
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSelectedNewsId(item.id);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <FaEdit /> Редактировать
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSelectedNewsId(item.id);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-danger"
                                    >
                                        <FaTrash /> Удалить
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Модальные окна */}
            <DeleteNewsModal
                show={showDeleteModal}
                newsId={selectedNewsId}
                onHide={() => setShowDeleteModal(false)}
                onDelete={handleNewsDelete}
            />
            <NewsDetailsModal
                show={showDetailsModal}
                newsId={selectedNewsId}
                onHide={() => setShowDetailsModal(false)}
            />
            <AddNewsModal
                show={showAddNewsModal}
                onHide={() => setShowAddNewsModal(false)}
                onConfirm={handleConfirmAddNews}
            />
            <EditNewsModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                newsId={selectedNewsId}
                onSave={handleSaveEditNews}
            />
        </Container>
    );
};

export default AdminNewsManagement;
