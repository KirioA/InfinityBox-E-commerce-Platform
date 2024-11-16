import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useSessionCheck } from '../hooks/auth/useSessionCheck';
import { useLogout } from '../hooks/auth/useLogout';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import '../styles/header.css'
const Header: React.FC = () => {
    const { getTotalItems } = useCart();
    const { user, loading } = useSessionCheck();
    const { logout } = useLogout();
    const totalItems = getTotalItems();

    if (loading) return null;

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
            <Navbar expand="lg" variant="dark" className="navbar-custom">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="font-weight-bold text-white">
                        <img src="/path/to/logo.png" alt="logo" height="40" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            {/* Каталог с выпадающим списком */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link text-white">
                                        Каталог
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/category/1">Категория 1</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/category/2">Категория 2</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/category/3">Категория 3</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Компания с выпадающим списком */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link text-white">
                                        Компания
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/about">О компании</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/careers">Вакансии</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/news">Новости</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/reviews">Отзывы</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Доставка и оплата */}
                            <Nav.Item className="mx-3">
                                <Link to="/delivery" className="nav-link text-white">Доставка и оплата</Link>
                            </Nav.Item>

                            {/* Вход / регистрация */}
                            <Nav.Item className="mx-3">
                                {!user ? (
                                    <Link to="/auth" className="nav-link text-white">Вход / Регистрация</Link>
                                ) : (
                                    <span onClick={logout} className="nav-link text-white" style={{ cursor: 'pointer' }}>
                                        Выйти
                                    </span>
                                )}
                            </Nav.Item>

                            {/* Контакты */}
                            <Nav.Item className="mx-3">
                                <Link to="/contacts" className="nav-link text-white">Контакты</Link>
                            </Nav.Item>

                            {/* Корзина */}
                            <Nav.Item className="mx-3">
                                <Link to="/cart" className="nav-link d-flex align-items-center text-white">
                                    <FiShoppingCart size={24} />
                                    {totalItems > 0 && (
                                        <span className="badge bg-danger ms-2">{totalItems}</span>
                                    )}
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
