const state = {
  authModal: {
    isOpen: false,
    props: {}
  },
  slideOutMenu: {
    isOpen: false
  },
  slideOutGenerator: {
    isOpen: false
  },
  notifications: []
};

const mutations = {
  SET_AUTH_MODAL_STATE(state, { isOpen, props = {} }) {
    state.authModal.isOpen = isOpen;
    state.authModal.props = props;
  },
  SET_SLIDE_OUT_MENU_STATE(state, isOpen) {
    state.slideOutMenu.isOpen = isOpen;
  },
  SET_SLIDE_OUT_GENERATOR_STATE(state, isOpen) {
    state.slideOutGenerator.isOpen = isOpen;
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push(notification);
  },
  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(n => n.id !== id);
  },
  CLEAR_NOTIFICATIONS(state) {
    state.notifications = [];
  }
};

const actions = {
  openAuthModal({ commit }, props = {}) {
    commit('SET_AUTH_MODAL_STATE', { isOpen: true, props });
  },
  closeAuthModal({ commit }) {
    commit('SET_AUTH_MODAL_STATE', { isOpen: false });
  },
  openSlideOutMenu({ commit }) {
    commit('SET_SLIDE_OUT_MENU_STATE', true);
  },
  closeSlideOutMenu({ commit }) {
    commit('SET_SLIDE_OUT_MENU_STATE', false);
  },
  toggleSlideOutMenu({ commit, state }) {
    commit('SET_SLIDE_OUT_MENU_STATE', !state.slideOutMenu.isOpen);
  },
  openSlideOutGenerator({ commit }) {
    commit('SET_SLIDE_OUT_GENERATOR_STATE', true);
  },
  closeSlideOutGenerator({ commit }) {
    commit('SET_SLIDE_OUT_GENERATOR_STATE', false);
  },
  toggleSlideOutGenerator({ commit, state }) {
    commit('SET_SLIDE_OUT_GENERATOR_STATE', !state.slideOutGenerator.isOpen);
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
  },
  clearNotifications({ commit }) {
    commit('CLEAR_NOTIFICATIONS');
  }
};

const getters = {
  isAuthModalOpen: state => state.authModal.isOpen,
  authModalProps: state => state.authModal.props,
  isSlideOutMenuOpen: state => state.slideOutMenu.isOpen,
  isSlideOutGeneratorOpen: state => state.slideOutGenerator.isOpen,
  notifications: state => state.notifications
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 