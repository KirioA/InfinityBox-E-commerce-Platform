// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Импортируем CartProvider
import Home from './pages/Home'; // Главная страница
import ProductDetail from './pages/ProductDetail'; // Страница товара
import Cart from './pages/Cart'; // Страница корзины
import NotFound from './pages/NotFound'; // Страница 404
import Auth from './pages/Auth'; // Страница авторизации/регистрации
import Header from './components/Header'; // Подключаем Header

import './App.css';
import './styles/global.css';  // Подключаем глобальные стили
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключаем стили Bootstrap
function App() {
    return (
        <CartProvider>
            <Router>
                {/* Добавляем Header здесь, чтобы он был на всех страницах */}
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
