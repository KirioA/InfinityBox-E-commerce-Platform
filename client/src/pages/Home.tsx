import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Home: React.FC = () => {
    const styles = {
        container: {
            padding: '60px 0',
            color: '#f5f5f5',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            textAlign: 'center',
            marginBottom: '40px',
        },
        description: {
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#5e5e5e',
            marginBottom: '30px',
            lineHeight: 1.6,
        },
        button: {
            padding: 12,
            backgroundColor: '#ffffff',
            borderColor: '#81c784',
            color: '#81c784',
            border: '2px solid #81c784',
            borderRadius: 5,
            fontSize: 16,
            fontWeight: 'bold',
            transition: 'all 0.3s',
        },
        buttonHover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderColor: '#81c784',
        },
        aboutTitle: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            textAlign: 'center',
            marginBottom: '40px',
        },
        aboutDescription: {
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#5e5e5e',
            lineHeight: 1.6,
            marginBottom: '30px',
        },
    };

    return (
        <Container style={styles.container}>
            {/* Хлебные крошки */}
            <Breadcrumbs paths={[{ name: 'Главная страница', path: '/' }]} />

            {/* Основная информация о магазине */}
            <Row className="mt-5 text-center">
                <Col md={8} className="mx-auto">
                    <h1 style={styles.title}>Добро пожаловать в наш интернет-магазин!</h1>
                    <p style={styles.description}>
                        Здесь вы найдете товары на любой вкус. Мы предлагаем только лучшие товары,
                        чтобы сделать ваш выбор простым и приятным.
                    </p>
                    <Link to="/catalog">
                        <Button
                            style={styles.button}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.buttonHover)
                            }
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, styles.button)
                            }
                        >
                            Перейти в каталог товаров
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Дополнительная информация о компании */}
            <Row className="mt-5">
                <Col>
                    <h2 style={styles.aboutTitle}>О нас</h2>
                    <p style={styles.aboutDescription}>
                        Мы — команда профессионалов, стремящихся предоставить вам лучший сервис и качественные товары.
                        Наша цель — удовлетворение потребностей каждого клиента.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
