import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Promotions: React.FC = () => {
    const styles = {
        card: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s, box-shadow 0.3s',
        },
        cardHover: {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 14px rgba(0, 0, 0, 0.3)',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
        },
        link: {
            display: 'block',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#ffffff',
            textDecoration: 'none',
            backgroundColor: '#66bb6a',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
        },
        linkHover: {
            backgroundColor: '#4caf50',
        },
        list: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
        },
    };

    const categories = [
        { name: 'Скидки до 50%', path: '/discounts' },
        { name: 'Новинки', path: '/new' },
        { name: 'Подарочные наборы', path: '/gifts' },
        { name: 'Хиты продаж', path: '/bestsellers' },
    ];

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Card
                        style={styles.card}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                        onMouseLeave={(e) =>
                            Object.assign(e.currentTarget.style, styles.card)
                        }
                    >
                        <Card.Body>
                            <Card.Title style={styles.title}>Выберите акцию:</Card.Title>
                            <div style={styles.list}>
                                {categories.map((category, idx) => (
                                    <Link
                                        key={idx}
                                        to={category.path}
                                        style={styles.link}
                                        onMouseEnter={(e) =>
                                            Object.assign(e.currentTarget.style, styles.linkHover)
                                        }
                                        onMouseLeave={(e) =>
                                            Object.assign(e.currentTarget.style, styles.link)
                                        }
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Promotions;
