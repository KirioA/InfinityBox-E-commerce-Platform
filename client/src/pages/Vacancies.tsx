import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/vacancies.css';

const Vacancies: React.FC = () => {
    const jobs = [
        { link: 'manager', title: 'Менеджер по продажам', location: 'Москва', description: 'Ищем амбициозного менеджера с опытом продаж для работы с клиентами и партнерами.' },
        { link: 'marketolog', title: 'Маркетолог', location: 'Санкт-Петербург', description: 'Разработка и реализация маркетинговых стратегий для повышения узнаваемости бренда.' },
        { link: 'developer', title: 'Frontend-разработчик', location: 'Удаленно', description: 'Опытный разработчик с навыками в React и TypeScript для работы над клиентским интерфейсом.' },
    ];

    return (
        <div className="container mt-5 vacancies-page">
            <h1 className="text-center mb-4">Вакансии</h1>
            <p className="text-center mb-5">Присоединяйтесь к нашей команде и помогайте нам создавать отличные продукты!</p>
            <div className="row">
                {jobs.map((job, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Card className="vacancy-card">
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                                <Card.Text>{job.description}</Card.Text>
                                <Link to={`/apply/${job.link}`}>
                                    <Button variant="primary">Подать заявку</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
