<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['textarea-field', { 'input-error': error }]"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <transition name="error">
      <span v-if="error" class="input-error-message">{{ error }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextAreaField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.textarea-field {
  width: 100%;
  min-height: 150px;
  padding: var(--spacing-4);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family-base);
  line-height: 1.6;
  resize: vertical;
  transition: all var(--transition-normal);
}

.textarea-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

label {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}
</style> 