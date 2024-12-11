import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface PreviewNewsModalProps {
    show: boolean;
    news: {
        title: string;
        content: string;
        author: string;
        status: 'active' | 'inactive';
        imageUrl: string;
        date: string;
        isVisible: boolean;
    };
    onHide: () => void;
}

const PreviewNewsModal: React.FC<PreviewNewsModalProps> = ({ show, news, onHide }) => {
    const styles = {
        card: {
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden' as const,
            width: '100%',
            maxWidth: '100%',
        },
        cardBody: {
            padding: '20px',
        },
        cardTitle: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        cardSubtitle: {
            fontSize: '1rem',
            fontWeight: '500',
            marginBottom: '10px',
        },
        cardText: {
            fontSize: '1rem',
            lineHeight: '1.6',
        },
        cardDate: {
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#81c784',
        },
        image: {
            width: '100%',
            height: 'auto',
            marginBottom: '20px',
            borderRadius: '10px',
        },
        cardContent: {
            fontSize: '1rem',
            color:  '#555',
            marginBottom: '20px',
        },
    };

    if (!show) return null; // Окно скрыто

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Предварительный просмотр новости</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card style={styles.card}>
                        <Card.Body style={styles.cardBody}>
                            <Card.Title style={styles.cardTitle}>{news.title}</Card.Title>
                            <Card.Subtitle style={styles.cardSubtitle}>
                                <div style={styles.cardDate}>{news.date}</div>
                            </Card.Subtitle>
                            <Card.Text style={styles.cardContent}>{news.content}</Card.Text>
                            {news.imageUrl && (
                                <img
                                    src={news.imageUrl}
                                    alt="Новость"
                                    style={styles.image}
                                />
                            )}
                            {/*<Card.Text style={styles.cardText}>{' '}{new Date(news.date).toLocaleString()}</Card.Text>*/}
                            {/*<div>*/}
                            {/*    <strong>Статус:</strong>{' '}*/}
                            {/*    {news.status === 'active' ? 'Активен' : 'Неактивен'}*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <strong>Отображается:</strong>{' '}*/}
                            {/*    {news.isVisible ? 'Да' : 'Нет'}*/}
                            {/*</div>*/}
                        </Card.Body>
                    </Card>
                </motion.div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewNewsModal;
