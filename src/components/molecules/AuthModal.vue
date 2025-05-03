<template>
  <Transition name="fade">
    <div class="auth-modal" v-if="isOpen">
      <div class="auth-modal__overlay" @click="closeModal"></div>
      <Transition name="scale">
        <div class="auth-modal__content">
          <div class="auth-modal__header">
            <h2>Авторизация</h2>
            <BaseButton
              variant="clear"
              size="small"
              icon="close"
              iconOnly
              @click="closeModal"
            />
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
      </Transition>
    </div>
  </Transition>
</template>

<script>
import { telegramLoginTemp } from "vue3-telegram-login";
import { mapActions } from 'vuex';
import BaseButton from '@/components/atoms/BaseButton.vue';

export default {
  components: {
    telegramLoginTemp,
    BaseButton
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
  backdrop-filter: blur(4px);
}

.auth-modal__content {
  position: relative;
  background-color: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  max-width: 400px;
  width: 90%;
  z-index: 1001;
  box-shadow: var(--shadow-lg);
}

.auth-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
}

.auth-modal__header h2 {
  font-size: var(--font-size-2xl);
  color: var(--color-gray-800);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.auth-modal__body {
  text-align: center;
}

.auth-modal__body p {
  margin-bottom: var(--spacing-6);
  color: var(--color-gray-700);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

/* Адаптивность */
@media (max-width: 480px) {
  .auth-modal__content {
    padding: var(--spacing-4);
    width: 95%;
  }

  .auth-modal__header h2 {
    font-size: var(--font-size-xl);
  }

  .auth-modal__body p {
    font-size: var(--font-size-sm);
  }
}
</style> 