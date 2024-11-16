// src/pages/Cart.tsx
import React from 'react';
import { Button, ListGroup, Alert, Container } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cart.css';

interface CartItem {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity } = useCart() as {
        cart: CartItem[];
        removeFromCart: (id: string) => void;
        updateQuantity: (id: string, quantity: number) => void;
    };

    const handleRemove = (productId: string) => {
        removeFromCart(productId);
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemove(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    return (
        <div className="cart-page-container">
            <Container className="cart-container">
                <h2>Ваша корзина</h2>
                {cart.length === 0 ? (
                    <div>
                        <Alert variant="info">В корзине пока нет товаров.</Alert>
                        <Link to="/catalog">
                            <Button variant="primary">Перейти в магазин</Button>
                        </Link>
                    </div>
                ) : (
                    <ListGroup>
                        {cart.map((item) => (
                            <ListGroup.Item key={item.id} className="cart-item">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                        <p>Цена: {item.price} ₽</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-3">{item.quantity}</span>
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="ml-3"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Container>
        </div>
    );
};

export default Cart;
