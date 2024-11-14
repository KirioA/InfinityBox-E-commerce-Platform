// src/pages/Home.js
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard'; // Компонент для отображения карточки товара
import Breadcrumbs from '../components/Breadcrumbs.jsx'; // Компонент хлебных крошек

const Home = () => {
    const products = [
        { id: '1', title: 'Товар 1', description: 'Описание товара 1', price: 100 },
        { id: '2', title: 'Товар 2', description: 'Описание товара 2', price: 200 },
        { id: '3', title: 'Товар 3', description: 'Описание товара 3', price: 300 }
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
