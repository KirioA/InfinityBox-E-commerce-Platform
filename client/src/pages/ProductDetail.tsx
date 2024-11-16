// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID продукта из параметров маршрута
    const [product, setProduct] = useState<Product | null>(null); // Состояние для хранения информации о товаре
    const { addToCart } = useCart(); // Функция для добавления в корзину
    const navigate = useNavigate(); // Новый хук для навигации

    useEffect(() => {
        const fetchProduct = async () => {
            const products: Product[] = [
                { id: '1', title: 'Товар 1', description: 'Описание товара 1', price: 100 },
                { id: '2', title: 'Товар 2', description: 'Описание товара 2', price: 200 },
                { id: '3', title: 'Товар 3', description: 'Описание товара 3', price: 300 }
            ];
            const foundProduct = products.find(p => p.id === id);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                navigate('/'); // Перенаправляем на главную страницу, если товар не найден
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    if (!product) {
        return <p>Загрузка...</p>; // Пока не загрузится товар, показываем индикатор загрузки
    }

    return (
        <div className="product-detail-container">
            <Card>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Цена: {product.price} ₽</Card.Text>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Добавить в корзину
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductDetail;
