import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice.ts';
import adminReducer from '../slices/adminSlice';
import productsReducer from '../slices/productSlice';
import cartReducer from  '../slices/cartSlice.ts'
import newsReducer from '../slices/newsSlice.ts'
import vacanciesReducer from  '../slices/vacanciesSlice.ts'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        admin: adminReducer,
        products: productsReducer,
        cart: cartReducer,
        news: newsReducer,
        vacancies: vacanciesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
