// src/components/Footer.jsx
import React from 'react';
import '../styles/footer.css'
const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>Скоро будет отвечаю</p>
        </footer>
    );
};

// Стили для футера
const footerStyle = {
    position: 'relative',  // позволяет футеру быть внизу
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '10px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    fontSize: '14px',
    color: '#6c757d',
    marginTop: 'auto',  // отступ от контента
};

export default Footer;
