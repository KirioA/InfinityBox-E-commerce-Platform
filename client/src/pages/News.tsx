import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/news.css';

const News: React.FC = () => {
    const news = [
        { title: 'Открытие нового офиса', date: '12 ноября 2024', content: 'Мы рады сообщить об открытии нового офиса в Москве. Приглашаем в гости!' },
        { title: 'Новогодняя распродажа', date: '10 декабря 2024', content: 'Скоро стартует новогодняя распродажа с огромными скидками на всю продукцию!' },
        { title: 'Новая коллекция подарков', date: '20 января 2025', content: 'Мы добавили новую коллекцию уникальных подарков для всех возрастов!' },
    ];

    return (
        <div className="container mt-5 news-page">
            <h1 className="text-center mb-4">Новости</h1>
            <div className="row">
                {news.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Card className="news-card">
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.date}</Card.Subtitle>
                                <Card.Text>{item.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
