import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const styles = {
        footer: {
            backgroundColor: '#1f1f1f',
            color: '#fff',
            padding: '60px 0',
            marginTop: '40px',
            textAlign: 'center' as const,
            fontSize: '14px',
            position: 'relative' as const,
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
        },
        heading: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#81c784',
        },
        text: {
            fontSize: '1rem',
            margin: '5px 0',
            color: '#ccc',
        },
        linksList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1rem',
            display: 'block',
            margin: '5px 0',
            transition: 'color 0.3s',
        },
        linkHover: {
            color: '#f5a623',
        },
        socialLinks: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
        },
        socialIcon: {
            color: '#fff',
            margin: '0 10px',
            fontSize: '24px',
            transition: 'color 0.3s, transform 0.3s',
        },
        socialIconHover: {
            color: '#f5a623',
            transform: 'scale(1.1)',
        },
        bottom: {
            marginTop: '30px',
            fontSize: '0.875rem',
            color: '#aaa',
            textAlign: 'center' as const,
        },
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Информация о компании */}
                <div>
                    <h5 style={styles.heading}>InfinityBox.by</h5>
                    <p style={styles.text}>Компания по продаже и обслуживанию коробок для всего!</p>
                    <p style={styles.text}>УНП: 1234567890</p>
                    <div style={styles.socialLinks}>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIcon}
                            onMouseOver={(e) => (e.currentTarget.style.color = styles.socialIconHover.color)}
                            onMouseOut={(e) => (e.currentTarget.style.color = styles.socialIcon.color)}
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIcon}
                            onMouseOver={(e) => (e.currentTarget.style.color = styles.socialIconHover.color)}
                            onMouseOut={(e) => (e.currentTarget.style.color = styles.socialIcon.color)}
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIcon}
                            onMouseOver={(e) => (e.currentTarget.style.color = styles.socialIconHover.color)}
                            onMouseOut={(e) => (e.currentTarget.style.color = styles.socialIcon.color)}
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIcon}
                            onMouseOver={(e) => (e.currentTarget.style.color = styles.socialIconHover.color)}
                            onMouseOut={(e) => (e.currentTarget.style.color = styles.socialIcon.color)}
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Полезные ссылки */}
                <div>
                    <h5 style={styles.heading}>Полезные ссылки</h5>
                    <ul style={styles.linksList}>
                        <li>
                            <Link
                                to="/about"
                                style={styles.link}
                                onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
                                onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
                            >
                                О компании
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/delivery"
                                style={styles.link}
                                onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
                                onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
                            >
                                Доставка и оплата
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/reviews"
                                style={styles.link}
                                onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
                                onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
                            >
                                Отзывы
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacts"
                                style={styles.link}
                                onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
                                onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
                            >
                                Контакты
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Контактная информация */}
                <div>
                    <h5 style={styles.heading}>Контактная информация</h5>
                    <p style={styles.text}>
                        <AiFillPhone size={20} /> +375 (29) 123-45-67
                    </p>
                    <p style={styles.text}>support@infinitybox.by</p>
                </div>
            </div>
            <p style={styles.bottom}>© {new Date().getFullYear()} InfinityBox.by. Все права защищены.</p>
        </footer>
    );
};

export default Footer;
