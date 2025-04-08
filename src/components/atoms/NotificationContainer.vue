<template>
  <div class="notification-container">
    <transition-group name="notification-list">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        :id="notification.id"
        @close="removeNotification"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notification from './Notification.vue';

export default {
  name: 'NotificationContainer',
  components: {
    Notification
  },
  computed: {
    ...mapState('ui', ['notifications'])
  },
  methods: {
    ...mapActions('ui', ['removeNotification'])
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Анимации для списка уведомлений */
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-list-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-list-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.notification-list-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.notification-list-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

/* Анимация для перестановки элементов */
.notification-list-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 