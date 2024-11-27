import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

// Асинхронный thunk для логина
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/user/login', { name: username, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                return response.data.token;
            } else {
                return rejectWithValue('Неверный логин или пароль');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при авторизации');
        }
    }
);

// Асинхронный thunk для регистрации
export const register = createAsyncThunk(
    'auth/register',
    async (
        { username, password, email }: { username: string; password: string; email: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post('/api/v1/user/register', { name: username, mail: email, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                return response.data.token;
            } else {
                return rejectWithValue(response.data.message || 'Ошибка регистрации');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при регистрации');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
