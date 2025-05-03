<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'clear'].includes(value)
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
  'base-button--loading': props.loading
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
    <span :class="contentClasses"><slot></slot></span>
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

.base-button--clear {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  min-width: 200px;
}

.base-button--clear:hover:not(.base-button--disabled) {
  background-color: var(--color-gray-200);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
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

@media (max-width: 480px) {
  .base-button--clear {
    min-width: 160px;
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