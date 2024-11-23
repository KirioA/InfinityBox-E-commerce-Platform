import React from 'react';
import { Button, ListGroup, Alert, Container } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы

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

    const { theme } = useTheme(); // Используем контекст для получения текущей темы

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

    // Встроенные стили с учетом текущей темы
    const styles = {
        cartContainer: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            color: theme === 'light' ? '#000000' : '#ffffff',
            maxWidth: '800px',
            margin: '30px auto',
        },
        cartItem: {
            backgroundColor: theme === 'light' ? '#f9f9f9' : '#4a4a4a',
            borderRadius: '5px',
            marginBottom: '15px',
            padding: '15px',
            transition: 'background-color 0.3s ease',
        },
        cartItemHover: {
            backgroundColor: theme === 'light' ? '#e0e0e0' : '#5a5a5a',
        },
        dangerButton: {
            backgroundColor: '#f44336',
            borderColor: '#f44336',
            transition: 'background-color 0.3s ease',
        },
        dangerButtonHover: {
            backgroundColor: '#e53935',
            borderColor: '#e53935',
        },
        secondaryButton: {
            backgroundColor: '#444',
            borderColor: '#555',
            transition: 'background-color 0.3s ease',
        },
        secondaryButtonHover: {
            backgroundColor: '#555',
            borderColor: '#666',
        },
        itemTitle: {
            margin: 0,
            color: theme === 'light' ? '#333' : '#fff',
        },
        itemText: {
            color: theme === 'light' ? '#666' : '#ddd',
        },
        emptyCartAlert: {
            textAlign: 'center' as const,
        },
        ButtonToCatalog: {
            padding: 12,
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
            borderColor: '#81c784',
            color: '#81c784',
            border: '2px solid #81c784',
            borderRadius: 5,
            fontSize: 16,
            fontWeight: 'bold',
            transition: 'all 0.3s',
        },
        ButtonToCatalogHover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderColor: '#81c784',
        },
        ButtonToCatalogActive: {
            backgroundColor: '#66bb6a',
            color: '#ffffff',
            borderColor: '#66bb6a',
        },
    };

    return (
        <div style={styles.pageContainer}>
            <Container style={styles.cartContainer}>
                <h2>Ваша корзина</h2>
                {cart.length === 0 ? (
                    <div style={styles.emptyCartAlert}>
                        <Alert variant="danger">В корзине пока нет товаров.</Alert>
                        <Link to="/catalog">
                            <Button
                                style={styles.ButtonToCatalog}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, styles.ButtonToCatalogHover);
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.ButtonToCatalog);
                                }}
                                onMouseDown={(e) => {
                                    Object.assign(e.currentTarget.style, styles.ButtonToCatalogActive);
                                }}
                                onMouseUp={(e) => {
                                    Object.assign(e.currentTarget.style, styles.ButtonToCatalogHover);
                                }}
                            >
                                Перейти в магазин
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <ListGroup>
                        {cart.map((item) => (
                            <ListGroup.Item
                                key={item.id}
                                style={styles.cartItem}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = styles.cartItemHover.backgroundColor)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = styles.cartItem.backgroundColor)
                                }
                            >
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 style={styles.itemTitle}>{item.title}</h5>
                                        <p style={styles.itemText}>{item.description}</p>
                                        <p>Цена: {item.price} ₽</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Button
                                            variant="secondary"
                                            style={styles.secondaryButton}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.secondaryButtonHover.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.secondaryButtonHover.borderColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.secondaryButton.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.secondaryButton.borderColor;
                                            }}
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-3">{item.quantity}</span>
                                        <Button
                                            variant="secondary"
                                            style={styles.secondaryButton}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.secondaryButtonHover.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.secondaryButtonHover.borderColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.secondaryButton.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.secondaryButton.borderColor;
                                            }}
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="danger"
                                            style={{ ...styles.dangerButton, marginLeft: '10px' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.dangerButtonHover.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.dangerButtonHover.borderColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor =
                                                    styles.dangerButton.backgroundColor;
                                                e.currentTarget.style.borderColor =
                                                    styles.dangerButton.borderColor;
                                            }}
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
