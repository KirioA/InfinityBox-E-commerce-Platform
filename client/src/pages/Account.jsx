// src/pages/Account.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Account() {
    const { user, updateUser } = useAuth(); // Получаем данные пользователя и функцию для обновления данных
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    useEffect(() => {
        if (user) {
            setFormData({ username: user.username, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setMessage('Информация обновлена');
            setVariant('success');
        } catch (error) {
            setMessage('Не удалось обновить информацию');
            setVariant('danger');
        }
    };

    return (
        <Container>
            <h2>Личный кабинет</h2>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Обновить
                </Button>
            </Form>
        </Container>
    );
}

export default Account;
