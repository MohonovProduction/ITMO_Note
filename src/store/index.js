// store/index.js
import { createStore } from 'vuex';
import notes from './modules/notes';
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    notes,
    auth
  },
  plugins: [
    createPersistedState({
      paths: ['notes.notes']
    })
  ],
});