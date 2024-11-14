// src/pages/CartPage.jsx
import React from 'react';
import { Button, ListGroup, Alert, Container } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cart.css';

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemove(productId); // Если количество меньше 1, удаляем товар
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
                        <Link to="/products">
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
}

export default CartPage;
