// Пример сервиса для получения данных с сервера (или с mock данными)
export const fetchProducts = async () => {
    try {
        // Здесь вы можете сделать запрос к серверу для получения всех товаров
        // const response = await fetch('https://your-api-url.com/products');
        // const data = await response.json();

        // Моковые данные
        const data = [
            { id: '1', title: 'Товар 1', description: 'Описание товара 1', price: 100 },
            { id: '2', title: 'Товар 2', description: 'Описание товара 2', price: 200 },
            { id: '3', title: 'Товар 3', description: 'Описание товара 3', price: 300 }
        ];

        return data;
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        return []; // Возвращаем пустой массив при ошибке
    }
};

// Функция для получения товара по ID
export const fetchProductById = async (id) => {
    try {
        // Здесь вы можете сделать запрос к серверу для получения товара по ID
        // const response = await fetch(`https://your-api-url.com/products/${id}`);
        // const product = await response.json();

        // Моковые данные
        const data = [
            { id: '1', title: 'Товар 1', description: 'Описание товара 1', price: 100 },
            { id: '2', title: 'Товар 2', description: 'Описание товара 2', price: 200 },
            { id: '3', title: 'Товар 3', description: 'Описание товара 3', price: 300 }
        ];

        return data.find(product => product.id === id); // Ищем товар по ID
    } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
        return null; // Возвращаем null в случае ошибки
    }
};
