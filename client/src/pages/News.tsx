import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../slices/newsSlice'; // Импортируем экшн для получения новостей
import { RootState } from '../redux/store.ts'; // Импортируем тип корневого состояния Redux
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы

const News: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme(); // Используем контекст для получения текущей темы

    // Получаем новости из Redux
    const { news, loading, error } = useSelector((state: RootState) => state.news);

    // Загружаем новости при монтировании компонента
    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    // Фильтруем новости по статусу 'active' и isVisible === true
    const filteredNews = news.filter((item) => item.status === 'active' && item.isVisible);

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
            fontSize: '3rem',
            fontWeight: 'bold',
            color: theme === 'light' ? '#4CAF50' : '#81c784',
            textTransform: 'uppercase' as const,
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center' as const,
        },
        card: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            overflow: 'hidden' as const,
            width: '100%',
            maxWidth: '350px',
        },
        cardHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 45px rgba(0, 0, 0, 0.2)',
        },
        cardTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: theme === 'light' ? '#333' : '#fff',
        },
        cardSubtitle: {
            fontSize: '1rem',
            fontWeight: '500',
            color: theme === 'light' ? '#888' : '#ccc',
            marginBottom: '15px',
        },
        cardText: {
            fontSize: '1rem',
            color: theme === 'light' ? '#555' : '#ddd',
            lineHeight: '1.6',
        },
        cardBody: {
            padding: '20px',
        },
        cardDate: {
            fontSize: '0.9rem',
            color: theme === 'light' ? '#4CAF50' : '#81c784',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        cardContent: {
            fontSize: '1rem',
            color: theme === 'light' ? '#555' : '#ddd',
            marginBottom: '20px',
        },
    };

    if (loading) {
        return <div style={{ textAlign: 'center', color: '#fff' }}>Загрузка...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: '#fff' }}>Ошибка: {error}</div>;
    }

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
                {filteredNews.map((item, index) => (
                    <motion.div
                        key={item._id}
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
                                Object.assign(e.currentTarget.style, styles.cardHover)
                            }
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, { transform: 'scale(1)' })
                            }
                        >
                            <Card.Body style={styles.cardBody}>
                                <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
                                <Card.Subtitle style={styles.cardSubtitle}>
                                    <div style={styles.cardDate}>{item.date}</div>
                                </Card.Subtitle>
                                <Card.Text style={styles.cardContent}>{item.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default News;
