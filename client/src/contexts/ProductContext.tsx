import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchProducts } from '../services/productService';

type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
};

type ProductContextType = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // const productList = await fetchProducts();
                // setProducts(productList);
            } catch (err) {
                // setError('Ошибка при загрузке товаров');
            } finally {
                setLoading(false);
            }
        };

        // loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
