<template>
  <div class="auth-modal" v-if="isOpen">
    <div class="auth-modal__overlay" @click="closeModal"></div>
    <div class="auth-modal__content">
      <div class="auth-modal__header">
        <h2>Авторизация</h2>
        <button class="auth-modal__close" @click="closeModal">×</button>
      </div>
      <div class="auth-modal__body">
        <p>Для продолжения необходимо авторизоваться через Telegram</p>
        <telegramLoginTemp
          mode="callback"
          telegram-login="itmo_note_bot"
          @loaded="telegramLoadedCallbackFunc"
          @callback="handleTelegramCallback"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { telegramLoginTemp } from "vue3-telegram-login";
import notesApi from '@/api/notes';

export default {
  components: {
    telegramLoginTemp
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'success'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    transformTelegramUser(user) {
      return {
        id: user.id,
        FirstName: user.first_name,
        LastName: user.last_name,
        username: user.username,
        authDate: user.auth_date,
        hash: user.hash
      };
    },
    async handleTelegramCallback(user) {
      try {
        const transformedUser = this.transformTelegramUser(user);
        const response = await notesApi.authTelegram(transformedUser);
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(transformedUser));
        this.$emit('success', transformedUser);
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    },
    telegramLoadedCallbackFunc() {
      if (process.env.VUE_APP_BYPASS_AUTH === 'false') {
        const devUser = {
          "id": 656626574,
          "first_name": "Mihail",
          "last_name": "Mohónov",
          "username": "mohonovproduction",
          "auth_date": 1743683646,
          "hash": "0e7efe11ac8c39035e77bf50716003d269aa03c35911f41fc42e9b0cae15c1f6"
        }
        console.log('You in dev mode:', devUser);
        this.handleTelegramCallback(devUser);
      }
      console.log('Telegram widget loaded')
    }
  }
}
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.auth-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.auth-modal__content {
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  z-index: 1001;
}

.auth-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.auth-modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.auth-modal__body {
  text-align: center;
}

.auth-modal__body p {
  margin-bottom: 1.5rem;
}
</style> 