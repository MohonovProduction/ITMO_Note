<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => ({
  'base-button': true,
  [`base-button--${props.variant}`]: true,
  [`base-button--${props.size}`]: true,
  'base-button--disabled': props.disabled,
  'base-button--full-width': props.fullWidth,
  [`base-button--icon-${props.iconPosition}`]: props.icon
}))

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="base-button__icon material-symbols-outlined">{{ icon }}</span>
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  white-space: nowrap;
  gap: 0.5rem;
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--full-width {
  width: 100%;
}

.base-button__icon {
  font-size: 1.2rem;
  line-height: 1;
}

.base-button--icon-left {
  flex-direction: row;
}

.base-button--icon-right {
  flex-direction: row-reverse;
}

/* Варианты */
.base-button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.base-button--primary:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.base-button--secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-800);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background-color: var(--color-gray-200);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.base-button--outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover:not(.base-button--disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.base-button--danger {
  background-color: var(--color-danger);
  color: var(--color-white);
}

.base-button--danger:hover:not(.base-button--disabled) {
  background-color: var(--color-danger-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

/* Размеры */
.base-button--small {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.base-button--medium {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

.base-button--large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}

/* Адаптивность */
@media (max-width: 768px) {
  .base-button--medium {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
}
</style> 