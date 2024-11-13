// src/pages/NotFound.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs'; // Компонент хлебных крошек

const NotFound = () => {
    return (
        <Container className="text-center">
            <Breadcrumbs paths={[{ name: 'Главная страница', path: '/' }, { name: 'Страница не найдена', path: '/404' }]} />
            <h2 className="mt-5">Страница не найдена</h2>
            <p>Упс, мы не нашли такую страницу. Возможно, вы ошиблись в адресе или такой страницы не существует.</p>
            <Link to="/">
                <Button variant="primary">Перейти на главную</Button>
            </Link>
        </Container>
    );
};

export default NotFound;
