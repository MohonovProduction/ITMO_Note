import api from './index'

export default {
    getAll() {
        return api.get('/notes')
    },
    getById(id) {
        return api.get(`/notes/${id}`)
    },
    create({ title, description, category, userId, text }) {
        return api.post('/notes', JSON.stringify(text), {
            params: {
                title,
                description,
                category,
                userId
            }
        })
    },
    update(id, noteData) {
        return api.put(`/notes/${id}`, noteData)
    },
    delete(id) {
        return api.delete(`/notes/${id}`)
    },
    search(params) {
        return api.get('/notes/search', { params })
    },
    format(text, prompt) {
        return api.post('/notes/format', { text, prompt })
    },
    authTelegram(userData) {
        return api.post('/users/auth/telegram', userData)
    },
    async getCategories() {
        const response = await this.getAll();
        const categories = new Set(response.map(note => note.category));
        return Array.from(categories).map(category => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1)
        }));
    }
}