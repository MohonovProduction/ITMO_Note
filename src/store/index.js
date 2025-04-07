// store/index.js
import { createStore } from 'vuex';
import notes from './modules/notes';
import auth from './modules/auth';
import files from './modules/files';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    notes,
    auth,
    files
  },
  plugins: [
    createPersistedState({
      paths: ['notes.notes']
    })
  ],
});