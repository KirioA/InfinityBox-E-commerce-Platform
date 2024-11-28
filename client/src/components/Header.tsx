import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiShoppingCart } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAppSelector } from '../hooks/reduxHooks.tsx';
import logo from '../img/logo.svg';
import '../styles/global.css';

const Header: React.FC = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const { theme, toggleTheme } = useTheme();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const [expanded, setExpanded] = useState(false);

    const handleSelect = () => setExpanded(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const styles = {
        header: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
        },
        navbar: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            padding: '20px 0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        navLink: {
            color: theme === 'light' ? '#000' : '#fff',
            fontWeight: 500,
        },
        themeButton: {
            backgroundColor: 'transparent',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
        },
        themeIcon: {
            color: theme === 'light' ? '#000' : '#fff',
        },
        toggleButton: {
            border: 'none',
            backgroundColor: theme === 'light' ? '#43a047' : '#444444',
            color: theme === 'light' ? '#000' : '#fff',
            borderRadius: '5px',
            padding: '8px 12px',
            cursor: 'pointer',
        },
        cartButton: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme === 'light' ? '#000' : '#fff',
            position: 'relative' as const,
        },
        badge: {
            position: 'absolute' as const,
            top: '-5px',
            right: '-10px',
            backgroundColor: 'red',
            color: '#fff',
            borderRadius: '50%',
            fontSize: '12px',
            padding: '2px 6px',
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
        },
        mobileControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        },
    };

    const CartIcon = () => (
        <Link to="/cart" style={styles.cartButton}>
            <FiShoppingCart size={24} />
            {totalItems > 0 && (
                <span style={styles.badge}>{totalItems}</span>
            )}
        </Link>
    );

    return (
        <header style={styles.header}>
            <Navbar
                expand="lg"
                variant="dark"
                style={styles.navbar}
                expanded={expanded}
                collapseOnSelect
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={handleSelect}>
                        <img src={logo} alt="logo" height="40px" />
                    </Navbar.Brand>

                    <div style={styles.mobileControls}>
                        {/* Корзина в мобильном виде */}
                        <div className="d-lg-none">
                            <CartIcon />
                        </div>
                        <Navbar.Toggle
                            style={styles.toggleButton}
                            aria-controls="navbar-nav"
                            onClick={() => setExpanded(!expanded)}
                        />
                    </div>

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" onSelect={handleSelect}>
                            {/* Каталог */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link" style={styles.navLink}>
                                        Каталог
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu onClick={handleSelect}>
                                        {['Категория 1', 'Категория 2', 'Категория 3'].map((category, index) => (
                                            <Dropdown.Item
                                                as={Link}
                                                to={`/category/${index + 1}`}
                                                key={category}
                                            >
                                                {category}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Компания */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link" style={styles.navLink}>
                                        Компания
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu onClick={handleSelect}>
                                        {[
                                            { label: 'О компании', link: '/about' },
                                            { label: 'Вакансии', link: '/careers' },
                                            { label: 'Новости', link: '/news' },
                                            { label: 'Отзывы', link: '/reviews' },
                                        ].map((item) => (
                                            <Dropdown.Item as={Link} to={item.link} key={item.label}>
                                                {item.label}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>

                            {/* Прочие ссылки */}
                            <Nav.Item className="mx-3">
                                <Link to="/delivery" className="nav-link" style={styles.navLink} onClick={handleSelect}>
                                    Доставка и оплата
                                </Link>
                            </Nav.Item>
                            <Nav.Item className="mx-3">
                                {!isAuthenticated ? (
                                    <Link to="/auth" className="nav-link" style={styles.navLink} onClick={handleSelect}>
                                        Вход / Регистрация
                                    </Link>
                                ) : (
                                    <Link to="/account" className="nav-link" style={styles.navLink} onClick={handleSelect}>
                                        Аккаунт
                                    </Link>
                                )}
                            </Nav.Item>
                            <Nav.Item className="mx-3">
                                <Link to="/contacts" className="nav-link" style={styles.navLink} onClick={handleSelect}>
                                    Контакты
                                </Link>
                            </Nav.Item>

                            {/* Кнопка смены темы */}
                            <Nav.Item className="mx-3">
                                <button onClick={toggleTheme} style={styles.themeButton}>
                                    {theme === 'light' ? (
                                        <FaMoon size={24} style={styles.themeIcon} />
                                    ) : (
                                        <FaSun size={24} style={styles.themeIcon} />
                                    )}
                                </button>
                            </Nav.Item>

                            {/* Корзина в десктопном виде */}
                            <Nav.Item className="ms-3 d-none d-lg-block">
                                <CartIcon />
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;