import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';  // Используем ваш AuthContext
import { FiShoppingCart } from 'react-icons/fi';
import '../styles/header.css';

const Header: React.FC = () => {
    const { getTotalItems } = useCart();
    const { isAuthenticated, setIsAuthenticated } = useAuth(); // Используем isAuthenticated из контекста
    const totalItems = getTotalItems();

    const [expanded, setExpanded] = useState(false);

    const handleSelect = () => {
        setExpanded(false);
    };

    const handleLogout = () => {
        // Удаляем токен из localStorage и меняем состояние isAuthenticated
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
            <Navbar expand="lg" variant="dark" className="navbar-custom" expanded={expanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="font-weight-bold text-white">
                        <img src="/path/to/logo.png" alt="logo" height="40" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" onSelect={handleSelect}>
                            {/* Каталог с выпадающим списком */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link text-white">
                                        Каталог
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu onClick={handleSelect}>
                                        <Dropdown.Item as={Link} to="/category/1" onClick={handleSelect}>Категория 1</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/category/2" onClick={handleSelect}>Категория 2</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/category/3" onClick={handleSelect}>Категория 3</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Компания с выпадающим списком */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link text-white">
                                        Компания
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu onClick={handleSelect}>
                                        <Dropdown.Item as={Link} to="/about" onClick={handleSelect}>О компании</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/careers" onClick={handleSelect}>Вакансии</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/news" onClick={handleSelect}>Новости</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/reviews" onClick={handleSelect}>Отзывы</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Доставка и оплата */}
                            <Nav.Item className="mx-3">
                                <Link to="/delivery" className="nav-link text-white" onClick={handleSelect}>Доставка и оплата</Link>
                            </Nav.Item>

                            {/* Вход / регистрация или Аккаунт */}
                            <Nav.Item className="mx-3">
                                {!isAuthenticated ? (
                                    <Link to="/auth" className="nav-link text-white" onClick={handleSelect}>Вход / Регистрация</Link>
                                ) : (
                                    <Link to="/account" className="nav-link text-white" onClick={handleSelect}>Аккаунт</Link>
                                )}
                            </Nav.Item>

                            {/* Контакты */}
                            <Nav.Item className="mx-3">
                                <Link to="/contacts" className="nav-link text-white" onClick={handleSelect}>Контакты</Link>
                            </Nav.Item>

                            {/* Корзина */}
                            <Nav.Item className="mx-3">
                                <Link to="/cart" className="nav-link d-flex align-items-center text-white" onClick={handleSelect}>
                                    <FiShoppingCart size={24} />
                                    {totalItems > 0 && (
                                        <span className="badge bg-danger ms-2">{totalItems}</span>
                                    )}
                                </Link>
                            </Nav.Item>

                            {/* Выход */}
                            {isAuthenticated && (
                                <Nav.Item className="mx-3">
                                    <span onClick={handleLogout} className="nav-link text-white" style={{ cursor: 'pointer' }}>
                                        Выйти
                                    </span>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
