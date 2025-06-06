<template>
  <div class="generator-container">
    <h1>Запись конпсекта</h1>

    <!-- Основной контент -->
    <div v-if="isAuthenticated" class="content-section">

      <!-- Секция с метаданными -->
      <div class="metadata-section">
        <TextField
          id="title"
          label="Заголовок:"
          v-model="title"
          placeholder="Введите заголовок"
          :error="errors.title"
        >
          <template #button>
            <BaseButton @click="handleTitleMagic" icon="wand_stars" iconOnly />
          </template>
        </TextField>
        <TextField
          id="description"
          label="Описание:"
          v-model="description"
          placeholder="Введите описание"
          :error="errors.description"
        >
          <template #button>
            <BaseButton @click="handleDescriptionMagic" icon="wand_stars" iconOnly />
          </template>
        </TextField>
        <SelectField
          id="category"
          label="Категория:"
          v-model="category"
          :options="categoryOptions"
          :is-loading="isLoadingCategories"
          :error="errors.category"
        />
        <div class="checkbox-field">
          <input
            type="checkbox"
            id="isPublic"
            v-model="isPublic"
          />
          <label for="isPublic">Сделать публичным</label>
        </div>
      </div>

      <!-- Секция с промптом -->
      <div class="prompt-section">
        <TextAreaField
          id="prompt"
          label="Промпт:"
          v-model="prompt"
          placeholder="Введите промпт для форматирования текста"
          :error="errors.prompt"
        />
        <BaseButton @click="formatText" class="format-button" icon="wand_stars" iconOnly />
      </div>

      <!-- Секция с текстом -->
      <div class="text-section">
        <TextAreaField
          id="content"
          label="Текст:"
          v-model="content"
          placeholder="Введите или вставьте текст для форматирования"
          :error="errors.content"
        />
      </div>

      <!-- Кнопки действий -->
      <div class="button-group">
        <SubmitButton 
          :is-submitting="isSubmitting"
          text="Сохранить"
          icon="save"
          @click="saveContent"
        />
        <BaseButton variant="clear" @click="clearForm" icon="delete">Очистить форму</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/BaseButton.vue'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import TextField from '@/components/atoms/TextField.vue'
import SelectField from '@/components/atoms/SelectField.vue'
import TextAreaField from '@/components/atoms/TextAreaField.vue'
import notesApi from '@/api/notes'
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'GeneratorView',
  components: {
    BaseButton,
    SubmitButton,
    TextField,
    SelectField,
    TextAreaField
  },
  data() {
    return {
      isSubmitting: false,
      prompt: this.loadFromStorage()?.prompt || '',
      content: this.loadFromStorage()?.content || '',
      title: this.loadFromStorage()?.title || '',
      description: this.loadFromStorage()?.description || '',
      category: this.loadFromStorage()?.category || '',
      isPublic: this.loadFromStorage()?.isPublic || false,
      categoryOptions: [],
      isLoadingCategories: false,
      generatedText: '',
      isGenerating: false,
      errors: {
        title: '',
        description: '',
        category: '',
        content: '',
        prompt: ''
      }
    };
  },
  computed: {
    ...mapState('notes', ['loading']),
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('notes', ['categories'])
  },
  created() {
    this.checkAuth();
  },
  watch: {
    prompt(newValue) {
      this.saveToStorage();
      if (this.errors.prompt) {
        this.errors.prompt = '';
      }
    },
    content(newValue) {
      this.saveToStorage();
      if (this.errors.content) {
        this.errors.content = '';
      }
    },
    title(newValue) {
      this.saveToStorage();
      if (this.errors.title) {
        this.errors.title = '';
      }
    },
    description(newValue) {
      this.saveToStorage();
      if (this.errors.description) {
        this.errors.description = '';
      }
    },
    category(newValue) {
      this.saveToStorage();
      if (this.errors.category) {
        this.errors.category = '';
      }
    },
    isPublic(newValue) {
      this.saveToStorage();
    }
  },
  methods: {
    ...mapActions('notes', ['createNote', 'formatNote', 'fetchCategories']),
    ...mapActions('ui', ['openAuthModal', 'closeAuthModal', 'addNotification']),
    
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (!(token && user)) {
        this.openAuthModal();
      } else if (this.isAuthenticated) {
        this.loadCategories();
      }
    },
    saveToStorage() {
      const data = {
        prompt: this.prompt,
        content: this.content,
        title: this.title,
        description: this.description,
        category: this.category,
        isPublic: this.isPublic
      };
      localStorage.setItem('generator_data', JSON.stringify(data));
    },
    loadFromStorage() {
      const data = localStorage.getItem('generator_data');
      return data ? JSON.parse(data) : null;
    },
    clearStorage() {
      localStorage.removeItem('generator_data');
    },
    async loadCategories() {
      try {
        this.isLoadingCategories = true;
        await this.fetchCategories();
        this.categoryOptions = this.categories.map(category => ({
          value: category.name,
          label: category.name
        }));
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      } finally {
        this.isLoadingCategories = false;
      }
    },
    async formatText() {
      if (!this.prompt.trim()) {
        this.errors.prompt = 'Промпт обязателен';
        return;
      }

      if (!this.content.trim()) {
        this.errors.content = 'Текст обязателен';
        return;
      }

      try {
        const response = await this.formatNote({
          text: this.content,
          prompt: this.prompt
        });
        this.content = response;
        this.addNotification({ message: 'Текст успешно отформатирован', type: 'success' });
      } catch (error) {
        console.error('Ошибка при форматировании:', error);
        this.addNotification({ message: 'Ошибка при форматировании', type: 'error' });
      }
    },
    validateForm() {
      this.errors = {
        title: '',
        description: '',
        category: '',
        content: '',
        prompt: ''
      };

      let isValid = true;

      if (!this.title.trim()) {
        this.errors.title = 'Заголовок обязателен';
        isValid = false;
      }

      if (!this.description.trim()) {
        this.errors.description = 'Описание обязательно';
        isValid = false;
      }

      if (!this.category) {
        this.errors.category = 'Категория обязательна';
        isValid = false;
      }

      if (!this.content.trim()) {
        this.errors.content = 'Текст обязателен';
        isValid = false;
      }

      return isValid;
    },
    async saveContent() {
      if (!this.validateForm()) {
        return;
      }

      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const noteData = {
          title: this.title.trim(),
          description: this.description.trim(),
          category: String(this.category),
          userId: user.id,
          isPublic: Boolean(this.isPublic),
          text: String(this.content.trim())
        };

        await this.createNote(noteData);
        this.addNotification({ message: 'Текст успешно сохранен', type: 'success' });
        this.clearForm();
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        this.addNotification({ message: 'Ошибка при сохранении', type: 'error' });
      } finally {
        this.isSubmitting = false;
      }
    },
    clearForm() {
      this.prompt = '';
      this.content = '';
      this.title = '';
      this.description = '';
      this.category = '';
      this.isPublic = false;
      this.clearStorage();
    },
    handleAuthClose() {
      this.closeAuthModal();
    },
    handleAuthSuccess() {
      this.closeAuthModal();
      this.loadCategories();
    },
    async handleGenerate() {
      if (!this.isAuthenticated) {
        this.openAuthModal();
        return;
      }
      
      this.isSubmitting = true;
      try {
        const response = await this.formatNote({
          text: this.content,
          prompt: this.prompt
        });
        this.content = response;
      } catch (error) {
        console.error('Ошибка при генерации текста:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async handleSave() {
      if (!this.isAuthenticated) {
        this.openAuthModal();
        return;
      }
      
      this.isSubmitting = true;
      try {
        const noteData = {
          title: 'Сгенерированная заметка',
          description: 'Заметка, созданная с помощью генератора',
          category: this.category,
          userId: 0,
          isPublic: false,
          text: this.content
        };
        
        await this.createNote(noteData);
        this.clearForm();
      } catch (error) {
        console.error('Ошибка при сохранении заметки:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    handleTitleMagic() {
      if (!this.content) {
        this.addNotification({ message: 'В тексте должен быть заголовок перового уровня', type: 'error' });
        return;
      }

      const h1Match = this.content.match(/^#\s+(.+)$/m);
      
      if (h1Match && h1Match[1]) {
        this.title = h1Match[1].trim();
        this.addNotification({ message: 'Заголовок успешно извлечен', type: 'success' });
      } else {
        this.addNotification({ message: 'Заголовок первого уровня не найден', type: 'warning' });
      }
    },
    handleDescriptionMagic() {
      if (!this.content) {
        this.addNotification({ message: 'В поле Текст нет текста', type: 'error' });
        return;
      }

      // Удаляем заголовки (строки, начинающиеся с #)
      let textWithoutHeaders = this.content.replace(/^#+\s+.+$/gm, '');
      
      // Удаляем markdown форматирование
      textWithoutHeaders = textWithoutHeaders
        .replace(/\*\*(.*?)\*\*/g, '$1') // жирный текст
        .replace(/\*(.*?)\*/g, '$1')     // курсив
        .replace(/`(.*?)`/g, '$1')       // код
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // ссылки
        .replace(/^\s*[-*+]\s+/gm, '')   // маркированные списки
        .replace(/^\s*\d+\.\s+/gm, '')   // нумерованные списки
        .trim();

      if (textWithoutHeaders) {
        // Берем первые 100 символов и добавляем многоточие, если текст был обрезан
        this.description = textWithoutHeaders.length > 100 
          ? textWithoutHeaders.substring(0, 100) + '...'
          : textWithoutHeaders;
        this.addNotification({ message: 'Описание успешно извлечено', type: 'success' });
      } else {
        this.addNotification({ message: 'Не удалось извлечь описание', type: 'warning' });
      }
    }
  }
};
</script>

<style scoped>
.generator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

h1 {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-6);
  text-align: center;
}

h2 {
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-4);
  text-align: center;
}

.auth-section {
  text-align: center;
  padding: var(--spacing-8);
  background-color: var(--color-gray-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-6);
}

.auth-section p {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-4);
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.prompt-section,
.text-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

label {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

.textarea-field {
  width: 100%;
  min-height: 150px;
  padding: var(--spacing-4);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family-base);
  line-height: 1.6;
  resize: vertical;
  transition: all var(--transition-normal);
}

.textarea-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.format-button {
  align-self: flex-end;
  margin-top: var(--spacing-2);
}

.button-group {
  display: flex;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

.metadata-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.input-field {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
}

.input-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.select-field {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background-color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.select-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-top: var(--spacing-2);
}

.checkbox-field input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.checkbox-field label {
  cursor: pointer;
  user-select: none;
}

@media (max-width: 768px) {
  .generator-container {
    padding: var(--spacing-4);
  }

  h1 {
    font-size: var(--font-size-2xl);
  }

  .button-group {
    flex-direction: column;
  }

  .metadata-section {
    gap: var(--spacing-3);
  }
}

@media (max-width: 480px) {
  .generator-container {
    padding: var(--spacing-3);
  }

  h1 {
    font-size: var(--font-size-xl);
  }

  .auth-section {
    padding: var(--spacing-4);
  }

  .textarea-field {
    min-height: 120px;
    padding: var(--spacing-3);
  }
}
</style>