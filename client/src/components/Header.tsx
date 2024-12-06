import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FiShoppingCart } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAppSelector } from '../hooks/reduxHooks.tsx';
import logo from '../img/logo.svg';
import '../styles/global.css';
import { selectCart } from '../slices/cartSlice'; // Импортируйте селектор

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const cartItems = useAppSelector(selectCart); // Получаем cartItems из store
    const [expanded, setExpanded] = useState(false);
    const [isCategoryHovered, setIsCategoryHovered] = useState(false); // Для десктопа
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Для мобильных

    const handleSelect = () => setExpanded(false);

    // Функция для подсчета общего количества товаров в корзине
    const getTotalQuantity = () => {
        return cartItems && cartItems.length > 0
            ? cartItems.reduce((total, item) => total + item.quantity, 0)
            : 0;
    };

    const totalQuantity = getTotalQuantity(); // Получаем общее количество товаров

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

    const CartIcon = () => {
        return (
            <Link to="/cart" style={styles.cartButton}>
                <FiShoppingCart size={24} />
                {totalQuantity > 0 && (
                    <span style={styles.badge}>{totalQuantity}</span>
                )}
            </Link>
        );
    };

    const handleCategoryHover = () => {
        // Наведение для десктопа
        if (window.innerWidth >= 992) {
            setIsCategoryHovered(true);
        }
    };

    const handleCategoryLeave = () => {
        // Убираем hover-эффект на десктопе
        if (window.innerWidth >= 992) {
            setIsCategoryHovered(false);
        }
    };

    const handleCategoryClick = () => {
        // Для мобильных устройств используем click
        if (window.innerWidth < 992) {
            setIsCategoryOpen(!isCategoryOpen);
        }
        navigate('/catalog')
        setExpanded(false)
    };

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
                        <div className="d-lg-none" onClick={handleSelect}>
                            <CartIcon />
                        </div>
                        <Navbar.Toggle
                            style={styles.toggleButton}
                            aria-controls="navbar-nav"
                            onClick={() => setExpanded(!expanded)}
                            onSelect={handleSelect}
                        />
                    </div>

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" onSelect={handleSelect}>
                            <Nav.Item className="mx-3">
                                <Dropdown
                                    show={isCategoryOpen || isCategoryHovered} // Управляем состоянием открытия меню категорий
                                    onToggle={(isOpen) => setIsCategoryOpen(isOpen)}
                                >
                                    <Dropdown.Toggle
                                        variant="link"
                                        className="nav-link"
                                        style={styles.navLink}
                                        onClick={handleCategoryClick} // Для мобильных
                                        onMouseEnter={handleCategoryHover} // Для десктопа
                                        onMouseLeave={handleCategoryLeave} // Для десктопа
                                    >
                                        Каталог
                                    </Dropdown.Toggle>
                                    <div  onMouseEnter={handleCategoryHover} // Для десктопа
                                          onMouseLeave={handleCategoryLeave}>
                                    <Dropdown.Menu
                                        onClick={handleSelect}
                                    >
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
                                    </div>
                                </Dropdown>
                            </Nav.Item>

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

                            <Nav.Item className="mx-3">
                                <button onClick={toggleTheme} style={styles.themeButton}>
                                    {theme === 'light' ? (
                                        <FaMoon size={24} style={styles.themeIcon} />
                                    ) : (
                                        <FaSun size={24} style={styles.themeIcon} />
                                    )}
                                </button>
                            </Nav.Item>

                            <Nav.Item className="ms-3 d-none d-lg-block" onClick={handleSelect}>
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
