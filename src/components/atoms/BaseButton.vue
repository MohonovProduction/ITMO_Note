<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'clear', 'text'].includes(value)
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
  },
  loading: {
    type: Boolean,
    default: false
  },
  iconOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => ({
  'base-button': true,
  [`base-button--${props.variant}`]: true,
  [`base-button--${props.size}`]: true,
  'base-button--disabled': props.disabled,
  'base-button--full-width': props.fullWidth,
  [`base-button--icon-${props.iconPosition}`]: props.icon,
  'base-button--loading': props.loading,
  'base-button--icon-only': props.iconOnly
}))

const contentClasses = computed(() => ({
  'base-button__content': true,
  'base-button__content--hidden': props.loading
}))

const iconClasses = computed(() => ({
  'base-button__icon': true,
  'material-symbols-outlined': true,
  'base-button__icon--hidden': props.loading
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
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span class="base-button__loader"></span>
    <span :class="iconClasses" v-if="icon">{{ icon }}</span>
    <span :class="contentClasses" v-if="!iconOnly"><slot></slot></span>
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
  position: relative;
  overflow: hidden;
}

.base-button--disabled {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

.base-button--full-width {
  width: 100%;
}

.base-button__icon {
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: var(--shadow-sm);
}

.base-button--primary:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow);
}

.base-button--primary:active:not(.base-button--disabled) {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-sm);
}

.base-button--secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-800);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background-color: var(--color-gray-200);
  box-shadow: var(--shadow-sm);
}

.base-button--secondary:active:not(.base-button--disabled) {
  background-color: var(--color-gray-300);
}

.base-button--outline {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-light);
}

.base-button--outline:active:not(.base-button--disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.base-button--danger {
  background-color: var(--color-danger);
  color: var(--color-white);
}

.base-button--danger:hover:not(.base-button--disabled) {
  background-color: var(--color-danger-hover);
  box-shadow: var(--shadow-sm);
}

.base-button--danger:active:not(.base-button--disabled) {
  background-color: var(--color-danger-hover);
  box-shadow: none;
}

.base-button--text {
  background-color: transparent;
  color: var(--color-primary);
  padding: var(--spacing-2);
}

.base-button--text:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-light);
}

.base-button--text:active:not(.base-button--disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

/* Размеры */
.base-button--small {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: 32px;
}

.base-button--medium {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
  min-height: 40px;
}

.base-button--large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
  min-height: 48px;
}

/* Кнопка только с иконкой */
.base-button--icon-only {
  padding: var(--spacing-2);
  min-width: 40px;
  min-height: 40px;
  border-radius: var(--radius-full);
}

.base-button--icon-only.base-button--small {
  min-width: 32px;
  min-height: 32px;
}

.base-button--icon-only.base-button--large {
  min-width: 48px;
  min-height: 48px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .base-button--medium {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
}

.base-button__content--hidden,
.base-button__icon--hidden {
  visibility: hidden;
}

.base-button__loader {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
  color: var(--color-white);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.base-button--loading .base-button__loader {
  opacity: 1;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 