// userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        orderHistory: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Сохраняем данные пользователя
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка загрузки данных пользователя';
            });
    },
});

export default userSlice.reducer;
