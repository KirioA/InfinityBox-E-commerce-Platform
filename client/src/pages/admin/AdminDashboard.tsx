import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    // Dashboard overview data
    const [dashboardStats, setDashboardStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalSales: 0,
        totalRevenue: 0
    });

    // Fetch dashboard statistics including total users from the server
    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // Fetch total users count (and other statistics if necessary)
                const response = await axios.get('/api/v1/admin/dashboard-stats'); // Замените на ваш URL
                setDashboardStats({
                    totalUsers: response.data.totalUsers,
                    totalProducts: response.data.totalProducts,
                    totalCategories: response.data.totalCategories,
                    totalSales: response.data.totalSales,
                    totalRevenue: response.data.totalRevenue
                });
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchDashboardStats();
    }, []); // Запрос на загрузку данных при монтировании компонента

    // Navigation handlers
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
            default:
                break;
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Панель администратора</h1>

            {/* Overview Cards */}
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

            {/* Sales and Analytics Section */}
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

            {/* Quick Actions Section */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Быстрые действия</Card.Title>
                            <Row>
                                <Col md={4} className="mb-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => navigate('/admin/products/add')}
                                        className="w-100"
                                    >
                                        Добавить товар
                                    </Button>
                                </Col>
                                <Col md={4} className="mb-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => navigate('/admin/categories/add')}
                                        className="w-100"
                                    >
                                        Добавить категорию
                                    </Button>
                                </Col>
                                <Col md={4} className="mb-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => navigate('/admin/users/add')}
                                        className="w-100"
                                    >
                                        Добавить пользователя
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
