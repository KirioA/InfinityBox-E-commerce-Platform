import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Обновленный интерфейс Product
interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock?: number;
    netWeight?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ProductsState {
    products: Product[];
    selectedProduct?: Product;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/products/${id}`);
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Ошибка при загрузке товара');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/products');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);



export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updatedData }: { id: string; updatedData: Partial<Product> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/v1/products/${id}`, updatedData);
            if (response.data.success) {
                return { id, updatedData };
            } else {
                return rejectWithValue('Не удалось обновить продукт');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при обновлении продукта');
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product: Product, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/products', product);
            if (response.data.success) {
                return { ...product, _id: response.data.productId };
            } else {
                return rejectWithValue('Не удалось добавить продукт');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при добавлении продукта');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/v1/products/${id}`);
            if (response.data.success) {
                return id;
            } else {
                return rejectWithValue('Не удалось удалить продукт');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при удалении продукта');
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add product
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;

                // Обновляем продукт в массиве products, если он там есть
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                } else {
                    state.products.push(action.payload);
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const { id, updatedData } = action.payload;
                const index = state.products.findIndex((product) => product._id === id);
                if (index !== -1) {
                    state.products[index] = {
                        ...state.products[index],
                        ...updatedData,
                        updatedAt: new Date().toISOString()
                    };
                }

                // Обновляем selectedProduct, если это тот же продукт
                if (state.selectedProduct?._id === id) {
                    state.selectedProduct = {
                        ...state.selectedProduct,
                        ...updatedData,
                        updatedAt: new Date().toISOString()
                    };
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productsSlice.reducer;