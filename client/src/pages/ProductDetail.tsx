import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.tsx';
import { RootState } from '../redux/store.ts'; // Импортируем тип корневого состояния
import { fetchProductById } from '../slices/productSlice';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log('ID из useParams:', id);
    const dispatch = useAppDispatch();
    const { selectedProduct: product, loading, error } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        if (id) {
            console.log("work")
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    console.log(product)

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="text-center mt-5">
                <h2>Товар не найден</h2>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Цена: {product.price} ₽</strong></Card.Text>
                    <Card.Text><small>{product.category}</small></Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;
