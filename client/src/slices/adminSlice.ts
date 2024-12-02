import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    registrationDate: string;
    lastLogin?: string;
    status: string;
    orders: number;
    totalSpent: number;
}

interface AdminState {
    isAdminAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    users: User[];
    usersFetched: boolean;
}

const initialState: AdminState = {
    isAdminAuthenticated: JSON.parse(localStorage.getItem('isAdminAuthenticated') || 'false'),
    loading: false,
    error: null,
    users: [],
    usersFetched: false,
};

// Fetch users with error handling and loading states
export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as { admin: AdminState };
        if (state.admin.usersFetched) {
            return state.admin.users;
        }

        try {
            const response = await axios.get('/api/v1/admin/users');
            return response.data.data; // Assuming your response data is in a 'data' field
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error loading users');
        }
    }
);
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId: string, thunkAPI) => {
        try {
            const response = await axios.delete(`/api/v1/admin/users/${userId}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Ошибка удаления пользователя');
        }
    }
);

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
            localStorage.setItem('isAdminAuthenticated', 'true');
            state.loading = false;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAdminAuthenticated = false;
            localStorage.removeItem('isAdminAuthenticated');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.usersFetched = true;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload._id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка удаления пользователя';
            });
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;

export default adminSlice.reducer;
