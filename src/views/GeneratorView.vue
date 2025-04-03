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
        <label for="prompt">Промпт:</label>
        <textarea
          id="prompt"
          v-model="prompt"
          placeholder="Введите промпт для форматирования текста"
          class="textarea-field"
        ></textarea>
        <BaseButton @click="formatText" class="format-button">
          Форматировать
        </BaseButton>
      </div>

      <!-- Секция с текстом -->
      <div class="text-section">
        <label for="content">Текст:</label>
        <textarea
          id="content"
          v-model="content"
          placeholder="Введите или вставьте текст для форматирования"
          class="textarea-field"
        ></textarea>
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
import { telegramLoginTemp } from "vue3-telegram-login";

export default {
  name: 'GeneratorView',
  components: {
    Notification,
    BaseButton,
    SubmitButton,
    ClearButton,
    telegramLoginTemp
  },
  data() {
    return {
      isAuthenticated: process.env.VUE_APP_BYPASS_AUTH === 'true',
      isSubmitting: false,
      prompt: '',
      content: '',
    };
  },
  methods: {
    telegramLoadedCallbackFunc(user) {
      console.log('Telegram widget loaded:', user);
      if (process.env.VUE_APP_BYPASS_AUTH === 'true') {
        this.isAuthenticated = true;
        this.$refs.notification.addNotification('Режим разработки: авторизация пропущена', 'info');
      }
    },
    yourCallbackFunction(user) {
      console.log('Telegram auth callback:', user);
      this.isAuthenticated = true;
      this.$refs.notification.addNotification('Успешная авторизация', 'success');
    },
    formatText() {
      // TODO: Добавить логику форматирования
      this.$refs.notification.addNotification('Функция форматирования в разработке', 'info');
    },
    async saveContent() {
      if (!this.content.trim()) {
        this.$refs.notification.addNotification('Пожалуйста, введите текст', 'error');
        return;
      }

      this.isSubmitting = true;
      try {
        // TODO: Добавить API для сохранения
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