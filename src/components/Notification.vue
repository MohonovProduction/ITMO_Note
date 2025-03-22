<script>
export default {
  name: 'Notification',
  data() {
    return {
      notifications: [], // Список уведомлений
    };
  },
  methods: {
    // Добавление уведомления
    addNotification(message, type = 'success', timeout = 3000) {
      const id = Date.now(); // Уникальный ID для уведомления
      this.notifications.push({ id, message, type });

      // Автоматическое удаление уведомления через заданное время
      setTimeout(() => {
        this.removeNotificationById(id);
      }, timeout);
    },

    // Удаление уведомления по индексу
    removeNotification(index) {
      this.notifications.splice(index, 1);
    },

    // Удаление уведомления по ID
    removeNotificationById(id) {
      this.notifications = this.notifications.filter(
          (notification) => notification.id !== id
      );
    },
  },
};
</script>

<template>
  <div class="notification-container">
    <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
    >
      <span>{{ notification.message }}</span>
      <button @click="removeNotification(index)" class="close-button">×</button>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
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

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>