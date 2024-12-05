import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, Button, Card, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchProducts, addProduct } from '../slices/productSlice';
import { RootState, AppDispatch } from '../redux/store.ts';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

const CatalogPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, error } = useSelector((state: RootState) => state.products);
    console.log(products);

    const skeletonItems = Array.from({ length: 3 });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProduct = () => {
        const newProduct = {
            name: 'Новый продукт',
            description: 'Описание нового продукта',
            price: 1234,
            category: 'Категория',
            imageUrl: 'https://example.com/image.jpg',
        };
        dispatch(addProduct(newProduct));
    };

    const styles = {
        pageContainer: {
            color: '#fff',
            marginTop: '20px',
            padding: '0 15px',
            minHeight: '80vh',
            backgrouxndColor: '#f8f9fa', // Светлый фон
        },
        heading: {
            textAlign: 'center' as const,
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            marginBottom: '40px',
            textTransform: 'uppercase',
        },
        addButton: {
            marginBottom: '20px',
            backgroundColor: '#4caf50', // Зеленый цвет кнопки
            border: 'none',
        },
        row: {
            marginTop: '30px',
        },
        skeletonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        skeleton: {
            borderRadius: '10px',
        },
    };

    return (
        <Container style={styles.pageContainer}>
            <h1 className="text-center mb-4" style={styles.heading}>Каталог товаров</h1>

            <div className="text-center mb-4">
                <Button variant="success" style={styles.addButton} onClick={handleAddProduct}>
                    Добавить новый продукт
                </Button>
            </div>

            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}

            {loading ? (
                <div style={styles.skeletonContainer}>
                    {skeletonItems.map((_, index) => (
                        <Skeleton key={index} height={300} width={'32%'} style={styles.skeleton} />
                    ))}
                </div>
            ) : (
                <Row style={styles.row}>
                    {products.map((product) => (
                        <Col key={product._id} md={4} className="mb-4">
                            <ProductCard
                                id={product._id}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                category={product.category}
                                imageUrl={product.imageUrl}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CatalogPage;
