// src/pages/CatalogPage.tsx
import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}

const CatalogPage: React.FC = () => {
    const { products, loading, error } = useContext(ProductContext) as {
        products: Product[];
        loading: boolean;
        error: string | null;
    };

    if (loading) return <p>Загрузка товаров...</p>;
    if (error) return <p>{error}</p>;

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
