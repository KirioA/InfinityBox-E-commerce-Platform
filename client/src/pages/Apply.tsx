import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';

const Apply: React.FC = () => {
    const { link } = useParams<{ link: string }>();

    // Сопоставляем `link` с названием вакансии
    const jobTitles: { [key: string]: string } = {
        manager: 'Менеджер по продажам',
        marketolog: 'Маркетолог',
        developer: 'Frontend-разработчик',
    };

    const jobTitle = jobTitles[link] || 'Вакансия';

    return (
        <Container className="apply-page-container">
            <Card className="apply-card">
                <Card.Body>
                    <Card.Title className="apply-title">Подать заявку на вакансию: {jobTitle}</Card.Title>
                    <Card.Text className="apply-subtitle">
                        Заполните форму ниже, чтобы отправить свое резюме на вакансию "{jobTitle}".
                    </Card.Text>

                    <Form className="apply-form">
                        <Form.Group controlId="name">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control type="text" placeholder="Введите ваше имя и фамилию" />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Введите ваш email" />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control type="tel" placeholder="Введите ваш телефон" />
                        </Form.Group>

                        <Form.Group controlId="experience">
                            <Form.Label>Опыт работы</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Кратко опишите ваш опыт работы" />
                        </Form.Group>

                        <Form.Group controlId="resume">
                            <Form.Label>Прикрепите резюме</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="apply-submit-btn">
                            Отправить заявку
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Apply;
