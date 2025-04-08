<template>
  <button
    class="submit-button"
    :class="{ 'is-submitting': isSubmitting }"
    :disabled="isSubmitting || disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="material-symbols-outlined submit-button__icon">{{ icon }}</span>
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
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.isSubmitting && !this.disabled) {
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--color-gray-300);
  box-shadow: none;
}

.is-submitting {
  opacity: 0.7;
}

.submit-button__icon {
  font-size: 1.2rem;
  line-height: 1;
}
</style> 