<template>
  <div class="container">
    <template v-if="isLoading">
      <div class="loading">Loading note...</div>
    </template>
    <template v-else-if="note">
      <h1><code>File_name.md &#171;{{ note.title }}&#187;</code></h1>
      <div class="markdown-content" v-html="compiledMarkdown"></div>
      <div class="note-meta">
        <span class="category">Category: {{ note.category }}</span>
        <span class="date">Last updated: {{ formattedDate }}</span>
      </div>
    </template>
    <template v-else>
      <div class="error">Note not found</div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { marked } from 'marked'
import axios from "axios";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      markdownContent: '',
      markedInstance: marked
    }
  },

  computed: {
    ...mapGetters('notes', ['currentNote', 'isLoading']),

    note() {
      return this.currentNote
    },

    compiledMarkdown() {
      if (!this.markdownContent) return ''

      // Crunch: Egor otdavay normy failes
      const regex = /```markdown/g;
      const text = this.markdownContent.replace(regex, '')
      console.log('text', text)
      // Crunch off

      return this.markedInstance.parse(text)
    },

    formattedDate() {
      return this.note ? new Date(this.note.date).toLocaleString() : ''
    }
  },

  watch: {
    id: {
      immediate: true,
      handler() {
        this.fetchNoteData()
      }
    }
  },

  created() {
    this.initMarked()
  },

  methods: {
    ...mapActions('notes', ['fetchNoteById']),

    initMarked() {
      this.markedInstance.setOptions({
        sanitize: true,
        breaks: true,
        gfm: true,
        highlight(code) {
          return code // Можно добавить highlight.js
        }
      })
    },

    async fetchNoteData() {
      try {
        await this.fetchNoteById(this.id)

        if (this.note?.file) {
          await this.loadMarkdownContent()
        }
      } catch (error) {
        console.error('Error loading note:', error)
        this.markdownContent = `# Error\n${error.message}`
      }
    },

    async loadMarkdownContent() {
      try {
        console.log('Loading markdown from:', this.note.file);

        const response = await axios.get( 'http://185.72.145.216:5000' /*process.env.VUE_APP_ROOT_URL*/ + this.note.file, {
          responseType: 'text', // Указываем, что ожидаем текстовый ответ
          transformResponse: [data => data], // Отключаем автоматическое преобразование JSON
          validateStatus: status => status === 200 // Только статус 200 считается успешным
        });

        console.log(response)

        this.markdownContent = response.data;
      } catch (error) {
        console.error('Markdown load error:', error);
        this.markdownContent = `# Error loading content\n${
            error.response?.statusText || error.message
        }`;
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
}

h1 {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #d63384;
}

.markdown-content {
  margin-bottom: 2rem;
}

.note-meta {
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
}

.loading {
  color: #666;
}

.error {
  color: #dc3545;
}
</style>