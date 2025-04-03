<template>
  <div class="generator-container">
    <Notification ref="notification" />
    <h1>Генератор конспектов</h1>

    <!-- Telegram авторизация -->
    <div class="auth-section" v-if="!isAuthenticated">
      <h2>Авторизация</h2>
      <p>Для использования генератора необходимо авторизоваться через Telegram</p>
      <telegramLoginTemp
        mode="callback"
        telegram-login="itmo_note_bot"
        @loaded='telegramLoadedCallbackFunc'
        @callback="yourCallbackFunction"
      />
    </div>

    <!-- Основной контент -->
    <div v-else class="content-section">
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
import { telegramLoginTemp } from "vue3-telegram-login";
import notesApi from '@/api/notes'

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
    telegramLoginTemp
  },
  data() {
    return {
      isAuthenticated: process.env.VUE_APP_BYPASS_AUTH === 'true',
      isSubmitting: false,
      prompt: this.loadFromStorage('prompt') || '',
      content: this.loadFromStorage('content') || '',
      title: this.loadFromStorage('title') || '',
      description: this.loadFromStorage('description') || '',
      category: this.loadFromStorage('category') || 'design',
      categoryOptions: [],
      isLoadingCategories: false
    };
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
  async created() {
    if (this.isAuthenticated) {
      console.log('Loading categories');
      
    }
  },
  methods: {
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
    telegramLoadedCallbackFunc(user) {
      if (process.env.VUE_APP_BYPASS_AUTH === 'false') {
        this.isAuthenticated = true;
        this.$refs.notification.addNotification('Режим разработки: авторизация пропущена', 'success');
        const user = {
          "id": 656626574,
          "firstName": "Mihail",
          "lastName": "Mohónov",
          "username": "mohonovproduction",
          "authDate": 1743683646,
          "hash": "0e7efe11ac8c39035e77bf50716003d269aa03c35911f41fc42e9b0cae15c1f6"
        }
        console.log('You in dev mode:', user);
        this.yourCallbackFunction(user);
      }
    },
    async loadCategories() {
      this.isLoadingCategories = true;
      try {
        const categories = await notesApi.getCategories();
        this.categoryOptions = [
          { value: 'custom', label: 'Другая категория...' },
          ...categories,
        ];
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        this.$refs.notification.addNotification('Ошибка при загрузке категорий', 'error');
      } finally {
        this.isLoadingCategories = false;
      }
    },
    async yourCallbackFunction(user) {
      console.log('Telegram auth callback:', user);
      try {
        const response = await notesApi.authTelegram(user);
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.isAuthenticated = true;
        await this.loadCategories();
        this.$refs.notification.addNotification('Успешная авторизация', 'success');
      } catch (error) {
        console.error('Ошибка авторизации:', error);
        this.$refs.notification.addNotification('Ошибка авторизации', 'error');
      }
    },
    async formatText() {
      if (!this.content.trim()) {
        this.$refs.notification.addNotification('Пожалуйста, введите текст', 'error');
        return;
      }

      try {
        const response = await notesApi.format(this.content, this.prompt);
        console.log(response);
        this.content = response;
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
        
        await notesApi.create(noteData);
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
      this.category = 'design';
      this.clearStorage();
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