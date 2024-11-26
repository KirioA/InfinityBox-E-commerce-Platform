import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы


const News: React.FC = () => {
    const news = [
        { title: 'Открытие нового офиса', date: '12 ноября 2024', content: 'Мы рады сообщить об открытии нового офиса в Москве. Приглашаем в гости!' },
        { title: 'Новогодняя распродажа', date: '10 декабря 2024', content: 'Скоро стартует новогодняя распродажа с огромными скидками на всю продукцию!' },
        { title: 'Новая коллекция подарков', date: '20 января 2025', content: 'Мы добавили новую коллекцию уникальных подарков для всех возрастов!' },
    ];
    const { theme } = useTheme(); // Используем контекст для получения текущей темы


    // Встроенные стили
    const styles = {
        pageContainer: {
            color: '#fff',
            marginTop: '40px',
            padding: '20px',
        },
        pageTitle: {
            textAlign: 'center' as const,
            marginBottom: '40px',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#81c784',
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
        },
        card: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',

            color: theme === 'light' ? '#000000' : '#ffffff',

            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            transition: 'transform 0.3s',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
        },
        cardSubtitle: {
            color: theme === 'light' ? '#000000' : '#afafaf',

            marginBottom: '10px',
        },
        cardText: {
            fontSize: '1rem',
            color: theme === 'light' ? '#000000' : '#ffffff',

        },
    };

    return (
        <div style={styles.pageContainer}>
            <motion.h1
                style={styles.pageTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Новости
            </motion.h1>

            <div style={styles.row}>
                {news.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={{
                            flex: '1 1 calc(33.333% - 20px)',
                            maxWidth: 'calc(33.333% - 20px)',
                        }}
                    >
                        <Card
                            style={styles.card}
                            onMouseEnter={(e) =>
                                Object.assign(
                                    e.currentTarget.style,
                                    styles.cardHover
                                )
                            }
                            onMouseLeave={(e) =>
                                Object.assign(
                                    e.currentTarget.style,
                                    { transform: 'scale(1)' }
                                )
                            }
                        >
                            <Card.Body>
                                <Card.Title style={styles.cardTitle}>
                                    {item.title}
                                </Card.Title>
                                <Card.Subtitle style={styles.cardSubtitle}>
                                    {item.date}
                                </Card.Subtitle>
                                <Card.Text style={styles.cardText}>
                                    {item.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default News;
