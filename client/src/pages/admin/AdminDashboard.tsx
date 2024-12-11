import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../slices/adminSlice.ts'; // Путь к adminSlice

const AdminDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Данные из Redux
    const { dashboardStats, loading, error } = useSelector((state: any) => state.admin);

    useEffect(() => {
        if (!dashboardStats) {
            dispatch(fetchDashboardStats());
        }
    }, [dispatch, dashboardStats]);

    const navigateToSection = (section: string) => {
        switch (section) {
            case 'users':
                navigate('/admin/users');
                break;
            case 'products':
                navigate('/admin/products');
                break;
            case 'categories':
                navigate('/admin/categories');
                break;
            case 'sales':
                navigate('/admin/sales');
                break;
            case 'analytics':
                navigate('/admin/analytics');
                break;
            case 'news':
                navigate('/admin/news');
                break;
            case 'vacancies':
                navigate('/admin/vacancies');
                break;
            case 'reviews':
                navigate('/admin/reviews');
                break;
            default:
                break;
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Панель администратора</h1>

            {loading && <div>Загрузка...</div>}
            {error && <div>Ошибка: {error}</div>}

            {dashboardStats && (
                <>
                    <Row className="mb-4">
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Пользователи</Card.Title>
                                    <Card.Text className="h2">{dashboardStats.totalUsers}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigateToSection('users')}
                                        className="w-100"
                                    >
                                        Управление пользователями
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Товары</Card.Title>
                                    <Card.Text className="h2">{dashboardStats.totalProducts}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigateToSection('products')}
                                        className="w-100"
                                    >
                                        Управление товарами
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Категории</Card.Title>
                                    <Card.Text className="h2">{dashboardStats.totalCategories}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigateToSection('categories')}
                                        className="w-100"
                                    >
                                        Управление категориями
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Новости</Card.Title>
                                    <Card.Text>Управление новостными статьями</Card.Text>
                                    <Button
                                        variant="warning"
                                        onClick={() => navigateToSection('news')}
                                        className="w-100"
                                    >
                                        Управление новостями
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Вакансии</Card.Title>
                                    <Card.Text>Добавление и редактирование вакансий</Card.Text>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigateToSection('vacancies')}
                                        className="w-100"
                                    >
                                        Управление вакансиями
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Отзывы</Card.Title>
                                    <Card.Text>Просмотр и модерация отзывов</Card.Text>
                                    <Button
                                        variant="info"
                                        onClick={() => navigateToSection('reviews')}
                                        className="w-100"
                                    >
                                        Управление отзывами
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Продажи</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-1">Количество продаж</p>
                                            <h3>{dashboardStats.totalSales}</h3>
                                        </div>
                                        <div>
                                            <p className="mb-1">Общий доход</p>
                                            <h3>{dashboardStats.totalRevenue} ₽</h3>
                                        </div>
                                    </div>
                                    <Button
                                        variant="success"
                                        onClick={() => navigateToSection('sales')}
                                        className="w-100 mt-3"
                                    >
                                        Просмотр продаж
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Аналитика</Card.Title>
                                    <p>Просмотр детальной статистики и отчетов</p>
                                    <Button
                                        variant="info"
                                        onClick={() => navigateToSection('analytics')}
                                        className="w-100"
                                    >
                                        Перейти к аналитике
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default AdminDashboard;
