<template>
  <div class="note-container" :class="{ 'is-editing': isEditing }">
    <template v-if="isLoading">
      <StateView
        title="Загрузка конспекта"
        message="Пожалуйста, подождите..."
        animation-src="/assets/animations/loader_2.riv"
      />
    </template>
    <template v-else-if="error">
      <StateView
        :title="error.title"Я
        :message="error.message"
        animation-src="/assets/animations/loader_2.riv"
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
          <template v-if="isAuthenticated">
            <BaseButton
              v-if="!isEditing"
              variant="outline"
              size="medium"
              icon="edit"
              :disabled="!isAuthenticated"
              @click="toggleEditing"
              iconOnly
            />
            <template v-else>
              <BaseButton
                variant="primary"
                size="medium"
                icon="save"
                :disabled="!isAuthenticated"
                @click="toggleEditing"
                iconOnly
              />
              <BaseButton
                variant="outline"
                size="medium"
                icon="undo"
                :disabled="!isAuthenticated"
                @click="clearForm"
                iconOnly
              />
            </template>
          </template>
          <span v-else class="auth-message">
            <a href="#" class="auth-link" @click.prevent="this.openAuthModal()">Авторизуйтесь</a> для редактирования
          </span>
        </div>
      </div>

      <!-- Секция редактирования метаданных -->
      <div class="metadata-section" :class="{ 'is-active': isEditing }">
        <TextField
          id="title"
          label="Заголовок:"
          v-model="editedNote.title"
          placeholder="Введите заголовок"
        />
        <TextField
          id="description"
          label="Описание:"
          v-model="editedNote.description"
          placeholder="Введите описание"
        />
        <SelectField
          id="category"
          label="Категория:"
          v-model="editedNote.category"
          :options="categoryOptions"
          :is-loading="isLoadingCategories"
        />
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

      <div v-if="isEditing" class="button-group">
        <SubmitButton 
          :is-submitting="isSubmitting"
          text="Сохранить"
          icon="save"
          @click="saveNote"
        />
        <BaseButton variant="clear" @click="clearForm" icon="delete">Очистить форму</BaseButton>
      </div>
    </template>
    <template v-else>
      <StateView
        title="Конспект не найден"
        message="К сожалению, запрашиваемый конспект не существует или был удален"
        animation-src="/assets/animations/loader_2.riv"
      />
    </template>

    <Modal
      :show="showDraftModal"
      title="Восстановить черновик?"
      @close="handleDraftModalClose"
    >
      <div class="draft-modal-content">
        <p>Найден черновик этой заметки. Хотите восстановить его?</p>
        <div class="draft-modal-buttons">
          <BaseButton
            variant="secondary"
            size="medium"
            class="draft-modal-button"
            @click="handleDraftModalClose"
          >
            Отмена
          </BaseButton>
          <BaseButton
            variant="primary"
            size="medium"
            class="draft-modal-button"
            @click="handleDraftRestore"
          >
            Восстановить
          </BaseButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { marked } from 'marked'
import StateView from '@/components/molecules/StateView.vue'
import Modal from '@/components/molecules/Modal.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import debounce from 'lodash/debounce'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import TextField from '@/components/atoms/TextField.vue'
import SelectField from '@/components/atoms/SelectField.vue'

export default {
  name: 'NoteView',
  components: {
    StateView,
    Modal,
    BaseButton,
    SubmitButton,
    TextField,
    SelectField
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
      hasUnsavedChanges: false,
      showDraftModal: false,
      draftContent: '',
      editedNote: {
        title: '',
        description: '',
        category: '',
        text: ''
      },
      isSubmitting: false,
      categoryOptions: [],
      isLoadingCategories: false
    }
  },

  computed: {
    ...mapState('notes', ['loading']),
    ...mapGetters('notes', ['currentNote', 'categories']),
    ...mapGetters('auth', ['isAuthenticated']),

    isLoading() {
      return this.loading
    },

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
    this.fetchNoteData()
  },

  methods: {
    ...mapActions('notes', [
      'fetchNoteById',
      'updateNote',
      'deleteNote',
      'formatNote'
    ]),
    ...mapActions('files', [
      'fetchMarkdownFile'
    ]),
    ...mapActions('ui', [
      'addNotification',
      'openAuthModal',
      'closeAuthModal'
    ]),

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
        
        if (!this.currentNote) {
          this.error = {
            title: 'Конспект не найден',
            message: 'Запрашиваемый конспект не существует или был удален'
          }
          return
        }

        if (this.currentNote?.file) {
          const fileContent = await this.fetchMarkdownFile(this.currentNote.file)
          console.log('fileContent', fileContent)
          this.markdownContent = fileContent
          this.checkForDraft()
        }

        this.editedNote = {
          title: this.currentNote.title || '',
          description: this.currentNote.description || '',
          category: this.currentNote.category || '',
          text: this.currentNote.text || ''
        }

        this.categoryOptions = this.categories.map(category => ({
          value: category.id,
          label: category.name
        }))
      } catch (error) {
        console.error('Error fetching note data:', error)
        this.error = {
          title: 'Ошибка загрузки заметки',
          message: error.response?.data?.message || error.message || 'Произошла ошибка при загрузке заметки'
        }
      }
    },

    checkForDraft() {
      const draft = localStorage.getItem(`draftNote_${this.id}`)
      if (draft) {
        this.draftContent = draft
        this.showDraftModal = true
      }
    },

    handleContentChange() {
      this.hasUnsavedChanges = true
      this.saveDraft()
    },

    _saveDraft() {
      localStorage.setItem(`draftNote_${this.id}`, this.markdownContent)
    },

    async toggleEditing(shouldSave = true) {
      if (!this.isAuthenticated) {
        this.openAuthModal()
        return
      }

      if (this.isEditing && shouldSave) {
        try {
          await this.updateNote({
            id: this.id,
            data: this.editedNote
          })
          localStorage.removeItem(`draftNote_${this.id}`)
          this.hasUnsavedChanges = false
          this.addNotification({ message: 'Заметка успешно сохранена', type: 'success' })
        } catch (error) {
          console.error('Error saving note:', error)
          this.addNotification({ 
            message: error.response?.data?.message || error.message || 'Произошла ошибка при сохранении заметки', 
            type: 'error' 
          })
          return
        }
      }
      this.isEditing = !this.isEditing
    },

    handleDraftModalClose() {
      this.showDraftModal = false
      this.draftContent = ''
    },

    handleDraftRestore() {
      this.markdownContent = this.draftContent
      this.hasUnsavedChanges = true
      this.showDraftModal = false
      this.draftContent = ''

      this.toggleEditing(false)
    },

    checkAuth() {
      return this.isAuthenticated
    },

    handleAuthSuccess() {
      this.closeAuthModal()
      this.startEditing()
    },

    handleAuthClose() {
      this.closeAuthModal()
    },

    async handleUpdate() {
      try {
        await this.updateNote({
          id: this.note.id,
          data: this.editedNote
        });
        this.isEditing = false;
      } catch (error) {
        console.error('Ошибка при обновлении заметки:', error);
      }
    },
    
    async handleDelete() {
      if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
        try {
          await this.deleteNote(this.note.id);
          this.$router.push('/');
        } catch (error) {
          console.error('Ошибка при удалении заметки:', error);
        }
      }
    },
    
    async handleFormat() {
      try {
        const formattedText = await this.formatNote({
          text: this.editedNote.text,
          prompt: 'Отформатируй текст'
        });
        this.editedNote.text = formattedText;
      } catch (error) {
        console.error('Ошибка при форматировании текста:', error);
      }
    },
    
    startEditing() {
      if (!this.isAuthenticated) {
        this.openAuthModal()
        return
      }
      
      this.editedNote = {
        title: this.note.title,
        description: this.note.description,
        category: this.note.category,
        text: this.note.text
      }
      this.isEditing = true
    },
    
    cancelEditing() {
      this.isEditing = false;
    },

    async saveNote() {
      this.isSubmitting = true
      try {
        await this.updateNote({
          id: this.note.id,
          data: this.editedNote
        });
        this.isEditing = false;
        this.hasUnsavedChanges = false;
        localStorage.removeItem(`draftNote_${this.id}`);
        this.addNotification({ message: 'Заметка успешно сохранена', type: 'success' })
      } catch (error) {
        console.error('Ошибка при сохранении заметки:', error);
        this.addNotification({ 
          message: error.response?.data?.message || error.message || 'Произошла ошибка при сохранении заметки', 
          type: 'error' 
        })
      } finally {
        this.isSubmitting = false;
      }
    },

    async clearForm() {
      this.isEditing = false;
      this.hasUnsavedChanges = false;
      
      if (this.note?.file) {
        const fileContent = await this.fetchMarkdownFile(this.note.file);
        this.markdownContent = fileContent;
      } else {
        this.markdownContent = '';
      }
      
      this.editedNote = {
        title: this.note?.title || '',
        description: this.note?.description || '',
        category: this.note?.category || '',
        text: this.note?.text || ''
      };
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
  gap: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.category-badge {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
}

.date {
  color: var(--color-gray-500);
}

.edit-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.cancel-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-left: var(--spacing-2);
}

.button-icon {
  font-size: var(--font-size-lg);
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

.error-modal-content {
  text-align: center;
  padding: var(--spacing-4);
}

.error-modal-button {
  margin-top: 1rem;
}

.draft-modal-content {
  text-align: center;
  padding: var(--spacing-4);
}

.draft-modal-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
}

.auth-modal-content {
  text-align: center;
  padding: var(--spacing-4);
}

.auth-message {
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
}

.auth-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-normal);
}

.auth-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
}

.metadata-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 4px;
  transition: all 0.3s ease;
  transform-origin: top;
  transform: scaleY(0);
  height: 0;
  opacity: 0;
  overflow: hidden;
  margin-bottom: 0;
}

.metadata-section.is-active {
  transform: scaleY(1);
  height: auto;
  opacity: 1;
  margin-bottom: var(--spacing-6);
}

@media (max-width: 768px) {
  .metadata-section {
    padding: var(--spacing-3);
  }
}
</style>