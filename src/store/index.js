import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: [],
    currentNote: null
  },
  getters: {
    allNotes: state => state.notes,
    currentNote: state => state.currentNote
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    SET_CURRENT_NOTE(state, note) {
      state.currentNote = note
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      const response = await fetch('/api/GetNotes')
      const notes = await response.json()
      commit('SET_NOTES', notes)
    },
    async fetchNoteById({ commit }, id) {
      const response = await fetch(`/api/GetNoteById?id=${id}`)
      const note = await response.json()
      commit('SET_CURRENT_NOTE', note[0]) // так как API возвращает массив
    },
    async fetchNotesByCategory({ commit }, category) {
      const response = await fetch(`/api/GetNotesByCategory?category=${category}`)
      const notes = await response.json()
      commit('SET_NOTES', notes)
    }
  },
  modules: {
  }
})
