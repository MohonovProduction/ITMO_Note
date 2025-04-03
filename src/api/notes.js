import api from './index'

export default {
    getAll() {
        return api.get('/notes')
    },
    getById(id) {
        return api.get(`/notes/${id}`)
    },
    create(noteData) {
        return api.post('/notes', noteData)
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
    }
}