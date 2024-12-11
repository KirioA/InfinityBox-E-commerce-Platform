import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface NewsItem {
    _id?: string;
    title: string;
    date: string;
    content: string;
    author: string;
    status: 'active' | 'inactive';
    isVisible: boolean;
    createdAt: string;
}

interface NewsState {
    news: NewsItem[];
    selectedNews?: NewsItem;
    loading: boolean;
    error: string | null;
    isAddModalOpen: boolean; // Состояние для модалки добавления
    isEditModalOpen: boolean; // Состояние для модалки редактирования
    isDeleteModalOpen: boolean; // Состояние для модалки удаления
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
};

// Получение всех новостей
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/news');
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Ошибка при загрузке новостей');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

// Добавление новой новости
export const addNews = createAsyncThunk(
    'news/addNews',
    async (newsItem: NewsItem, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/news', newsItem);
            if (response.data.success) {
                return { ...newsItem, _id: response.data.newsId };
            } else {
                return rejectWithValue('Не удалось добавить новость');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при добавлении новости');
        }
    }
);


// Удаление новости
export const deleteNews = createAsyncThunk(
    'news/deleteNews',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/v1/news/${id}`);
            if (response.data.success) {
                return id;
            } else {
                return rejectWithValue('Не удалось удалить новость');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при удалении новости');
        }
    }
);

// Обновление новости
export const updateNews = createAsyncThunk(
    'news/updateNews',
    async ({ id, updatedData }: { id: string; updatedData: Partial<NewsItem> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/v1/news/${id}`, updatedData);
            if (response.data.success) {
                return { id, updatedData };
            } else {
                return rejectWithValue('Не удалось обновить новость');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при обновлении новости');
        }
    }
);
export const fetchNewsById = createAsyncThunk(
    'news/fetchNewsById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/news/${id}`);
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Ошибка при получении новости');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

// Слайс новостей
const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
        openEditModal: (state, action) => {
            state.selectedNews = action.payload;
            state.isEditModalOpen = true;
        },
        closeEditModal: (state) => {
            state.isEditModalOpen = false;
            state.selectedNews = undefined;
        },
        openDeleteModal: (state, action) => {
            state.selectedNews = action.payload;
            state.isDeleteModalOpen = true;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
            state.selectedNews = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // Получение всех новостей
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Добавление новости
            .addCase(addNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news.push(action.payload);
                state.isAddModalOpen = false;
            })
            .addCase(addNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Удаление новости
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = state.news.filter((item) => item._id !== action.payload);
                state.isDeleteModalOpen = false;
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Обновление новости
            .addCase(updateNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNews.fulfilled, (state, action) => {
                state.loading = false;
                const { id, updatedData } = action.payload;
                const index = state.news.findIndex((item) => item._id === id);
                if (index !== -1) {
                    state.news[index] = { ...state.news[index], ...updatedData };
                }
                state.isEditModalOpen = false;
            })
            .addCase(updateNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchNewsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
} = newsSlice.actions;

export default newsSlice.reducer;
