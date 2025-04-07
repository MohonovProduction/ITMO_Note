<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <BaseButton
            v-if="closable"
            variant="outline"
            size="small"
            class="modal-close"
            @click="handleClose"
          >
            <span class="close-icon">×</span>
          </BaseButton>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import BaseButton from '@/components/atoms/BaseButton.vue'

export default {
  name: 'Modal',
  components: {
    BaseButton
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleOverlayClick() {
      if (this.closable) {
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 90%;
  max-height: 90vh;
  width: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  font-weight: var(--font-weight-semibold);
}

.modal-close {
  padding: var(--spacing-2);
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  font-size: var(--font-size-xl);
  line-height: 1;
}

.modal-content {
  padding: var(--spacing-4);
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

/* Анимации */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform var(--transition-normal);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

/* Медиа-запросы */
@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    max-height: 95vh;
  }

  .modal-header {
    padding: var(--spacing-3);
  }

  .modal-title {
    font-size: var(--font-size-lg);
  }

  .modal-content {
    padding: var(--spacing-3);
  }
}
</style> 