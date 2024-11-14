// src/contexts/ProductContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productList = await fetchProducts();
                setProducts(productList);
            } catch (err) {
                setError('Ошибка при загрузке товаров');
            } finally {
                setLoading(false);
            }
        };

        // Загружаем товары только один раз при монтировании компонента контекста
        loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
