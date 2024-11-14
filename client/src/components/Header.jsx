import React from 'react';
import { Navbar, Nav, Badge, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth'; // Подключаем хук авторизации

function Header() {
    const { getTotalItems } = useCart(); // Получаем общее количество товаров в корзине
    const { user, logout, loading } = useAuth(); // Получаем информацию о пользователе и функцию для выхода
    const totalItems = getTotalItems();

    // Пока происходит загрузка, не отображаем компоненты с пользовательскими данными
    if (loading) return null;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                {/* Логотип и название магазина */}
                <Navbar.Brand as={Link} to="/">Logo soon</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto flex-grow-1 justify-content-end">
                        {/* Ссылка на каталог товаров */}
                        <Nav.Item className="mr-3">
                            <Link to="/catalog" className="nav-link">Каталог товаров</Link>
                        </Nav.Item>

                        {/* Если пользователь не авторизован, показываем кнопку для авторизации */}
                        {!user ? (
                            <Nav.Item className="mr-3">
                                <Link to="/auth" className="nav-link">Войти / Регистрация</Link>
                            </Nav.Item>
                        ) : (
                            <>
                                {/* Ссылка на личный кабинет */}
                                <Nav.Item className="mr-3">
                                    <Link to="/account" className="nav-link">Личный кабинет</Link>
                                </Nav.Item>

                                {/* Кнопка выхода из аккаунта */}
                                <Nav.Item className="mr-3">
                                    <span onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                                        Выйти
                                    </span>
                                </Nav.Item>
                            </>
                        )}

                        {/* Ссылка на корзину с количеством товаров */}
                        <Nav.Item>
                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                Корзина
                                {totalItems > 0 && (
                                    <Badge pill bg="danger" className="ml-2">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
