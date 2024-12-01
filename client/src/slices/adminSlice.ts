// slices/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    isAdminAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    isAdminAuthenticated: JSON.parse(localStorage.getItem('isAdminAuthenticated') || 'false'), // Загружаем состояние из localStorage
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state) {
            state.isAdminAuthenticated = true;
            state.loading = false;
            localStorage.setItem('isAdminAuthenticated', 'true'); // Сохраняем в localStorage
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.isAdminAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('isAdminAuthenticated'); // Удаляем из localStorage
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;
export default adminSlice.reducer;
