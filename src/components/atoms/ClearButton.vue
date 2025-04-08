<template>
  <button 
    class="clear-button" 
    @click="$emit('click')"
  >
    <span v-if="icon" class="material-symbols-outlined clear-button__icon">{{ icon }}</span>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ClearButton',
  props: {
    text: {
      type: String,
      default: 'Очистить форму'
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.clear-button {
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.clear-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--color-gray-200);
}

.clear-button:hover:not(:disabled) {
  background-color: var(--color-gray-200);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.clear-button__icon {
  font-size: 1.2rem;
  line-height: 1;
}

@media (max-width: 480px) {
  .clear-button {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
    min-width: 160px;
  }
}
</style> 