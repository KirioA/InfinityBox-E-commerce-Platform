import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface Vacancy {
    _id?: string;
    title: string;
    location: string;
    description: string;
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}

interface VacanciesState {
    vacancies: Vacancy[];
    selectedVacancy?: Vacancy;
    loading: boolean;
    error: string | null;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
}

const initialState: VacanciesState = {
    vacancies: [],
    loading: false,
    error: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
};

// Получение всех вакансий
export const fetchVacancies = createAsyncThunk(
    'vacancies/fetchVacancies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/jobs');
            return response.data.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке вакансий');
        }
    }
);
export const applyForJob = createAsyncThunk(
    'vacancies/applyForJob',
    async ({ jobId, applicantName, email, phone, resume }: { jobId: string; applicantName: string; email: string; phone: string; resume: File }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('applicantName', applicantName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('resume', resume);

            const response = await axios.post(`/api/v1/jobs/${jobId}/apply`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                return response.data.message;
            }
            return rejectWithValue('Не удалось отправить отклик');
        } catch (error) {
            console.error('Ошибка при отправке отклика:', error);
            return rejectWithValue('Ошибка при отправке отклика');
        }
    }
);
// Добавление вакансии
export const addVacancy = createAsyncThunk(
    'vacancies/addVacancy',
    async (vacancy: Vacancy, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/jobs', vacancy);
            if (response.data.success) {
                return { ...vacancy, _id: response.data.id };
            }
            return rejectWithValue('Не удалось добавить вакансию');
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении вакансии');
        }
    }
);

// Удаление вакансии
export const deleteVacancy = createAsyncThunk(
    'vacancies/deleteVacancy',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/v1/jobs/${id}`);
            if (response.data.success) {
                return id;
            }
            return rejectWithValue('Не удалось удалить вакансию');
        } catch (error) {
            return rejectWithValue('Ошибка при удалении вакансии');
        }
    }
);

// Обновление вакансии
export const updateVacancy = createAsyncThunk(
    'vacancies/updateVacancy',
    async ({ id, updatedData }: { id: string; updatedData: Partial<Vacancy> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/v1/jobs/${id}`, updatedData);
            if (response.data.success) {
                return { id, updatedData };
            }
            return rejectWithValue('Не удалось обновить вакансию');
        } catch (error) {
            return rejectWithValue('Ошибка при обновлении вакансии');
        }
    }
);

export const fetchVacancyById = createAsyncThunk(
    'vacancies/fetchVacancyById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/jobs/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue('Ошибка при получении вакансии');
        }
    }
);

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
        openEditModal: (state, action) => {
            state.selectedVacancy = action.payload;
            state.isEditModalOpen = true;
        },
        closeEditModal: (state) => {
            state.isEditModalOpen = false;
            state.selectedVacancy = undefined;
        },
        openDeleteModal: (state, action) => {
            state.selectedVacancy = action.payload;
            state.isDeleteModalOpen = true;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
            state.selectedVacancy = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVacancies.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action.payload;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies.push(action.payload);
                state.isAddModalOpen = false;
            })
            .addCase(deleteVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = state.vacancies.filter((v) => v._id !== action.payload);
                state.isDeleteModalOpen = false;
            })
            .addCase(updateVacancy.fulfilled, (state, action) => {
                state.loading = false;
                const { id, updatedData } = action.payload;
                const index = state.vacancies.findIndex((v) => v._id === id);
                if (index !== -1) {
                    state.vacancies[index] = { ...state.vacancies[index], ...updatedData };
                }
                state.isEditModalOpen = false;
            })
            .addCase(fetchVacancyById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedVacancy = action.payload;
            })
            // Обработка отклика на вакансию
            .addCase(applyForJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.loading = false;
                // Возможно, добавление уведомления о успешной отправке
                alert(action.payload); // Выводим сообщение о успехе
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }

});

export const {
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
