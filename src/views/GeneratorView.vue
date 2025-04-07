<template>
  <div class="generator-container">
    <Notification ref="notification" />
    <h1>Запись конпсекта</h1>

    <!-- Telegram авторизация -->
    <AuthModal
      :is-open="isAuthModalOpen"
      @close="handleAuthClose"
      @success="handleAuthSuccess"
    />

    <!-- Основной контент -->
    <div v-if="isAuthenticated" class="content-section">

      <!-- Секция с метаданными -->
      <div class="metadata-section">
        <TextField
          id="title"
          label="Заголовок:"
          v-model="title"
          placeholder="Введите заголовок"
        />
        <TextField
          id="description"
          label="Описание:"
          v-model="description"
          placeholder="Введите описание"
        />
        <SelectField
          id="category"
          label="Категория:"
          v-model="category"
          :options="categoryOptions"
          :is-loading="isLoadingCategories"
        />
      </div>

      <!-- Секция с промптом -->
      <div class="prompt-section">
        <TextAreaField
            id="prompt"
            label="Промпт:"
            v-model="prompt"
            placeholder="Введите промпт для форматирования текста"
        />
        <BaseButton @click="formatText" class="format-button">
          Форматировать
        </BaseButton>
      </div>

      <!-- Секция с текстом -->
      <div class="text-section">
        <TextAreaField
          id="content"
          label="Текст:"
          v-model="content"
          placeholder="Введите или вставьте текст для форматирования"
        />
      </div>

      <!-- Кнопки действий -->
      <div class="button-group">
        <SubmitButton 
          :is-submitting="isSubmitting"
          text="Сохранить"
          @click="saveContent"
        />
        <ClearButton @click="clearForm" />
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/atoms/Notification.vue';
import BaseButton from '@/components/atoms/BaseButton.vue'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import ClearButton from '@/components/atoms/ClearButton.vue'
import TextField from '@/components/atoms/TextField.vue'
import SelectField from '@/components/atoms/SelectField.vue'
import TextAreaField from '@/components/atoms/TextAreaField.vue'
import notesApi from '@/api/notes'
import AuthModal from '@/components/molecules/AuthModal.vue'
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'GeneratorView',
  components: {
    Notification,
    BaseButton,
    SubmitButton,
    ClearButton,
    TextField,
    SelectField,
    TextAreaField,
    AuthModal
  },
  data() {
    return {
      isAuthModalOpen: false,
      isSubmitting: false,
      prompt: '',
      content: '',
      title: '',
      description: '',
      category: '',
      categoryOptions: [],
      isLoadingCategories: false,
      generatedText: '',
      isGenerating: false
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
      this.saveToStorage('prompt', newValue);
    },
    content(newValue) {
      this.saveToStorage('content', newValue);
    },
    title(newValue) {
      this.saveToStorage('title', newValue);
    },
    description(newValue) {
      this.saveToStorage('description', newValue);
    },
    category(newValue) {
      this.saveToStorage('category', newValue);
    }
  },
  methods: {
    ...mapActions('notes', ['createNote', 'formatNote', 'fetchCategories']),
    
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      this.isAuthModalOpen = !(token && user);
      if (this.isAuthenticated) {
        this.loadCategories();
      }
    },
    saveToStorage(key, value) {
      localStorage.setItem(`generator_${key}`, value);
    },
    loadFromStorage(key) {
      return localStorage.getItem(`generator_${key}`);
    },
    clearStorage() {
      localStorage.removeItem('generator_prompt');
      localStorage.removeItem('generator_content');
      localStorage.removeItem('generator_title');
      localStorage.removeItem('generator_description');
      localStorage.removeItem('generator_category');
    },
    transformTelegramUser(user) {
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        authDate: user.auth_date,
        hash: user.hash
      };
    },
    telegramLoadedCallbackFunc(user) {
      // Логика перенесена в AuthModal
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
    async yourCallbackFunction(user) {
      // Логика перенесена в AuthModal
    },
    async formatText() {
      if (!this.content.trim()) {
        this.$refs.notification.addNotification('Пожалуйста, введите текст', 'error');
        return;
      }

      try {
        const response = await this.formatNote({
          text: this.content,
          prompt: this.prompt
        });
        this.content = response;
        console.log(response);
        this.$refs.notification.addNotification('Текст успешно отформатирован', 'success');
      } catch (error) {
        console.error('Ошибка при форматировании:', error);
        this.$refs.notification.addNotification('Ошибка при форматировании', 'error');
      }
    },
    async saveContent() {
      if (!this.content.trim()) {
        this.$refs.notification.addNotification('Пожалуйста, введите текст', 'error');
        return;
      }

      if (this.isSubmitting) {
        return; // Предотвращаем повторную отправку
      }

      this.isSubmitting = true;
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const noteData = {
          title: this.title || 'Без названия',
          description: this.description || 'Без описания',
          category: this.category || 'Без категории',
          userId: user.id,
          text: this.content
        };
        
        await this.createNote(noteData);
        this.$refs.notification.addNotification('Текст успешно сохранен', 'success');
        this.clearForm();
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        this.$refs.notification.addNotification('Ошибка при сохранении', 'error');
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
      this.clearStorage();
    },
    handleAuthClose() {
      this.isAuthModalOpen = false;
    },
    handleAuthSuccess() {
      this.isAuthModalOpen = false;
      this.loadCategories();
    },
    async handleGenerate() {
      if (!this.isAuthenticated) {
        this.isAuthModalOpen = true;
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
        this.isAuthModalOpen = true;
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