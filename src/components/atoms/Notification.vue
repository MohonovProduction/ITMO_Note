<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  mounted() {
    // Автоматическое закрытие через 3 секунды
    setTimeout(() => {
      this.close();
    }, 3000);
  },
  methods: {
    close() {
      this.isVisible = false;
      this.$emit('close', this.id);
    }
  }
};
</script>

<template>
  <transition name="slide-fade">
    <div
      v-if="isVisible"
      :class="['notification', `notification-${type}`]"
    >
      <span>{{ message }}</span>
      <button @click="close" class="close-button">×</button>
    </div>
  </transition>
</template>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-success {
  background-color: #4caf50; /* Зелёный для успешных операций */
}

.notification-error {
  background-color: #f44336; /* Красный для ошибок */
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1rem;
}

.close-button:hover {
  opacity: 0.8;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>