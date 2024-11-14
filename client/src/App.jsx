// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth'; // Страница входа/регистрации
import Account from './pages/Account'; // Страница личного кабинета
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // Защищенный маршрут
import Footer from './components/Footer';
import './App.css';
import './styles/global.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <div id="root">
                    <Header />
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Home />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/auth" element={<Auth />} /> {/* Страница входа */}
                            {/* Приватный маршрут для страницы личного кабинета */}
                            <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
