import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы

const About: React.FC = () => {
    const { theme } = useTheme(); // Используем контекст для получения текущей темы

    const styles = {
        pageContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            color: '#000000',
        },
        contentCard: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            width: '100%',
            maxWidth: '1200px',
        },
        header: {
            color: '#81c784',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'left',
        },
        paragraph: {
            color: theme === 'light' ? '#666' : '#ddd',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px',
        },
        imageContainer: {
            transition: 'all 0.3s ease',
            borderRadius: '10px',
            border: '2px solid #81c784',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: 'auto',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)',
            },
        },
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.contentCard}>
                <Container>
                    <Row className="my-5">
                        <Col md={6}>
                            <motion.h1
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                style={styles.header}
                            >
                                О компании
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2 }}
                                style={styles.paragraph}
                            >
                                Добро пожаловать в наш магазин! Мы специализируемся на продаже уникальных подарков,
                                которые подарят улыбку и сделают любой праздник незабываемым.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.4 }}
                                style={styles.paragraph}
                            >
                                Наша миссия - предлагать лучшие решения для подарков, которые будут радовать ваших близких.
                                Внимание к деталям, стильный дизайн и высокое качество - вот что делает нас особенными.
                            </motion.p>
                        </Col>
                        <Col md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.6 }}
                                style={styles.imageContainer}
                            >
                                <Image src="/path/to/about-image.jpg" alt="About Us" fluid style={styles.image} />
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default About;