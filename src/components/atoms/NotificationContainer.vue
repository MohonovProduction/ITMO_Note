<template>
  <div class="notification-container">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      @close="removeNotification(notification.id)"
    />
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
</style> 