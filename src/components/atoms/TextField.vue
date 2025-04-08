<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <div class="input-with-button">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        class="input-field"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
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
    type: {
      type: String,
      default: 'text'
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

.input-with-button {
  display: flex;
  gap: var(--spacing-2);
  align-items: stretch;
}

.input-field {
  flex: 1;
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
  height: 100%;
}

.input-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

label {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

:slotted(button) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}
</style> 