<script>
import { mapActions } from 'vuex';
import BaseButton from './BaseButton.vue';

export default {
  name: 'FloatActionButton',
  components: {
    BaseButton
  },
  props: {
    type: {
      type: String,
      default: 'edit'
    }
  },
  methods: {
    ...mapActions('ui', ['openSlideOutGenerator']),
    openGenerator() {
      this.openSlideOutGenerator();
    }
  }
}
</script>

<template>
  <div class="float-action-button">
    <BaseButton
      variant="primary"
      size="large"
      icon="add"
      iconOnly
      @click="openGenerator"
    />
  </div>
</template>

<style scoped>
.float-action-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}
</style>