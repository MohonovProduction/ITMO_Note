<template>
  <div class="category-card">
    <div class="category-header" @click="$emit('toggle')">
      <h2>{{ category.name || 'Без категории' }}</h2>
      <div class="header-right">
        <span class="note-count">{{ category.notes.length }}</span>
        <span class="material-symbols-outlined toggle-icon" :class="{ 'is-open': isOpen }">expand_more</span>
      </div>
    </div>

    <div 
      :style="{ height: contentHeight }"
      style="transition: height var(--transition-normal);"
      ref="contentRef"
    >
      <div class="notes-grid">
        <NoteCard
        v-for="note in category.notes"
        :key="note.id"
        :note="note"
        @click="$emit('note-click', note)"
      />
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from '@/components/molecules/NoteCard.vue'
import { ref, computed, watch } from 'vue'

export default {
  name: 'CategoryCard',
  components: {
    NoteCard
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const contentRef = ref(null)
    
    const contentHeight = computed(() => {
      if (!props.isOpen) return '0px'
      return contentRef.value ? `${contentRef.value.scrollHeight}px` : 'auto'
    })

    return {
      contentRef,
      contentHeight
    }
  }
}
</script>

<style scoped>
.category-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--transition-normal);
  margin-bottom: var(--spacing-4);
  border: 1px solid var(--color-gray-200);
}

.category-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-gray-300);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-5);
  background-color: var(--color-gray-50);
  cursor: pointer;
  transition: all var(--transition-normal);
  border-bottom: 1px solid var(--color-gray-200);
}

.category-header:hover {
  background-color: var(--color-gray-100);
}

.category-header h2 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.025em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.note-count {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-gray-200);
}

.toggle-icon {
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  transition: transform var(--transition-normal);
  transform: rotate(0deg);
  cursor: pointer;
}

.toggle-icon.is-open {
  transform: rotate(-180deg);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  overflow: hidden;
  background-color: var(--color-white);
}

/* Анимации */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .category-header {
    padding: var(--spacing-3) var(--spacing-4);
  }

  .category-header h2 {
    font-size: var(--font-size-lg);
  }

  .notes-grid {
    grid-template-columns: 1fr;
    padding: var(--spacing-3);
    gap: var(--spacing-3);
  }
}

@media (max-width: 480px) {
  .category-header {
    padding: var(--spacing-2) var(--spacing-3);
  }

  .category-header h2 {
    font-size: var(--font-size-base);
  }

  .notes-grid {
    padding: var(--spacing-2);
    gap: var(--spacing-2);
  }
}
</style> 