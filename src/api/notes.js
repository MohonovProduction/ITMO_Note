import api from './index'

export default {
    getAll() {
        return api.get('/notes')
    },
    getById(id) {
        return api.get(`/notes/${id}`)
    },
    create(payload) {
        return api.post('/notes', payload)
    },
    search(params) {
        return api.get('/notes/search', { params })
    },
    delete(id) {
        return api.delete(`/notes/${id}`)
    }
}