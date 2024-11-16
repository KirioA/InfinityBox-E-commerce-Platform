import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/reviews.css';

const Reviews: React.FC = () => {
    const reviews = [
        { author: 'Мария П.', content: 'Отличный сервис! Быстрая доставка и качественные товары. Рекомендую!', date: '5 октября 2024' },
        { author: 'Иван С.', content: 'Широкий ассортимент и отличные цены. Очень доволен покупкой!', date: '18 ноября 2024' },
        { author: 'Ольга Р.', content: 'Удобный сайт и доброжелательный персонал. Буду заказывать еще!', date: '28 ноября 2024' },
    ];

    return (
        <div className="container mt-5 reviews-page">
            <h1 className="text-center mb-4">Отзывы</h1>
            <div className="row">
                {reviews.map((review, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Card className="review-card">
                            <Card.Body>
                                <Card.Text>"{review.content}"</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">- {review.author}</Card.Subtitle>
                                <Card.Footer className="text-muted">{review.date}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
