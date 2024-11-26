import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const EditUser: React.FC = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<any>(null);

    // Получаем данные пользователя для редактирования
    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/v1/admin/users/${userId}`);
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    // Сохраняем изменения пользователя
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/api/v1/admin/users/${userId}`, user);
            alert('Данные пользователя обновлены');
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (!user) return <div>Загрузка...</div>;

    return (
        <Container>
            <h1>Редактировать пользователя</h1>
            <Form onSubmit={handleSave}>
                <Form.Group controlId="formName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </Container>
    );
};

export default EditUser;
