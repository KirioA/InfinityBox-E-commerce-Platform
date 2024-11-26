// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../axiosConfig.ts';
//
// // Определяем типы данных для состояния
// interface RegisterState {
//     loading: boolean;
//     error: string | null;
//     token: string | null;
// }
//
// const initialState: RegisterState = {
//     loading: false,
//     error: null,
//     token: null,
// };
//
// // Асинхронная функция для регистрации пользователя
// export const registerUser = createAsyncThunk(
//     'auth/registerUser',
//     async (userData: { name: string; mail: string; password: string }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/v1/user/register', userData);
//             if (response.data.success) {
//                 return response.data.token;
//             } else {
//                 return rejectWithValue(response.data.message || 'Ошибка регистрации');
//             }
//         } catch (err) {
//             return rejectWithValue('Ошибка при регистрации');
//         }
//     }
// );
//
// const registerSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.token = action.payload;
//                 state.error = null;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });
//
// export default registerSlice.reducer;
