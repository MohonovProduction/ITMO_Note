const state = {
  authModal: {
    isOpen: false,
    props: {}
  },
  notifications: []
};

const mutations = {
  SET_AUTH_MODAL_STATE(state, { isOpen, props = {} }) {
    state.authModal.isOpen = isOpen;
    state.authModal.props = props;
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push(notification);
  },
  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(n => n.id !== id);
  }
};

const actions = {
  openAuthModal({ commit }, props = {}) {
    commit('SET_AUTH_MODAL_STATE', { isOpen: true, props });
  },
  closeAuthModal({ commit }) {
    commit('SET_AUTH_MODAL_STATE', { isOpen: false });
  },
  addNotification({ commit }, { message, type = 'success', timeout = 3000 }) {
    const id = Date.now().toString();
    commit('ADD_NOTIFICATION', { id, message, type });
    
    if (timeout > 0) {
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', id);
      }, timeout);
    }
  },
  removeNotification({ commit }, id) {
    commit('REMOVE_NOTIFICATION', id);
  }
};

const getters = {
  isAuthModalOpen: state => state.authModal.isOpen,
  authModalProps: state => state.authModal.props,
  notifications: state => state.notifications
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 