<template>
  <div class="note-container">
    <template v-if="isLoading">
      <div class="loading-state">
        <div class="spinner"></div>
        <span>Загрузка заметки...</span>
      </div>
    </template>
    <template v-else-if="note">
      <div class="note-header">
        <h1 class="note-title">
          <span class="file-name">{{ note.title }}</span>
        </h1>
        <div class="note-meta">
          <span class="category-badge">{{ note.category }}</span>
          <span class="date">Обновлено: {{ formattedDate }}</span>
        </div>
      </div>
      <div class="markdown-content" v-html="compiledMarkdown"></div>
    </template>
    <template v-else>
      <div class="error-state">
        <i class="error-icon">⚠️</i>
        <span>Заметка не найдена</span>
      </div>
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

        const response = await axios.get(process.env.VUE_APP_ROOT_URL + this.note.file, {
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
.note-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.note-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color, #eaeaea);
}

.note-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary, #2c3e50);
}

.file-name {
  font-family: 'Fira Code', 'Courier New', monospace;
  background-color: var(--code-bg, #f8f9fa);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: var(--code-color, #d63384);
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary, #666);
}

.category-badge {
  background-color: var(--category-bg, #e3f2fd);
  color: var(--category-color, #1976d2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.markdown-content {
  line-height: 1.6;
  color: var(--text-primary, #2c3e50);
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: var(--heading-color, #1a237e);
}

.markdown-content :deep(h2) {
  font-size: 1.75rem;
  margin: 1.75rem 0 1rem;
  color: var(--heading-color, #1a237e);
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: var(--heading-color, #1a237e);
}

.markdown-content :deep(p) {
  margin: 1rem 0;
}

.markdown-content :deep(code) {
  background-color: var(--code-bg, #f8f9fa);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--code-color, #d63384);
}

.markdown-content :deep(pre) {
  background-color: var(--code-block-bg, #f8f9fa);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--border-color, #eaeaea);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--text-secondary, #666);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--text-secondary, #666);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color, #eaeaea);
  border-top-color: var(--primary-color, #1976d2);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--error-color, #dc3545);
}

.error-icon {
  font-size: 2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>