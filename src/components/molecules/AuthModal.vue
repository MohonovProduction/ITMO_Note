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
import { mapActions } from 'vuex';

export default {
  components: {
    telegramLoginTemp
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close', 'success'],
  methods: {
    ...mapActions('auth', ['loginWithTelegram']),
    ...mapActions('ui', ['closeAuthModal', 'addNotification']),
    
    closeModal() {
      this.closeAuthModal();
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
    
    async handleTelegramCallback(user) {
      try {
        const transformedUser = this.transformTelegramUser(user);
        await this.loginWithTelegram(transformedUser);
        this.$emit('success', transformedUser);
        this.addNotification({
          message: 'Успешная авторизация!',
          type: 'success'
        });
      } catch (error) {
        console.error('Ошибка авторизации:', error);
        this.addNotification({
          message: 'Ошибка авторизации. Пожалуйста, попробуйте снова.',
          type: 'error'
        });
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
        };
        console.log('You in dev mode:', devUser);
        this.handleTelegramCallback(devUser);
      }
      console.log('Telegram widget loaded');
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