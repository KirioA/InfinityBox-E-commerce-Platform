// src/components/ProductCard.tsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { fetchProductById } from '../services/productService';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
}

interface ProductCardProps {
    id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const fetchedProduct = await fetchProductById(id);
                // setProduct(fetchedProduct);
            } catch (error) {
                // console.error('Ошибка при загрузке товара:', error);
            }
        };

        loadProduct();
    }, [id]);

    if (!product) {
        return <div>Загрузка...</div>;
    }

    const { title, description, price } = product;

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Цена: {price} ₽</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>Добавить в корзину</Button>
                <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="link" className="mt-2">Подробнее</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
