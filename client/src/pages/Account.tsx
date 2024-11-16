// src/pages/Account.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSessionCheck } from '../hooks/auth/useSessionCheck.tsx'; // Импортируем useUser
import { useUpdateUser } from '../hooks/auth/useUpdateUser'; // Используем хук для обновления данных
import { Form, Button, Container, Alert } from 'react-bootstrap';

interface FormData {
    username: string;
    email: string;
}

const Account: React.FC = () => {
    const { user } = useSessionCheck(); // Получаем данные пользователя
    const { updateUser } = useUpdateUser(); // Получаем функцию для обновления данных пользователя
    const [formData, setFormData] = useState<FormData>({ username: '', email: '' });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<'success' | 'danger'>('success');

    // Заполнение формы данными пользователя при его наличии
    useEffect(() => {
        if (user) {
            setFormData({ username: user.username, email: user.email });
        }
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateUser(formData); // Обновляем данные пользователя
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
};

export default Account;
