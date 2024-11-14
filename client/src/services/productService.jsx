// src/services/productService.js

export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(`Ошибка при загрузке товара с ID ${id}:`, error);
        return null; // Возвращаем null в случае ошибки
    }
};
