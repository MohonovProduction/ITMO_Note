<template>
  <div class="note-container" :class="{ 'is-editing': isEditing }">
    <template v-if="isLoading">
      <StateView
        title="Загрузка конспекта"
        message="Пожалуйста, подождите..."
        animation-src="./loader_2.riv"
      />
    </template>
    <template v-else-if="error">
      <StateView
        :title="error.title"
        :message="error.message"
        animation-src="./loader_2.riv"
      />
    </template>
    <template v-else-if="note">
      <div class="note-header">
        <h1 class="note-title">
          <span class="file-name">{{ note.title }}</span>
        </h1>
        <div class="note-meta">
          <span class="category-badge">{{ note.category }}</span>
          <span class="date">Обновлено: {{ formattedDate }}</span>
          <button class="edit-button" @click="toggleEditing">
            <span class="button-icon">{{ isEditing ? '✓' : '✎' }}</span>
            {{ isEditing ? 'Сохранить' : 'Редактировать' }}
          </button>
        </div>
      </div>
      
      <div class="note-content">
        <div class="editor-column" :class="{ 'is-active': isEditing }">
          <textarea
            v-model="markdownContent"
            class="markdown-editor"
            placeholder="Введите текст в формате Markdown..."
            @input="handleContentChange"
          ></textarea>
        </div>
        <div class="preview-column">
          <div class="markdown-content" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <StateView
        title="Конспект не найден"
        message="К сожалению, запрашиваемый конспект не существует или был удален"
        animation-src="./loader_2.riv"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { marked } from 'marked'
import axios from "axios"
import StateView from '@/components/molecules/StateView.vue'
import debounce from 'lodash/debounce'

export default {
  name: 'NoteView',
  components: {
    StateView
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      markdownContent: '',
      markedInstance: marked,
      error: null,
      isEditing: false,
      hasUnsavedChanges: false
    }
  },

  computed: {
    ...mapGetters('notes', ['currentNote', 'isLoading']),

    note() {
      return this.currentNote
    },

    compiledMarkdown() {
      if (!this.markdownContent) return ''
      return this.markedInstance.parse(this.markdownContent)
    },

    formattedDate() {
      return this.note ? new Date(this.note.date).toLocaleString() : ''
    }
  },

  watch: {
    id: {
      immediate: true,
      handler() {
        this.error = null
        this.fetchNoteData()
      }
    }
  },

  created() {
    this.initMarked()
    this.saveDraft = debounce(this._saveDraft, 500)
  },

  methods: {
    ...mapActions('notes', ['fetchNoteById', 'updateNote']),

    initMarked() {
      this.markedInstance.setOptions({
        sanitize: true,
        breaks: true,
        gfm: true,
        highlight(code) {
          return code
        }
      })
    },

    async fetchNoteData() {
      try {
        await this.fetchNoteById(this.id)

        if (this.note?.file) {
          await this.loadMarkdownContent()
          this.checkForDraft()
        }
      } catch (error) {
        console.error('Error loading note:', error)
        this.error = {
          title: 'Ошибка загрузки заметки',
          message: error.response?.data?.message || error.message || 'Произошла ошибка при загрузке заметки'
        }
      }
    },

    async loadMarkdownContent() {
      try {
        const response = await axios.get(process.env.VUE_APP_ROOT_URL + this.note.file, {
          responseType: 'text',
          transformResponse: [data => data],
          validateStatus: status => status === 200
        });

        this.markdownContent = response.data;
      } catch (error) {
        console.error('Markdown load error:', error);
        this.error = {
          title: 'Ошибка загрузки содержимого',
          message: error.response?.statusText || error.message || 'Произошла ошибка при загрузке содержимого заметки'
        }
      }
    },

    checkForDraft() {
      const draft = localStorage.getItem(`draftNote_${this.id}`)
      if (draft) {
        if (confirm('Найден черновик. Восстановить его?')) {
          this.markdownContent = draft
          this.hasUnsavedChanges = true
        }
      }
    },

    handleContentChange() {
      this.hasUnsavedChanges = true
      this.saveDraft()
    },

    _saveDraft() {
      localStorage.setItem(`draftNote_${this.id}`, this.markdownContent)
    },

    async toggleEditing() {
      if (this.isEditing) {
        try {
          await this.updateNote({
            id: this.id,
            content: this.markdownContent
          })
          localStorage.removeItem(`draftNote_${this.id}`)
          this.hasUnsavedChanges = false
        } catch (error) {
          console.error('Error saving note:', error)
          alert('Ошибка при сохранении заметки')
          return
        }
      }
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style scoped>
.note-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  transition: all 0.3s ease;
}

.note-container.is-editing {
  max-width: 100%;
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

.edit-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color, #1976d2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: var(--primary-color-dark, #1565c0);
}

.button-icon {
  font-size: 1.2rem;
}

.note-content {
  display: flex;
  gap: 2rem;
  min-height: 500px;
}

.editor-column {
  flex: 0 0 0;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-origin: left;
  transform: scaleX(0);
}

.editor-column.is-active {
  flex: 0 0 50%;
  transform: scaleX(1);
}

.preview-column {
  flex: 1;
  min-width: 0;
}

.markdown-editor {
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 1rem;
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  background-color: var(--editor-bg, #f8f9fa);
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

@media (max-width: 768px) {
  .note-container {
    padding: 0 1rem;
  }

  .note-title {
    font-size: 1.25rem;
  }

  .note-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .note-content {
    flex-direction: column;
  }

  .editor-column.is-active {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>