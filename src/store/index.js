// store/index.js
import { createStore } from 'vuex';
import notes from './modules/notes';
import auth from './modules/auth';
import files from './modules/files';
import ui from './modules/ui';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    notes,
    auth,
    files,
    ui
  },
  plugins: [
    createPersistedState({
      paths: ['notes.notes']
    })
  ],
});