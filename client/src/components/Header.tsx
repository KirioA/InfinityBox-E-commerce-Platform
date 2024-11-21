import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';

const Header: React.FC = () => {
    const { getTotalItems } = useCart();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const totalItems = getTotalItems();

    const [expanded, setExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleSelect = () => setExpanded(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const styles = {
        header: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
        },
        navbar: {
            backgroundColor: '#ffffff',
            padding: '20px 0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        dropdownMenu: {
            backgroundColor: '#ffffff',
            border: 'none',
        },
        dropdownItem: (isSelected: boolean) => ({
            color: isSelected ? '#ffffff' : '#000000',
            backgroundColor: isSelected ? '#66bb6a' : 'transparent',
        }),
        navLink: {
            color: '#000',
            fontWeight: 500,
        },
        badge: {
            fontSize: '0.85rem',
            padding: '0.2rem 0.6rem',
        },
        toggleButton: (isExpanded: boolean) => ({
            backgroundColor: isExpanded ? '#81c784' : '#81c784',
        }),
    };

    return (
        <header style={styles.header}>
            <Navbar
                expand="lg"
                variant="dark"
                style={styles.navbar}
                expanded={expanded}
            >
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/path/to/logo.png" alt="logo" height="40" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                        style={styles.toggleButton(expanded)}
                    />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" onSelect={handleSelect}>
                            {/* Каталог */}
                            <Nav.Item className="mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link" style={styles.navLink}>
                                        Каталог
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={styles.dropdownMenu}>
                                        {['Категория 1', 'Категория 2', 'Категория 3'].map((category, index) => (
                                            <Dropdown.Item
                                                as={Link}
                                                to={`/category/${index + 1}`}
                                                key={category}
                                                style={styles.dropdownItem(selectedCategory === category)}
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setExpanded(false);
                                                }}
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
                                    <Dropdown.Menu style={styles.dropdownMenu}>
                                        {[
                                            { label: 'О компании', link: '/about' },
                                            { label: 'Вакансии', link: '/careers' },
                                            { label: 'Новости', link: '/news' },
                                            { label: 'Отзывы', link: '/reviews' },
                                        ].map((item) => (
                                            <Dropdown.Item
                                                as={Link}
                                                to={item.link}
                                                key={item.label}
                                                style={styles.dropdownItem(false)}
                                            >
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
                                <Link to="/cart" className="nav-link d-flex align-items-center" style={styles.navLink}>
                                    <FiShoppingCart size={24} />
                                    {totalItems > 0 && (
                                        <span className="badge bg-danger ms-2" style={styles.badge}>
                                            {totalItems}
                                        </span>
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
