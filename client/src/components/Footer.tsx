import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Иконки для соцсетей
import { AiFillPhone } from 'react-icons/ai'; // Иконка для телефона
import { Link } from 'react-router-dom'; // Для переходов по внутренним ссылкам
import '../styles/footer.css'; // Подключаем файл с внешними стилями

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Информация о компании */}
                <div className="company-info">
                    <h5 className="footer-heading">InfinityBox.by</h5>
                    <p className="footer-text">Компания по продаже и обслуживанию коробок для всего!</p>
                    <p className="footer-text">УНП: 1234567890</p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Полезные ссылки */}
                <div className="footer-links">
                    <h5 className="footer-heading">Полезные ссылки</h5>
                    <ul className="footer-links-list">
                        <li><Link to="/about" className="footer-link">О компании</Link></li>
                        <li><Link to="/delivery" className="footer-link">Доставка и оплата</Link></li>
                        <li><Link to="/reviews" className="footer-link">Отзывы</Link></li>
                        <li><Link to="/contacts" className="footer-link">Контакты</Link></li>
                    </ul>
                </div>

                {/* Контактная информация */}
                <div className="contact-info">
                    <h5 className="footer-heading">Контактная информация</h5>
                    <p className="footer-text"><AiFillPhone size={20} /> +375 (29) 123-45-67</p>
                    <p className="footer-text">support@infinitybox.by</p>
                </div>
            </div>
            <p className="footer-bottom">© {new Date().getFullYear()} InfinityBox.by. Все права защищены.</p>
        </footer>
    );
};

export default Footer;
