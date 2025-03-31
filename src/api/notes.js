import api from './index'

export default {
    getAll() {
        return api.get('/notes')
    },
    getById(id) {
        return api.get(`/notes/${id}`)
    },
    create(payload, config) {
        return api.post('/notes', payload, config)
    },
    search(params) {
        return api.get('/notes/search', { params })
    },
    delete(id) {
        return api.delete(`/notes/${id}`)
    }
}