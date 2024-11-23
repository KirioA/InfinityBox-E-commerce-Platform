// src/pages/NotFound.tsx
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы



const NotFound: React.FC = () => {
    const { theme } = useTheme(); // Используем контекст для получения текущей темы

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        },
        content: {
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
        },
        breadcrumbsContainer: {
            position: 'absolute',
            top: '20px',
            left: '20px',
        },
        button: {
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
        buttonHover: {
            backgroundColor: '#81c784',
            color: '#ffffff',
            borderColor: '#81c784',
        },
        footer: {
            marginTop: 'auto',
            padding: '20px',
            textAlign: 'center',
        },
        animated: {
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        },
        animatedHover: {
            transform: 'scale(1.05)',
            opacity: 0.9,
        },
    };

    return (
        <div style={styles.container}>
            <div style={{ ...styles.breadcrumbsContainer, ...styles.animated }}>
                <Breadcrumbs
                    paths={[
                        { name: 'Главная страница', path: '/' },
                        { name: 'Страница не найдена', path: '/404' },
                    ]}
                />
            </div>

            <div style={{ ...styles.content, ...styles.animated }}>
                <h2 className="mt-5">Страница не найдена</h2>
                <p>Упс, мы не нашли такую страницу. Возможно, вы ошиблись в адресе или такой страницы не существует.</p>
                <Link to="/">
                    <Button
                        style={styles.button}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, styles.buttonHover);
                            Object.assign(e.currentTarget.parentElement, styles.animatedHover);
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, styles.button);
                            Object.assign(e.currentTarget.parentElement, styles.animated);
                        }}
                    >
                        Перейти на главную
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
