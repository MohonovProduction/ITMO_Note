<template>
  <button 
    class="clear-button" 
    @click="$emit('click')"
  >
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
}

.clear-button:hover {
  background-color: var(--color-gray-200);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 480px) {
  .clear-button {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
    min-width: 160px;
  }
}
</style> 