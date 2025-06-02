import api from './axios'

export const notesApi = {
    // Получить все публичные заметки
    getPublicNotes: () => api.get('/notes'),

    //  Создать новую заметку
    createNote: (data) => {
        const { title, description, category, userId, isPublic, text } = data;
        return api.post('/notes', text, {
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
        console.log(data)
        const { title, description, category, text } = data;
        return api.put(`/notes/${id}`, text, {
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
}
