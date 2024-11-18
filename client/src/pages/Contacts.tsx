// components/Contacts.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import useSendFeedback from '../hooks/useSendFeedback';  // Импортируем хук
import '../styles/contacts.css';

const Contacts: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const { sendFeedback, loading, error, success } = useSendFeedback();  // Используем хук

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendFeedback(formData);  // Отправляем данные через хук
        setFormData({ name: '', email: '', phone: '', message: '' });  // Очистка формы после отправки
    };

    return (
        <Container className="contacts-page text-white">
            <h1 className="my-5">Контакты</h1>
            <Row>
                <Col md={6}>
                    <p>Телефон: +375 (44) 123-45-67</p>
                    <p>Email: manager@infinityshop.by</p>
                    <p>Адрес: Минск, Уручская 123</p>
                    <p>Рабочее время: Пн-Пт 9:00 - 18:00</p>
                </Col>
                <Col md={6}>
                    <h5>Отправить сообщение</h5>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ваше имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Мобильный номер</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Ваш номер телефона"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Сообщение</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Ваше сообщение"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
