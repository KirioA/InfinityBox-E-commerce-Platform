import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Col, Form, Row, Container, Card, Alert } from "react-bootstrap";

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:5000/check-session', { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    const validateInput = () => {
        const englishAlphabet = /^[A-Za-z0-9]+$/;
        if (!username || !password) {
            setMessage('Пожалуйста, заполните все поля.');
            setVariant('warning');
            return false;
        }
        if (!englishAlphabet.test(username)) {
            setMessage('Логин должен содержать только английские буквы и цифры.');
            setVariant('warning');
            return false;
        }
        if (username.length <= 4) {
            setMessage('Логин должен быть длиннее 4 символов.');
            setVariant('warning');
            return false;
        }
        if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setMessage('Пароль должен быть не менее 6 символов и содержать буквы и цифры.');
            setVariant('warning');
            return false;
        }
        if (!englishAlphabet.test(password)) {
            setMessage('Пароль должен содержать только английские буквы и цифры.');
            setVariant('warning');
            return false;
        }
        setMessage('');
        return true;
    };

    const register = async () => {
        if (!validateInput()) return;

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password,
            }, { withCredentials: true });

            if (response.status === 201) {
                setMessage('Успешная регистрация!');
                setVariant('success');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Ошибка регистрации');
                setVariant('danger');
            }
        }
    };

    const login = async () => {
        if (!validateInput()) return;

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            }, { withCredentials: true });

            if (response.status === 200) {
                setMessage('Успешный вход!');
                setVariant('success');
                setIsLoggedIn(true);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Неверные данные для входа');
                setVariant('danger');
            }
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setMessage('Выход выполнен успешно');
            setVariant('success');
        } catch (error) {
            setMessage('Ошибка выхода');
            setVariant('danger');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Регистрация/Авторизация</h2>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Row className="mt-4">
                            <Col>
                                <Button variant="primary" onClick={register} className="w-100">Регистрация</Button>
                            </Col>
                            <Col>
                                <Button variant="success" onClick={login} className="w-100">Вход</Button>
                            </Col>
                        </Row>
                    </Form>
                    {isLoggedIn && (
                        <Button variant="danger" onClick={logout} className="w-100 mt-3">Выход</Button>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default App;
