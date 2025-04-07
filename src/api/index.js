import axios from 'axios'
import { getMarkdownFile } from './files'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: process.env.VUE_APP_API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
        }
        return Promise.reject(error)
    }
)

export default api

// Экспортируем API для заметок
export const notesApi = {
    // Получить все публичные заметки
    getPublicNotes: () => api.get('/notes'),

    // Создать новую заметку
    createNote: (data) => {
        const { title, description, category, userId, isPublic, text } = data;
        return api.post('/notes', { text }, {
            params: {
                title,
                description,
                category,
                userId,
                isPublic
            }
        });
    },

    // Получить приватные заметки пользователя
    getPrivateNotes: () => api.get('/notes/private'),

    // Получить заметку по ID
    getNoteById: (id) => api.get(`/notes/${id}`),

    // Обновить заметку
    updateNote: (id, data) => {
        const { title, description, category, ...rest } = data;
        return api.put(`/notes/${id}`, rest, {
            params: {
                title,
                description,
                category
            }
        });
    },

    // Удалить заметку
    deleteNote: (id) => api.delete(`/notes/${id}`),

    // Поиск заметок по категории
    searchNotesByCategory: (category) => api.get('/notes/search', {
        params: { category }
    }),

    // Форматирование текста заметки
    formatNote: (data) => api.post('/notes/format', data),

    // Получить все категории
    getCategories: () => api.get('/notes/categories'),

    // Создать новую категорию
    createCategory: (name) => api.post('/notes/category', null, {
        params: { name }
    })
};

// Экспортируем API для аутентификации
export const authApi = {
    // Аутентификация через Telegram
    authTelegram: (userData) => api.post('/users/auth/telegram', userData),

    // Сохранение токена
    setToken: (token) => {
        localStorage.setItem('token', token);
    },

    // Удаление токена
    removeToken: () => {
        localStorage.removeItem('token');
    },

    // Проверка наличия токена
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Экспортируем API для работы с файлами
export const filesApi = {
    // Получить файл в формате markdown
    getMarkdownFile
};