<script>
import { mapActions } from 'vuex';

export default {
  name: 'FloatActionButton',
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
    <button class="fab-button" @click="openGenerator">
      <span class="material-symbols-outlined">
        add
      </span>
    </button>
  </div>
</template>

<style scoped>
.float-action-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.fab-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.1);
}

.material-symbols-outlined {
  font-size: 24px;
}
</style>