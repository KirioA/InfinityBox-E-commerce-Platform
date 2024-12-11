import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { fetchVacancies } from '../slices/vacanciesSlice';
import { RootState, AppDispatch } from '../redux/store.ts';

const Vacancies: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { vacancies, loading, error } = useSelector((state: RootState) => state.vacancies);
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(fetchVacancies());
    }, [dispatch]);

    const styles = {
        pageContainer: { color: '#fff', marginTop: '20px', padding: '0 15px' },
        heading: { textAlign: 'center' as const, fontSize: '28px', fontWeight: 'bold', color: '#81c784', marginBottom: '40px' },
        subtitle: { textAlign: 'center' as const, marginBottom: '40px', fontSize: '18px', color: theme === 'light' ? '#666' : '#ddd' },
        cardGrid: { display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: '20px' },
        card: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            width: '300px',
            padding: '20px',
            transition: 'transform 0.3s ease',
        },
        cardHover: { transform: 'scale(1.05)' },
        button: {
            marginTop: '10px',
            textDecoration: 'none',
            color: '#81c784',
            border: '2px solid #81c784',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center' as const,
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

            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={styles.cardGrid}>
                    {vacancies.map((job, index) => (
                        <motion.div
                            key={job.id}
                            style={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                        >
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                                <Card.Text>{job.description}</Card.Text>
                                <Link to={`/apply/${job.id}`} style={styles.button}>
                                    Подать заявку
                                </Link>
                            </Card.Body>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Vacancies;
