import notesApi from '@/api/notes'

export default {
    namespaced: true,

    state: () => ({
        notes: [],
        currentNote: null,
        loading: false,
        error: null
    }),

    getters: {
        allNotes: state => state.notes,
        currentNote: state => state.currentNote,
        isLoading: state => state.loading,
        getError: state => state.error,
        getCategories: state => [...new Set(state.notes.map(note => note.category))]
    },

    mutations: {
        SET_NOTES(state, notes) {
            state.notes = notes
        },
        SET_CURRENT_NOTE(state, note) {
            state.currentNote = note
        },
        SET_LOADING(state, value) {
            state.loading = value
        },
        SET_ERROR(state, error) {
            state.error = error
        }
    },

    actions: {
        async fetchAllNotes({ commit }) {
            commit('SET_LOADING', true)
            try {
                const notes = await notesApi.getAll()
                commit('SET_NOTES', notes)
            } catch (error) {
                commit('SET_ERROR', error.message)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async fetchNoteById({ commit }, id) {
            commit('SET_LOADING', true)
            try {
                const response = await notesApi.getById(id)
                commit('SET_CURRENT_NOTE', response)
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            } finally {
                commit('SET_LOADING', false)
            }
        }
    }
}