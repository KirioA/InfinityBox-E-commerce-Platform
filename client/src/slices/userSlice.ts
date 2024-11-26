// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../axiosConfig';
//
// interface User {
//     username: string;
//     email: string;
//     avatarUrl?: string;
//     bonusPoints?: number;
//     status?: string;
//     registrationDate?: string;
// }
//
// interface UserState {
//     user: User | null;
//     orderHistory: Array<{ date: string; orderNumber: string; status: string; totalAmount: number }> | null;
//     loading: boolean;
//     error: string | null;
// }
//
// const initialState: UserState = {
//     user: null,
//     orderHistory: null,
//     loading: false,
//     error: null,
// };
//
// // Асинхронное действие для получения данных пользователя
// export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, { rejectWithValue }) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/v1/user/fetchdata', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//
//         if (response.data.success) {
//             return { user: response.data.user, orderHistory: response.data.orderHistory };
//         } else {
//             return rejectWithValue('Ошибка при загрузке данных пользователя');
//         }
//     } catch {
//         return rejectWithValue('Ошибка при запросе данных');
//     }
// });
//
// // Асинхронное действие для обновления данных пользователя
// export const updateUser = createAsyncThunk(
//     'user/updateUser',
//     async (data: Partial<User>, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put('/api/v1/user/update', data, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//
//             if (response.data.success) {
//                 return response.data.user;
//             } else {
//                 return rejectWithValue('Не удалось обновить данные');
//             }
//         } catch {
//             return rejectWithValue('Ошибка при обновлении данных');
//         }
//     }
// );
//
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch User Data
//             .addCase(fetchUserData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload.user;
//                 state.orderHistory = action.payload.orderHistory;
//                 state.error = null;
//             })
//             .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Ошибка при загрузке данных';
//             })
//             // Update User Data
//             .addCase(updateUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = { ...state.user, ...action.payload };
//                 state.error = null;
//             })
//             .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Ошибка при обновлении данных';
//             });
//     },
// });
//
// export default userSlice.reducer;
