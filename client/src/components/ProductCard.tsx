import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, description, price, category, imageUrl }) => {
    const { addToCart } = useCart();

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Img variant="top" src={imageUrl} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text><strong>Цена: {price} ₽</strong></Card.Text>
                <Card.Text><small>{category}</small></Card.Text>
                <Button variant="primary" onClick={() => addToCart({ id, title, description, price, category, imageUrl })}>
                    Добавить в корзину
                </Button>
                <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="link" className="mt-2">Подробнее</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
