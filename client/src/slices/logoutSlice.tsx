// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../axiosConfig';
//
// interface LogoutState {
//     loading: boolean;
//     error: string | null;
// }
//
// const initialState: LogoutState = {
//     loading: false,
//     error: null,
// };
//
// // Асинхронное действие для выхода
// export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
//     try {
//         await axios.post('/api/v1/user/logout'); // Дополнительно: API для выхода, если требуется
//         localStorage.removeItem('token');
//         return true;
//     } catch {
//         return rejectWithValue('Ошибка при выходе из системы');
//     }
// });
//
// const logoutSlice = createSlice({
//     name: 'logout',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(logoutUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.loading = false;
//                 state.error = null;
//             })
//             .addCase(logoutUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Ошибка при выходе';
//             });
//     },
// });
//
// export default logoutSlice.reducer;
