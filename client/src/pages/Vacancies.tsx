import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/vacancies.css';

const Vacancies: React.FC = () => {
    const jobs = [
        { link: 'manager', title: 'Менеджер по продажам', location: 'Москва', description: 'Ищем амбициозного менеджера с опытом продаж для работы с клиентами и партнерами.' },
        { link: 'marketolog', title: 'Маркетолог', location: 'Санкт-Петербург', description: 'Разработка и реализация маркетинговых стратегий для повышения узнаваемости бренда.' },
        { link: 'developer', title: 'Frontend-разработчик', location: 'Удаленно', description: 'Опытный разработчик с навыками в React и TypeScript для работы над клиентским интерфейсом.' },
    ];

    return (
        <div className="container mt-5 vacancies-page">
            <motion.h1
                className="text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Вакансии
            </motion.h1>

            <motion.p
                className="text-center mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                Присоединяйтесь к нашей команде и помогайте нам создавать отличные продукты!
            </motion.p>

            <div className="row">
                {jobs.map((job, index) => (
                    <motion.div
                        className="col-md-4 mb-4"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
