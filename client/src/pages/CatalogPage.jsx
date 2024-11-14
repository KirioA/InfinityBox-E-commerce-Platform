// src/pages/CatalogPage.jsx
import React, {useEffect, useState} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from "../services/productService.jsx"; // Компонент карточки товара

const CatalogPage = () => {
    const [products, setProducts] = useState([]); // Состояние для списка товаров
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productList = await fetchProducts(); // Загружаем товары
                setProducts(productList); // Обновляем состояние
            } catch (err) {
                setError('Ошибка при загрузке товаров');
            } finally {
                setLoading(false); // Останавливаем индикатор загрузки
            }
        };

        loadProducts(); // Загружаем товары при монтировании компонента
    }, []);

    return (
        <Container>
            <h1 className="text-center mb-4">Каталог товаров</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4}>
                        <ProductCard {...product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CatalogPage;
