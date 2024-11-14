import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { fetchProductById } from '../services/productService'; // Импортируем функцию для получения товара по ID

const ProductCard = ({ id }) => {
    const [product, setProduct] = useState(null); // Состояние для хранения данных о товаре
    const { addToCart } = useCart(); // Функция для добавления в корзину

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const fetchedProduct = await fetchProductById(id); // Получаем товар по ID
                setProduct(fetchedProduct); // Обновляем состояние
            } catch (error) {
                console.error('Ошибка при загрузке товара:', error);
            }
        };

        loadProduct(); // Загружаем товар при монтировании компонента
    }, [id]);

    if (!product) {
        return <div>Загрузка...</div>; // Пока товар не загружен, показываем индикатор
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
