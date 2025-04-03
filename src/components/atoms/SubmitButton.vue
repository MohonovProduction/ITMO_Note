<template>
  <button 
    class="submit-button" 
    :disabled="isSubmitting"
    @click="$emit('click')"
  >
    <span v-if="!isSubmitting">{{ text }}</span>
    <span v-else>Отправка...</span>
  </button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    isSubmitting: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Отправить на сервер'
    }
  }
}
</script>

<style scoped>
.submit-button {
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 200px;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  background-color: var(--color-gray-400);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 480px) {
  .submit-button {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
    min-width: 160px;
  }
}
</style> 