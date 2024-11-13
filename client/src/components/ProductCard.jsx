// src/components/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ id, title, description, price }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, title, description, price });
    };

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Цена: {price} ₽</Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>Добавить в корзину</Button>
                <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="link" className="mt-2">Подробнее</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
