<template>
  <div class="category-card">
    <div class="category-header" @click="$emit('toggle')">
      <h2>{{ category.name || 'Без категории' }}</h2>
      <div class="header-right">
        <span class="note-count">{{ category.notes.length }}</span>
        <span class="material-symbols-outlined toggle-icon">{{ isOpen ? 'expand_more' : 'chevron_right' }}</span>
      </div>
    </div>

    <transition name="slide">
      <div v-if="isOpen" class="notes-grid">
        <NoteCard
          v-for="note in category.notes"
          :key="note.id"
          :note="note"
          @click="$emit('note-click', note)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import NoteCard from '@/components/molecules/NoteCard.vue'

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
}

.category-card:hover {
  box-shadow: var(--shadow-md);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-5);
  background-color: var(--color-gray-50);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.category-header:hover {
  background-color: var(--color-gray-100);
}

.category-header h2 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  font-weight: var(--font-weight-semibold);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.note-count {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.toggle-icon {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-4);
  padding: var(--spacing-4);
}

/* Анимации */
.slide-enter-active {
  transition: all var(--transition-normal) ease-out;
}

.slide-leave-active {
  transition: all var(--transition-normal) ease-in;
}

.slide-enter-from,
.slide-leave-to {
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