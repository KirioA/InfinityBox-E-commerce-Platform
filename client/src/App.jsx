// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import './App.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        // Прокручиваем страницу вверх при смене маршрута
        window.scrollTo(0, 0);
    }, [location]);

    return null;  // Этот компонент не рендерит ничего, его задача - только прокрутить страницу
}

function App() {
    return (
        <CartProvider>
            <Router>
                <ScrollToTop />  {/* Добавляем компонент для прокрутки */}
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/auth" element={<PrivateRoute><Auth /></PrivateRoute>} />
                    <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;
