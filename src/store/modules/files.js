import { filesApi } from '../../api/files';

const state = {
    currentFile: null,
    loading: false,
    error: null
};

const getters = {
    currentFile: state => state.currentFile,
    isLoading: state => state.loading,
    error: state => state.error
};

const mutations = {
    SET_CURRENT_FILE(state, content) {
        state.currentFile = content;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchMarkdownFile({ commit }, filePath) {
        try {
            commit('SET_LOADING', true);
            const response = await filesApi.getMarkdownFile(filePath);
            commit('SET_CURRENT_FILE', response);
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