import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Reviews: React.FC = () => {
    const reviews = [
        { author: 'Мария П.', content: 'Отличный сервис! Быстрая доставка и качественные товары. Рекомендую!', date: '5 октября 2024' },
        { author: 'Иван С.', content: 'Широкий ассортимент и отличные цены. Очень доволен покупкой!', date: '18 ноября 2024' },
        { author: 'Ольга Р.', content: 'Удобный сайт и доброжелательный персонал. Буду заказывать еще!', date: '28 ноября 2024' },
    ];

    const styles = {
        page: {
            color: '#fff',
        },
        cardText: {
            color: "#000",
        },
        card: {
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            transition: 'transform 0.3s',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        subtitle: {
            color: '#000000',
            backgroundColor: 'transparent',
            fontSize: '0.9rem',
        },
        footer: {
            color: '#333',
            backgroundColor: 'transparent',
            fontSize: '0.9rem',
        },
        heading: {
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            textAlign: 'center' as const,
            marginBottom: '1rem',
        },
    };

    return (
        <div className="container mt-5" style={styles.page}>
            <motion.h1
                style={styles.heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Отзывы
            </motion.h1>

            <div className="row">
                {reviews.map((review, index) => (
                    <motion.div
                        className="col-md-4 mb-4"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <Card
                            style={styles.card}
                            onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
                            onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                        >
                            <Card.Body>
                                <Card.Text style={styles.cardText}>"{review.content}"</Card.Text>
                                <Card.Subtitle style={styles.subtitle} className="mb-2">- {review.author}</Card.Subtitle>
                                <Card.Footer style={styles.footer}>{review.date}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
