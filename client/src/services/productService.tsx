// export type Product = {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
// };
//
// export const fetchProducts = async (): Promise<Product[]> => {
//     try {
//         const response = await fetch('http://localhost:5000/products');
//         if (!response.ok) {
//             // throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
//         }
//         const data: Product[] = await response.json();
//         return data;
//     } catch (error) {
//         // console.error('Ошибка при загрузке товаров:', error);
//         return []; // Возвращаем пустой массив в случае ошибки
//     }
// };
//
// export const fetchProductById = async (id: string): Promise<Product | null> => {
//     try {
//         const response = await fetch(`http://localhost:5000/products/${id}`);
//         if (!response.ok) {
//             // throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
//         }
//         const product: Product = await response.json();
//         return product;
//     } catch (error) {
//         // console.error(`Ошибка при загрузке товара с ID ${id}:`, error);
//         return null; // Возвращаем null в случае ошибки
//     }
// };
