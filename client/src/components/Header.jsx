// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Badge, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Header() {
    const { getTotalItems } = useCart(); // Получаем общее количество товаров в корзине
    const totalItems = getTotalItems();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                {/* Логотип и название магазина */}
                <Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto flex-grow-1 justify-content-end">
                        {/* Ссылка на страницу авторизации */}
                        <Nav.Item className="mr-3">
                            <Link to="/auth" className="nav-link">Регистрация</Link>
                        </Nav.Item>

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
