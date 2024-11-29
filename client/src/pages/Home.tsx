import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';
import Promotions from '../components/modal/Promotions';
import { motion } from 'framer-motion';
import { FiTruck, FiCheck, FiRefreshCcw, FiStar } from 'react-icons/fi';

const Home: React.FC = () => {
    const { theme } = useTheme();
    const [activeCategory, setActiveCategory] = useState('all');

    const styles = {
        container: {
            padding: '40px 0',
            color: theme === 'light' ? '#333333' : '#f5f5f5',
        },
        hero: {
            background: 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)',
            padding: '60px 0',
            borderRadius: '20px',
            marginBottom: '40px',
            color: '#ffffff',
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: theme === 'light' ? '#2c3e50' : '#ffffff',
            textAlign: 'center' as const,
            marginBottom: '40px',
        },
        card: {
            border: 'none',
            backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d',
            color: theme === 'light' ? '#333333' : '#f5f5f5',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
            height: '100%',
        },
        cardImage: {
            height: '250px',
            objectFit: 'cover' as const,
        },
        cardBody: {
            padding: '25px',
            color: theme === 'light' ? '#2c3e50' : '#ffffff',
        },
        button: {
            backgroundColor: '#4caf50',
            border: 'none',
            color: theme === 'light' ? '#2c3e50' : '#ffffff',
            borderRadius: '10px',
            fontSize: '16px',
            padding: '12px 25px',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': {
                backgroundColor: '#43a047',
                transform: 'translateY(-2px)',
            },
        },
        categoryButton: {
            padding: '12px 24px',
            borderRadius: '25px',
            margin: '0 10px',
            transition: 'all 0.3s ease',
            color: theme === 'light' ? '#2c3e50' : '#ffffff',
        },
        serviceIcon: {
            fontSize: '2.5rem',
            color: '#4caf50',
            marginBottom: '20px',

        },
    };

    const products = [
        {
            id: 1,
            name: 'Подарочный набор "Luxury',
            description: 'Инновационный продукт из экологически чистых материалов',
            price: '2999 ₽',
            image: '/images/product-1.jpg',
            category: 'new'
        },
        // Add more products...
    ];

    const services = [
        {
            icon: <FiTruck />,
            title: 'Быстрая доставка',
            description: 'Доставка в день заказа по всему городу'
        },
        {
            icon: <FiCheck />,
            title: 'Гарантия качества',
            description: '100% гарантия качества всех товаров'
        },
        {
            icon: <FiRefreshCcw />,
            title: 'Простой возврат',
            description: 'Возврат товара в течение 30 дней'
        }
    ];

    return (
        <div style={styles.container}>
            <Container>
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.hero}
                    className="text-center"
                >
                    <h1 className="display-4 fw-bold mb-4">Магазин уникальных подарков</h1>
                    <p className="lead mb-4">Найдите идеальный подарок для любого случая</p>
                    <Button size="lg" style={styles.button}>Выбрать подарок</Button>
                </motion.div>

                {/* Category Navigation */}
                <Row className="mb-5">
                    <Col className="d-flex justify-content-center flex-wrap">
                        {['all', 'new', 'popular', 'sale'].map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'success' : 'outline-success'}
                                style={styles.categoryButton}
                                onClick={() => setActiveCategory(category)}
                                className="m-2"
                            >
                                {category === 'all' ? 'Все товары' :
                                    category === 'new' ? 'Новинки' :
                                        category === 'popular' ? 'Популярное' : 'Скидки'}
                            </Button>
                        ))}
                    </Col>
                </Row>

                {/* Products Section */}
                <Row className="mb-5">
                    {products.map((product) => (
                        <Col lg={4} md={6} className="mb-4" key={product.id}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card style={styles.card}>
                                    <Card.Img variant="top" src={product.image} style={styles.cardImage} />
                                    <Card.Body style={styles.cardBody}>
                                        <Card.Title className="h5 fw-bold">{product.name}</Card.Title>
                                        <Card.Text className="text-muted">{product.description}</Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 mb-0">{product.price}</span>
                                            <Button style={styles.button}>В корзину</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Services Section */}
                <Row className="mb-5">
                    {services.map((service, idx) => (
                        <Col md={4} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center mb-4"
                            >
                                <div style={styles.serviceIcon}>{service.icon}</div>
                                <h3 className="h5 mb-3">{service.title}</h3>
                                <p className="text-muted">{service.description}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Reviews Section */}
                <section className="mb-5">
                    <h2 style={styles.sectionTitle}>Отзывы наших клиентов</h2>
                    <Row>
                        {[1, 2, 3].map((review) => (
                            <Col md={4} key={review}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="p-4 h-100"
                                    style={styles.card}
                                >
                                    <div className="mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FiStar key={star} className="text-warning me-1" />
                                        ))}
                                    </div>
                                    <p className="mb-3">"Отличное качество товаров и сервис на высшем уровне!"</p>
                                    <footer className="text-muted">— Клиент {review}</footer>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-5"
                >
                    <h2 style={styles.sectionTitle}>Подпишитесь на наши новости</h2>
                    <p className="text-muted mb-4">Получайте первыми информацию о новинках и специальных предложениях</p>
                    <div className="d-flex justify-content-center">
                        <input
                            type="email"
                            placeholder="Ваш email"
                            className="form-control me-2"
                            style={{ maxWidth: '300px' }}
                        />
                        <Button style={styles.button}>Подписаться</Button>
                    </div>
                </motion.section>
            </Container>
        </div>
    );
};

export default Home;