import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы



const Vacancies: React.FC = () => {
    const jobs = [
        { link: 'manager', title: 'Менеджер по продажам', location: 'Москва', description: 'Ищем амбициозного менеджера с опытом продаж для работы с клиентами и партнерами.' },
        { link: 'marketolog', title: 'Маркетолог', location: 'Санкт-Петербург', description: 'Разработка и реализация маркетинговых стратегий для повышения узнаваемости бренда.' },
        { link: 'developer', title: 'Frontend-разработчик', location: 'Удаленно', description: 'Опытный разработчик с навыками в React и TypeScript для работы над клиентским интерфейсом.' },
    ];
    const { theme } = useTheme(); // Используем контекст для получения текущей темы

    const styles = {
        pageContainer: {
            color: '#fff',
            marginTop: '20px',
            padding: '0 15px',
        },
        heading: {
            textAlign: 'center' as const,
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            marginBottom: '40px',
        },
        subtitle: {
            textAlign: 'center' as const,
            marginBottom: '40px',
            fontSize: '18px',
            color: theme === 'light' ? '#666' : '#ddd',
        },
        cardGrid: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            justifyContent: 'center',
            gap: '20px',
        },
        card: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            width: '300px',
            padding: '20px',
            transition: 'transform 0.3s ease',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        cardSubtitle: {
            color: '#ccc',
            marginBottom: '10px',
            fontSize: '14px',
        },
        cardText: {
            marginBottom: '20px',
            fontSize: '16px',
            lineHeight: '1.5',
            color: theme === 'light' ? '#666' : '#ddd',
        },
        button: {
            width: '100%',
            marginTop: '20px',
            padding: '12px',
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
            borderColor: '#81c784',
            color: '#81c784',
            border: '2px solid #81c784',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center' as const,
            cursor: 'pointer',
            textDecoration: 'none', // Убираем подчеркивание
            transition: 'all 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
        },
        buttonActive: {
            backgroundColor: '#66bb6a',
            color: '#ffffff',
        },
    };

    return (
        <div style={styles.pageContainer}>
            <motion.h1
                style={styles.heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Вакансии
            </motion.h1>

            <motion.p
                style={styles.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                Присоединяйтесь к нашей команде и помогайте нам создавать отличные продукты!
            </motion.p>

            <div style={styles.cardGrid}>
                {jobs.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={styles.card}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                    >
                        <Card.Body>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Subtitle style={styles.cardSubtitle}>{job.location}</Card.Subtitle>
                            <Card.Text style={styles.cardText}>{job.description}</Card.Text>
                            <Link
                                to={`/apply/${job.link}`}
                                style={styles.button}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                                    e.currentTarget.style.color = styles.buttonHover.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                                    e.currentTarget.style.color = styles.button.color;
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.backgroundColor = styles.buttonActive.backgroundColor;
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                                }}
                            >
                                Подать заявку
                            </Link>
                        </Card.Body>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
