<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <div class="select-container">
      <div class="fields-row">
        <select
          :id="id"
          :value="modelValue"
          :class="['select-field', { 'input-error': error }]"
          @change="handleSelectChange"
          :disabled="isLoading"
        >
          <option v-if="isLoading" value="" disabled>Загрузка категорий...</option>
          <option
            v-else
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
          <option value="custom">Другая категория...</option>
        </select>
        <transition name="slide-fade">
          <input
            v-if="showCustomInput"
            type="text"
            :class="['custom-input', { 'input-error': error }]"
            :value="customValue"
            @input="handleCustomInput"
            placeholder="Введите свою категорию"
            @blur="handleBlur"
          />
        </transition>
      </div>
    </div>
    <transition name="error">
      <span v-if="error" class="input-error-message">{{ error }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
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
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: (options) => {
        return options.every(option => 
          typeof option === 'object' && 
          'value' in option && 
          'label' in option
        )
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCustomInput: false,
      customValue: ''
    }
  },
  watch: {
    modelValue(newValue) {
      if (newValue === 'custom') {
        this.showCustomInput = true
      } else if (this.options.some(option => option.value === newValue)) {
        this.showCustomInput = false
        this.customValue = ''
      } else {
        // Если значение не найдено в списке опций, значит это пользовательская категория
        this.showCustomInput = true
        this.customValue = newValue
      }
    }
  },
  methods: {
    handleSelectChange(event) {
      const value = event.target.value
      if (value === 'custom') {
        this.showCustomInput = true
      } else {
        this.showCustomInput = false
        this.customValue = ''
        this.$emit('update:modelValue', value)
      }
    },
    handleCustomInput(event) {
      this.customValue = event.target.value
    },
    handleBlur() {
      if (this.customValue.trim()) {
        this.$emit('update:modelValue', this.customValue)
      } else {
        this.showCustomInput = false
        this.$emit('update:modelValue', '')
      }
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

.select-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.fields-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  align-items: stretch;
  width: 100%;
}

.select-field {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background-color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.select-field:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.custom-input {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
}

.custom-input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

label {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

/* Анимации для transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

@media (min-width: 768px) {
  .fields-row {
    flex-direction: row;
    align-items: center;
  }
}
</style> 