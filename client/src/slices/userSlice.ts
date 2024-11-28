import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронное действие для получения данных пользователя
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/user/fetchdata', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('[INFO] Response from server:', response.data);
            return response.data; // Возвращаем весь объект, полученный с сервера
        } catch (error: any) {
            console.error('[ERROR] Fetch user data failed:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Асинхронное действие для проверки старого пароля
export const verifyOldPassword = createAsyncThunk(
    'user/verifyOldPassword',
    async (oldPassword: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/user/verify-password', { oldPassword }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return response.data; // Сервер должен вернуть { success: true }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка проверки пароля');
        }
    }
);

// Асинхронное действие для обновления пароля
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (newPassword: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/user/update-password', { newPassword });
            return response.data; // Предполагается, что сервер вернёт { success: true } при успешном обновлении
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления пароля');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        orderHistory: [],
        loading: false,
        error: null,
        verifying: false, // Состояние для проверки пароля
        verificationError: null, // Ошибки проверки старого пароля
        updating: false, // Состояние для обновления пароля
        updateError: null, // Ошибки обновления пароля
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Загрузка данных пользователя
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка загрузки данных пользователя';
            })
            // Проверка старого пароля
            .addCase(verifyOldPassword.pending, (state) => {
                state.verifying = true;
                state.verificationError = null;
            })
            .addCase(verifyOldPassword.fulfilled, (state) => {
                state.verifying = false;
                state.verificationError = null;
            })
            .addCase(verifyOldPassword.rejected, (state, action) => {
                state.verifying = false;
                state.verificationError = action.payload as string;
            })
            // Обновление пароля
            .addCase(updatePassword.pending, (state) => {
                state.updating = true;
                state.updateError = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.updating = false;
                state.updateError = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload as string;
            });
    },
});

export default userSlice.reducer;
