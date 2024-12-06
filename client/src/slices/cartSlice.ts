import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../redux/store.ts';

type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
};

interface CartState {
    cart: Product[];
}

const initialState: CartState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

// Асинхронное действие для загрузки корзины с сервера (если пользователь авторизован)
export const loadCartFromServer = createAsyncThunk(
    'cart/loadCartFromServer',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('Пользователь не авторизован');
        }

        try {
            const response = await axios.get('/api/v1/user/cart', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.cart;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронное действие для сохранения корзины на сервере
export const saveCartToServer = createAsyncThunk(
    'cart/saveCartToServer',
    async (cart: Product[], { getState, rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('Пользователь не авторизован');
        }

        try {

            const response = await axios.post(
                '/api/v1/user/save-cart',
                { cart },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existingProduct = state.cart.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }

            // Если пользователь не авторизован, сохраняем корзину в localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.cart = state.cart.filter(item => item.id !== action.payload);

            // Если пользователь не авторизован, сохраняем корзину в localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        updateQuantity(state, action: PayloadAction<{ productId: string; newQuantity: number }>) {
            const { productId, newQuantity } = action.payload;
            const product = state.cart.find(item => item.id === productId);
            if (product) {
                product.quantity = newQuantity;
            }

            // Если пользователь не авторизован, сохраняем корзину в localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        clearCart(state) {
            state.cart = [];
            // Если пользователь не авторизован, очищаем корзину в localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        syncCartWithServer(state, action: PayloadAction<Product[]>) {
            state.cart = action.payload;
            // Если пользователь авторизован, сохраняем корзину на сервере
            const token = localStorage.getItem('token');
            if (token) {
                axios.post(
                    '/api/v1/user/save-cart',
                    { cart: state.cart },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadCartFromServer.fulfilled, (state, action) => {
            state.cart = action.payload;
            // После загрузки корзины с сервера сохраняем её в localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
        });
        builder.addCase(saveCartToServer.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        });
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, syncCartWithServer } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
