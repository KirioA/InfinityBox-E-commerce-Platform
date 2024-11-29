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
            const response = await axios.post(
                '/api/v1/user/verify-password',
                { oldPassword },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
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

// Асинхронное действие для загрузки нового аватара
export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (file: File, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('Токен не найден. Выполните вход снова.');
        }

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            console.log('[INFO] Отправка файла на сервер:', file.name);

            const response = await axios.post('/api/v1/user/upload-avatar', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('[INFO] Ответ сервера:', response.data);

            // Предполагаем, что сервер возвращает { profilePicture: 'url' }
            return response.data; // { profilePicture: 'new-avatar-url' }
        } catch (error: any) {
            console.error('[ERROR] Ошибка загрузки аватара:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || 'Ошибка при загрузке аватара');
        }
    }
);

export const addAddress = createAsyncThunk(
    'user/addAddress',
    async (address: { street: string; city: string; postalCode: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                '/api/v1/user/add-address',
                address,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            return response.data; // Предполагаем, что сервер вернёт обновлённый список адресов
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Ошибка добавления адреса');
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'user/deleteAddress',
    async (addressId: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/v1/user/delete-address/${addressId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return response.data; // Предполагаем, что сервер вернёт обновлённый список адресов
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Ошибка удаления адреса');
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
        updatingAvatar: false, // Состояние для загрузки аватара
        avatarError: null, // Ошибка загрузки аватара
        addresses: [],
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
            })
            // Загрузка аватара
            .addCase(uploadAvatar.pending, (state) => {
                state.updatingAvatar = true;
                state.avatarError = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.updatingAvatar = false;
                if (action.payload?.profilePicture) {
                    state.user = { ...state.user, profilePicture: action.payload.profilePicture };
                }
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.updatingAvatar = false;
                state.avatarError = action.payload || 'Ошибка загрузки аватара';
            })
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload.addresses; // Обновляем список адресов
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка добавления адреса';
            })
            // Удаление адреса
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload.addresses; // Обновляем список адресов
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка удаления адреса';
            });
    },
});

export default userSlice.reducer;
