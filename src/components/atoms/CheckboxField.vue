<template>
  <label class="checkbox-field" :class="{ 'is-checked': modelValue }">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-track">
      <span class="checkbox-thumb"></span>
    </span>
    <span class="checkbox-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'CheckboxField',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.checkbox-field {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  transition: opacity var(--transition-normal);
}

.checkbox-field:hover {
  opacity: 0.8;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-track {
  position: relative;
  width: 36px;
  height: 20px;
  background-color: var(--color-gray-300);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-normal);
}

.checkbox-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: var(--color-white);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal);
}

.checkbox-field.is-checked .checkbox-track {
  background-color: var(--color-primary);
}

.checkbox-field.is-checked .checkbox-thumb {
  transform: translateX(16px);
}

.checkbox-label {
  color: var(--color-gray-700);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

/* Состояния фокуса */
.checkbox-input:focus-visible + .checkbox-track {
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

/* Состояния отключения */
.checkbox-field:has(.checkbox-input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-field:has(.checkbox-input:disabled) .checkbox-track {
  background-color: var(--color-gray-200);
}

.checkbox-field:has(.checkbox-input:disabled).is-checked .checkbox-track {
  background-color: var(--color-gray-400);
}
</style> 