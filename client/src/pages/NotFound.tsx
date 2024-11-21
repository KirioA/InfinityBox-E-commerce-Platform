// src/pages/NotFound.tsx
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const NotFound: React.FC = () => {
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
            backgroundColor: '#ffffff',
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
            marginTop: 'auto', // Это поможет прикрепить футер к низу страницы
            padding: '20px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            {/* Размещение Breadcrumbs в левой части экрана */}
            <div style={styles.breadcrumbsContainer}>
                <Breadcrumbs
                    paths={[
                        { name: 'Главная страница', path: '/' },
                        { name: 'Страница не найдена', path: '/404' },
                    ]}
                />
            </div>

            {/* Контент по центру */}
            <div style={styles.content}>
                <h2 className="mt-5">Страница не найдена</h2>
                <p>Упс, мы не нашли такую страницу. Возможно, вы ошиблись в адресе или такой страницы не существует.</p>
                <Link to="/">
                    <Button
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                            e.currentTarget.style.color = styles.buttonHover.color;
                            e.currentTarget.style.borderColor = styles.buttonHover.borderColor;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                            e.currentTarget.style.color = styles.button.color;
                            e.currentTarget.style.borderColor = styles.button.borderColor;
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
