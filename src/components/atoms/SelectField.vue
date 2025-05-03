<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <div class="select-container">
      <div class="select-field" :class="{ 'is-open': isOpen, 'input-error': error }" @click="toggleDropdown">
        <div class="selected-value">
          <template v-if="selectedOption">
            <span class="chip">{{ selectedOption.label }}</span>
          </template>
          <template v-else>
            <span class="placeholder">{{ placeholder }}</span>
          </template>
        </div>
        <span class="material-symbols-outlined dropdown-icon">
          {{ isOpen ? 'expand_less' : 'expand_more' }}
        </span>
      </div>
      
      <transition name="dropdown">
        <div v-if="isOpen" class="dropdown-content">
          <div class="options-list">
            <div
              v-for="option in options"
              :key="option.value"
              class="option"
              :class="{ 'is-selected': modelValue === option.value }"
              @click="selectOption(option)"
            >
              {{ option.label }}
              <span v-if="modelValue === option.value" class="material-symbols-outlined check-icon">check</span>
            </div>
            <div class="custom-option" @click="showCustomInput = true">
              <span class="material-symbols-outlined">add</span>
              Добавить свою категорию
            </div>
          </div>
        </div>
      </transition>

      <transition name="slide-fade">
        <TextField
          v-if="showCustomInput"
          id="custom-category"
          label="Новая категория"
          v-model="customValue"
          @blur="handleCustomInputBlur"
          placeholder="Введите название категории"
        />
      </transition>
    </div>
    <transition name="error">
      <span v-if="error" class="input-error-message">{{ error }}</span>
    </transition>
  </div>
</template>

<script>
import TextField from './TextField.vue'

export default {
  name: 'SelectField',
  components: {
    TextField
  },
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
    placeholder: {
      type: String,
      default: 'Выберите категорию'
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
      isOpen: false,
      showCustomInput: false,
      customValue: ''
    }
  },
  computed: {
    selectedOption() {
      return this.options.find(option => option.value === this.modelValue)
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.value)
      this.isOpen = false
    },
    handleCustomInputBlur() {
      if (this.customValue.trim()) {
        const newOption = {
          value: this.customValue.toLowerCase().replace(/\s+/g, '-'),
          label: this.customValue
        }
        this.$emit('update:modelValue', newOption.value)
        this.$emit('add-option', newOption)
      }
      this.showCustomInput = false
      this.customValue = ''
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    })
  },
  emits: ['update:modelValue', 'add-option']
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  position: relative;
}

.select-container {
  position: relative;
}

.select-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  background-color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
  min-height: 44px;
}

.select-field:hover {
  border-color: var(--color-primary);
}

.select-field.is-open {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.selected-value {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  flex: 1;
}

.placeholder {
  color: var(--color-gray-400);
}

.chip {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  display: inline-flex;
  align-items: center;
}

.dropdown-icon {
  color: var(--color-gray-400);
  transition: transform var(--transition-normal);
}

.is-open .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-2);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}

.options-list {
  display: flex;
  flex-direction: column;
}

.option {
  padding: var(--spacing-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-normal);
}

.option:hover {
  background-color: var(--color-gray-100);
}

.option.is-selected {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.check-icon {
  color: var(--color-primary);
}

.custom-option {
  padding: var(--spacing-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-primary);
  border-top: 1px solid var(--color-gray-200);
}

.custom-option:hover {
  background-color: var(--color-gray-100);
}

/* Анимации */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .dropdown-content {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    max-height: 50vh;
  }
}
</style> 