import { authApi } from '../../api';

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const getters = {
  isAuthenticated: state => !!state.token,
  currentUser: state => state.user,
  isLoading: state => state.loading,
  error: state => state.error
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_AUTH(state) {
    state.user = null;
    state.token = null;
  }
};

const actions = {
  async loginWithTelegram({ commit }, userData) {
    try {
      commit('SET_LOADING', true);
      const response = await authApi.authTelegram(userData);
      const { token } = response;
      
      commit('SET_TOKEN', token);
      authApi.setToken(token);
      
      return response;
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  logout({ commit }) {
    commit('CLEAR_AUTH');
    authApi.removeToken();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}; 