import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import useSendFeedback from '../hooks/useSendFeedback';  // Импортируем хук

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

    // Встроенные стили
    const containerStyle = {
        backgroundColor: '#f5f5f5',
        paddingTop: '30px',
        paddingBottom: '30px',
    };

    const titleStyle = {
        fontWeight: 'bold',
        color: '#81c784', // Зеленый цвет заголовка
        textAlign: 'center',
        marginBottom: '40px',
    };

    const contactInfoStyle = {
        color: '#333', // основной текст — черный
        fontSize: '1rem',
        lineHeight: 1.5,
    };

    const formStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    };

    const inputStyle = {
        borderRadius: '4px',
        border: '1px solid #ddd',
        padding: '10px',
        width: '100%',
        fontSize: '1rem',
    };

    const buttonStyle = {
        backgroundColor: '#81c784',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        padding: '10px 20px',
        width: '100%',
        cursor: 'pointer',
        borderRadius: '4px',
    };

    const buttonDisabledStyle = {
        backgroundColor: '#ddd',
        cursor: 'not-allowed',
    };

    const alertStyle = {
        marginTop: '20px',
        fontSize: '1rem',
    };

    const alertDangerStyle = {
        backgroundColor: '#ffcccc',
        borderColor: '#ff6666',
    };

    const alertSuccessStyle = {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
    };

    return (
        <Container >
            <motion.h1
                style={titleStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Контакты
            </motion.h1>

            <Row>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        <p style={contactInfoStyle}>Телефон: +375 (44) 123-45-67</p>
                        <p style={contactInfoStyle}>Email: manager@infinityshop.by</p>
                        <p style={contactInfoStyle}>Адрес: Минск, Уручская 123</p>
                        <p style={contactInfoStyle}>Рабочее время: Пн-Пт 9:00 - 18:00</p>
                    </motion.div>
                </Col>

                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4 }}
                    >
                        <h5 style={contactInfoStyle}>Отправить сообщение</h5>
                        {error && <Alert style={{ ...alertStyle, ...alertDangerStyle }} variant="danger">{error}</Alert>}
                        {success && <Alert style={{ ...alertStyle, ...alertSuccessStyle }} variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit} style={formStyle}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ваше имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите имя"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
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
                                    style={inputStyle}
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
                                    style={inputStyle}
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
                                    style={inputStyle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                style={loading ? { ...buttonStyle, ...buttonDisabledStyle } : buttonStyle}
                            >
                                {loading ? 'Отправка...' : 'Отправить'}
                            </Button>
                        </Form>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
