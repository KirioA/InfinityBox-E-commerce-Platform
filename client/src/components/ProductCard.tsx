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

    // Стили
    const styles = {
        cardWrapper: {
            width: '100%',
            height: '100%',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        },
        cardHover: {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
        },
        imageContainer: {
            height: '50%',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover' as const,
        },
        cardBody: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        description: {
            fontSize: '0.9rem',
            color: '#555',
            marginBottom: '0.5rem',
            height: '3rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        price: {
            fontWeight: 'bold',
            fontSize: '1.25rem',
            color: 'green',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
        },
    };

    return (
        <div style={styles.cardWrapper}>
            <Card
                style={styles.card}
                onMouseEnter={(e) => {
                    (e.currentTarget.style.transform = styles.cardHover.transform);
                    (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow);
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget.style.transform = 'none');
                    (e.currentTarget.style.boxShadow = styles.card.boxShadow as string);
                }}
            >
                <div style={styles.imageContainer}>
                    <Card.Img
                        variant="top"
                        src={"http://localhost:3000" + imageUrl}
                        alt={title}
                        style={styles.image}
                    />
                </div>
                <Card.Body style={styles.cardBody}>
                    <div>
                        <Card.Title className="text-success text-truncate">{title}</Card.Title>
                        <Card.Text className="text-muted small mb-1">{category}</Card.Text>
                        <Card.Text style={styles.description}>
                            {description.length > 60 ? `${description.slice(0, 60)}...` : description}
                        </Card.Text>
                        <Card.Text style={styles.price}>
                            {price.toLocaleString()} BYN
                        </Card.Text>
                    </div>
                    <div style={styles.buttonGroup}>
                        <Button variant="success" className="w-50" onClick={handleAddToCart}>
                            В корзину
                        </Button>
                        <Link to={`/products/${id}`} className="w-50">
                            <Button variant="outline-secondary" className="w-100">
                                Подробнее
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductCard;
