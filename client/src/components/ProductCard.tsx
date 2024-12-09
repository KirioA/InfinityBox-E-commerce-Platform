import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart, saveCartToServer } from '../slices/cartSlice';

interface ProductCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    setShowToast: (value: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, description, price, category, imageUrl, setShowToast }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);

    useEffect(() => {
        if (cart.length > 0) {
            dispatch(saveCartToServer(cart)); // Отправка корзины на сервер при изменении
        }
    }, [cart, dispatch]);

    const handleAddToCart = () => {
        const product = { id, title, description, price, category, imageUrl, quantity: 1 };
        dispatch(addToCart(product)); // Добавление товара в корзину
    };

    const styles = {
        card: {
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        cardHover: {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        },
        img: {
            height: '200px',
            objectFit: 'cover',
        },
        body: {
            padding: '1rem',
            textAlign: 'center' as const,
        },
        title: {
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: '#2E7D32',
        },
        category: {
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: '#757575',
        },
        description: {
            fontSize: '0.85rem',
            color: '#616161',
            marginBottom: '1rem',
        },
        price: {
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#2E7D32',
            marginBottom: '1rem',
        },
        button: {
            margin:'1.5rem 0',
            borderRadius: '30px',
        },
    };

    return (
        <Card
            style={styles.card}
            className="product-card"
            onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <Card.Img
                variant="top"
                src={"http://localhost:3000" + imageUrl}
                alt={title}
                style={styles.img}
            />
            <Card.Body style={styles.body}>
                <Card.Title style={styles.title}>{title}</Card.Title>
                <Card.Text style={styles.category}>{category}</Card.Text>
                <Card.Text style={styles.description}>
                    {description.length > 60 ? `${description.slice(0, 60)}...` : description}
                </Card.Text>
                <Card.Text style={styles.price}>{price.toLocaleString()} BYN</Card.Text>
                <Button
                    variant="success"
                    style={styles.button}
                    onClick={handleAddToCart}
                >
                    В корзину
                </Button>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="outline-secondary"
                        style={styles.button}
                    >
                        Подробнее
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
