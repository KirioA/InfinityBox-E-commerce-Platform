// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Добавить товар в корзину
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Удалить товар из корзины
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // Изменить количество товара в корзине
    const updateQuantity = (productId, newQuantity) => {
        setCart((prevCart) => prevCart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Получить общее количество товаров в корзине
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};
