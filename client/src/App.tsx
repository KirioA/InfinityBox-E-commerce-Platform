// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetail';
import CatalogPage from './pages/CatalogPage';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Delivery from './pages/Delivery';
import Vacancies from './pages/Vacancies';
import News from './pages/News';
import Reviews from './pages/Reviews';
import Apply from './pages/Apply';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';  // Импортируем компонент
import { ThemeProvider } from './contexts/ThemeContext';
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import AdminAuthPage from "./pages/admin/AdminAuthPage.tsx";
import EditUser from "./pages/admin/EditUser.tsx";
import './styles/global.css'
import UserManagement from "./pages/admin/UserManagement.tsx";
import AdminProductManagement from "./pages/admin/AdminCatalog.tsx";

function App() {
    return (
        <ThemeProvider>
            <ProductProvider>
                <CartProvider>
                    <Router>
                        <ScrollToTop /> {/* Добавляем компонент ScrollToTop */}
                        <Header />
                        <div className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/catalog" element={<CatalogPage />} />

                                <Route path="/cart" element={<Cart />} />
                                <Route path="/auth" element={<Auth />} />
                                <Route
                                    path="/account"
                                    element={<PrivateRoute element={<Account />} />}
                                />
                                <Route
                                    path="/admin"
                                    element={<AdminRoute element={<AdminDashboard />} />} />
                                <Route
                                    path="/admin/edit-user/:userId"
                                    element={<AdminRoute element={<AdminDashboard />} />} />
                                <Route
                                    path="/admin/users"
                                    element={<AdminRoute element={<UserManagement />} />} />
                                <Route
                                    path="/admin/products"
                                    element={<AdminRoute element={<AdminProductManagement />} />} />


                                <Route path="/about" element={<About />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/delivery" element={<Delivery />} />
                                <Route path="/careers" element={<Vacancies />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/reviews" element={<Reviews />} />
                                <Route path="/apply/:jobTitle" element={<Apply />} />
                                <Route path="*" element={<NotFound />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/admin/edit-user/:userId" element={<EditUser />} />
                                <Route path="/admin/auth" element={<AdminAuthPage />} />
                                <Route path="/products/:id" element={<ProductDetails />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </CartProvider>
            </ProductProvider>
        </ThemeProvider>
    );
}

export default App;
