<template>
  <button
    class="submit-button"
    :class="{ 'is-submitting': isSubmitting }"
    :disabled="isSubmitting"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    text: {
      type: String,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.isSubmitting) {
        this.$emit('click', event);
      }
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.submit-button {
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow);
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  background-color: var(--color-gray-300);
  cursor: not-allowed;
  box-shadow: none;
}

.is-submitting {
  opacity: 0.7;
}
</style> 