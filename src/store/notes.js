import axios from "axios";

const state = {
    notes: [],
    currentNote: null,
    loading: false,
    error: null
}

const mutations = {
    SET_NOTES(state, notes) {
        state.notes = notes
    },
    SET_CURRENT_NOTE(state, note) {
        state.currentNote = note
    },
    SET_LOADING(state, isLoading) {
        state.loading = isLoading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    ADD_NOTE(state, note) {
        state.notes.unshift(note)
    },
    REMOVE_NOTE(state, id) {
        state.notes = state.notes.filter(note => note.id !== id)
    }
}

const actions = {
    async fetchNotes({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await axios.get('/GetNotes')
            commit('SET_NOTES', response.data)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchNoteById({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            const response = await axios.get(`/GetNoteById/${id}`)
            commit('SET_CURRENT_NOTE', response.data)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchNotesByCategory({ commit }, category) {
        commit('SET_LOADING', true)
        try {
            const response = await axios.get(`/GetNotesByCategory/${category}`)
            commit('SET_NOTES', response.data)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async createNote({ commit }, noteData) {
        commit('SET_LOADING', true)
        try {
            const response = await axios.post('/CreateNote', noteData)
            commit('ADD_NOTE', response.data)
            return response.data
        } catch (error) {
            commit('SET_ERROR', error.message)
            throw error
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async deleteNote({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            await axios.delete(`/DeleteNoteById/${id}`)
            commit('REMOVE_NOTE', id)
        } catch (error) {
            commit('SET_ERROR', error.message)
            throw error
        } finally {
            commit('SET_LOADING', false)
        }
    }
}

const getters = {
    allNotes: state => state.notes,
    currentNote: state => state.currentNote,
    isLoading: state => state.loading,
    error: state => state.error
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}