import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы


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

    const { theme } = useTheme();
    const skeletonItems = Array.from({ length: 3 });

    const styles = {
        pageContainer: {
            color: '#fff',
            marginTop: '20px',
            padding: '0 15px',
            minHeight: '80vh'
        },
        heading: {
            textAlign: 'center' as const,
            fontSize: '35px',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            marginBottom: '40px',
        },
    }
    return (
        <Container style={styles.pageContainer}>
            <h1 className="text-center mb-4" style={styles.heading}>Каталог товаров</h1>
            {loading ? (
                <Row>
                    {skeletonItems.map((_, index) => (
                        <Col key={index} sm={12} md={6} lg={4}>
                            <div className="p-3">
                                <Skeleton height={300} />
                                <Skeleton height={20} style={{ marginTop: '10px' }} />
                                <Skeleton height={20} width="60%" style={{ marginTop: '5px' }} />
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4}>
                            <ProductCard {...product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CatalogPage;
