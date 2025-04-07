import { notesApi } from '../../api';

const state = {
    notes: [],
    categories: [],
    currentNote: null,
    loading: false,
    error: null
};

const getters = {
    allNotes: state => state.notes,
    publicNotes: state => state.notes.filter(note => note.isPublic),
    privateNotes: state => state.notes.filter(note => !note.isPublic),
    categories: state => state.categories,
    currentNote: state => state.currentNote,
    isLoading: state => state.loading,
    error: state => state.error
};

const mutations = {
    SET_NOTES(state, notes) {
        state.notes = notes || [];
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories || [];
    },
    SET_CURRENT_NOTE(state, note) {
        state.currentNote = note;
    },
    ADD_NOTE(state, note) {
        state.notes.push(note);
    },
    UPDATE_NOTE(state, updatedNote) {
        const index = state.notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            state.notes.splice(index, 1, updatedNote);
        }
    },
    DELETE_NOTE(state, id) {
        state.notes = state.notes.filter(note => note.id !== id);
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchPublicNotes({ commit }) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.getPublicNotes();
            commit('SET_NOTES', response);
        } catch (error) {
            commit('SET_ERROR', error.message);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchPrivateNotes({ commit }) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.getPrivateNotes();
            commit('SET_NOTES', response);
        } catch (error) {
            commit('SET_ERROR', error.message);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchNoteById({ commit }, id) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.getNoteById(id);
            console.log('response', response)
            commit('SET_CURRENT_NOTE', response);
        } catch (error) {
            commit('SET_ERROR', error.message);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async createNote({ commit }, noteData) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.createNote(noteData);
            commit('ADD_NOTE', response);
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateNote({ commit }, { id, data }) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.updateNote(id, data);
            commit('UPDATE_NOTE', response);
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteNote({ commit }, id) {
        try {
            commit('SET_LOADING', true);
            await notesApi.deleteNote(id);
            commit('DELETE_NOTE', id);
        } catch (error) {
            commit('SET_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async searchNotesByCategory({ commit }, category) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.searchNotesByCategory(category);
            commit('SET_NOTES', response);
        } catch (error) {
            commit('SET_ERROR', error.message);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchCategories({ commit }) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.getCategories();
            commit('SET_CATEGORIES', response);
        } catch (error) {
            commit('SET_ERROR', error.message);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async createCategory({ commit }, name) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.createCategory(name);
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async formatNote({ commit }, data) {
        try {
            commit('SET_LOADING', true);
            const response = await notesApi.formatNote(data);
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};