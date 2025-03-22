import { createStore } from 'vuex'
import notesMetadata from '@/markdown/index.json';
import marked from "marked";

export default createStore({
  state: {
    notes: [],
  },
  getters: {
    allNotes: state => state.notes
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    loadNotes({ commit }) {
      const notes = notesMetadata.map(note => {
        const content = require(`@/markdown/${note.file}`).default;
        return {
          ...note,
          content
        };
      });
      commit('SET_NOTES', notes);
    }
  },
  modules: {
  }
})
