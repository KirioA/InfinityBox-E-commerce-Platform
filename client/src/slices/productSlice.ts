import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface Product {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    createdAt?: string;
}

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

// Асинхронный thunk для получения всех продуктов
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue, getState }) => {
        try {
            console.log('Fetching products from API...');
            const response = await axios.get('/api/v1/products');

            console.log('API Response:', response.data);


            console.log('Extracted Products:', response.data.data);

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


// Асинхронный thunk для добавления нового продукта
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product: Product, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/products', product);
            if (response.data.success) {
                return product;
            } else {
                return rejectWithValue('Не удалось добавить продукт');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при добавлении продукта');
        }
    }
);

// Асинхронный thunk для удаления продукта
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
                state.products = action.payload; // Важно использовать payload напрямую
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
            });
    },
});

export default productsSlice.reducer;
