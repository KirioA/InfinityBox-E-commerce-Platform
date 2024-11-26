import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../img/logo.svg';
import '../styles/global.css'; // Подключаем стили

const Header: React.FC = () => {
    const { getTotalItems } = useCart();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const totalItems = getTotalItems();
    const { theme, toggleTheme } = useTheme();

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
    };

    return (
        <header style={styles.header}>
            <Navbar expand="lg" variant="dark" style={styles.navbar} expanded={expanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="logo" height="40px" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" onSelect={handleSelect}>
                            {/* Каталог */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link" style={styles.navLink}>
                                        Каталог
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
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
                                    <Dropdown.Menu>
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

                            {/* Корзина */}
                            <Nav.Item className="mx-3">
                                <Link to="/cart" className="nav-link d-flex align-items-center" style={styles.navLink} onClick={handleSelect}>
                                    <FiShoppingCart size={24} />
                                    {totalItems > 0 && (
                                        <span className="badge bg-danger ms-2">
                                            {totalItems}
                                        </span>
                                    )}
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
