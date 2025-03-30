// store/index.js
import { createStore } from 'vuex'
import notesModule from './modules/notes'
import createPersistedState from 'vuex-persistedstate' // для сохранения состояния

export default createStore({
  modules: {
    notes: notesModule
  },
  plugins: [
    createPersistedState({
      paths: ['notes.notes'] // сохраняем только список заметок
    })
  ]
})