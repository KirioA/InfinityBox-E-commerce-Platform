import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice.ts';
import adminReducer from '../slices/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
