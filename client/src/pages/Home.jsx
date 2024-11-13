// src/pages/Home.js
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard'; // Компонент для отображения карточки товара
import Breadcrumbs from '../components/Breadcrumbs.jsx'; // Компонент хлебных крошек

const Home = () => {
    const products = [
        { id: 1, title: 'Товар 1', description: 'Описание товара 1', price: 500 },
        { id: 2, title: 'Товар 2', description: 'Описание товара 2', price: 600 },
        { id: 3, title: 'Товар 3', description: 'Описание товара 3', price: 700 },
        { id: 4, title: 'Товар 4', description: 'Описание товара 4', price: 800 },
        { id: 5, title: 'Товар 5', description: 'Описание товара 5', price: 900 },
        { id: 6, title: 'Товар 6', description: 'Описание товара 6', price: 1000 },
        { id: 7, title: 'Товар 7', description: 'Описание товара 7', price: 1100 },
        { id: 8, title: 'Товар 8', description: 'Описание товара 8', price: 1200 },
        { id: 9, title: 'Товар 9', description: 'Описание товара 9', price: 1300 },
        { id: 10, title: 'Товар 10', description: 'Описание товара 10', price: 1400 },
    ];

    return (
        <Container>
            <Breadcrumbs paths={[{ name: 'Главная страница', path: '/' }]} />
            <h1 className="text-center mb-4">Главная страница</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4}>
                        <ProductCard {...product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
