import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.tsx';
import { RootState } from '../redux/store.ts';
import { fetchProductById, fetchProducts } from '../slices/productSlice';
import { addToCart, saveCartToServer } from '../slices/cartSlice'; // Импортируем необходимые действия
import { Container, Card, Spinner, Alert, Row, Col, Badge, Button, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaCheckCircle } from 'react-icons/fa';

const Styles = {
    container: {
        marginTop: '5rem',
    },
    card: {
        shadow: {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
    },
    imagePlaceholder: {
        height: '400px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productTitle: {
        color: '#81c784',
        fontSize: '2rem',
    },
    priceText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#81c784',
    },
    buttons: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    },
    recommendedSection: {
        marginTop: '3rem',
    },
};

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedProduct: product, loading, error, products } = useAppSelector((state: RootState) => state.products);
    const cart = useAppSelector((state: RootState) => state.cart.cart); // Получаем корзину

    // Состояние для рекомендованных товаров
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        dispatch(fetchProducts()); // Загружаем все товары
    }, [id, dispatch]);

    useEffect(() => {
        // Убедимся, что если товар загружен, мы фильтруем список товаров
        if (products.length > 0 && product) {
            const filteredRecommendedProducts = products
                .filter((item) => item.id !== product.id) // Исключаем текущий товар
                .slice(0, 3)// Ограничиваем до 3 товаров
                .filter((item) => item.status !== 'inactive');
            setRecommendedProducts(filteredRecommendedProducts);
        }
    }, [products, product]); // Зависимости - изменение списка товаров или текущего товара

    useEffect(() => {
        if (cart.length > 0) {
            dispatch(saveCartToServer(cart)); // Отправка корзины на сервер при изменении
        }
    }, [cart, dispatch]);

    const handleAddToCart = () => {
        const productToAdd = {
            id: product.id,
            title: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            quantity: 1, // Количество товара по умолчанию 1
        };
        dispatch(addToCart(productToAdd)); // Добавляем товар в корзину
    };

    if (loading) {
        return (
            <Container style={Styles.container} className="text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={Styles.container} className="text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container style={Styles.container} className="text-center">
                <h2>Товар не найден</h2>
            </Container>
        );
    }

    return (
        <Container style={Styles.container}>
            <Row>
                {/* Изображение товара */}
                <Col md={6} className="text-center">
                    <Card style={Styles.card.shadow}>
                        {product.imageUrl ? (
                            <Card.Img
                                variant="top"
                                src={"http://localhost:3000" + product.imageUrl}
                                alt={product.name}
                                className="p-3"
                                style={{ borderRadius: '8px', maxHeight: '400px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div style={Styles.imagePlaceholder}>
                                <span className="text-muted">Изображение отсутствует</span>
                            </div>
                        )}
                    </Card>
                </Col>

                {/* Детали товара */}
                <Col md={6}>
                    <Card style={Styles.card.shadow} className="p-4">
                        <Card.Body>
                            <Card.Title style={Styles.productTitle}>{product.name}</Card.Title>
                            <Badge bg="success" className="mb-3">{product.category}</Badge>
                            <Card.Text>
                                <strong>Описание:</strong> {product.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Вес:</strong> {product.netWeight} г
                            </Card.Text>
                            <Card.Text style={Styles.priceText}>Цена: {product.price} ₽</Card.Text>
                            <Card.Text>
                                <strong>Доступно на складе:</strong>{' '}
                                {product.stock > 0 ? (
                                    <span className="text-success">
                                        <FaCheckCircle className="me-2" />
                                        {product.stock} шт.
                                    </span>
                                ) : (
                                    <span className="text-danger">Нет в наличии</span>
                                )}
                            </Card.Text>
                            <Card.Text>
                                <strong>Статус:</strong>{' '}
                                <Badge bg={product.status === 'active' ? 'success' : 'secondary'}>
                                    {product.status === 'active' ? 'Активен' : 'Неактивен'}
                                </Badge>
                            </Card.Text>
                            <div style={Styles.buttons}>
                                <Button
                                    variant="success"
                                    style={{ backgroundColor: '#81c784' }}
                                    onClick={handleAddToCart} // Привязываем функционал добавления товара в корзину
                                >
                                    <FaShoppingCart className="me-2" />
                                    Добавить в корзину
                                </Button>
                                <Button variant="outline-danger">
                                    <FaHeart className="me-2" />
                                    В избранное
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Характеристики товара */}
            <Row style={{ marginTop: '3rem' }}>
                <Col>
                    <h3 className="text-success">Характеристики товара</h3>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>Категория:</strong> {product.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Вес нетто:</strong> {product.netWeight} г
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Цена:</strong> {product.price} ₽
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>На складе:</strong> {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Статус:</strong> {product.status === 'active' ? 'Активен' : 'Неактивен'}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            {/* Рекомендуемые товары */}
            <Row style={Styles.recommendedSection}>
                <Col>
                    <h3 className="text-success">Рекомендуемые товары</h3>
                    <Row>
                        {recommendedProducts.map((item) => (
                            <Col key={item.id} md={4} className="mb-4">
                                <Card style={Styles.card.shadow}>
                                    <Card.Img
                                        variant="top"
                                        src={"http://localhost:3000" + item.imageUrl}
                                        alt={`Рекомендуемый товар ${item.name}`}
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="success" size="sm" style={{ backgroundColor: '#81c784' }}>
                                                Подробнее
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
