import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/contacts.css';

const Contacts: React.FC = () => {
    return (
        <Container className="contacts-page text-white">
            <h1 className="my-5">Контакты</h1>
            <Row>
                <Col md={6}>
                    <p>Телефон: +7 (999) 123-45-67</p>
                    <p>Email: info@giftshop.com</p>
                    <p>Адрес: Москва, ул. Пушкина, д. 10</p>
                    <p>Рабочее время: Пн-Пт 10:00 - 18:00</p>
                </Col>
                <Col md={6}>
                    <h5>Отправить сообщение</h5>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Ваше имя</Form.Label>
                            <Form.Control type="text" placeholder="Введите имя" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Сообщение</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Ваше сообщение" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Отправить
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
