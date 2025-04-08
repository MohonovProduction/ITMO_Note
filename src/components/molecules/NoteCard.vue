<template>
  <div class="note-card" @click="$emit('click')">
    <div class="note-header">
      <h3>{{ note.title }}</h3>
      <BaseButton 
        class="delete-button" 
        @click.stop="handleDelete"
        :disabled="isDeleting"
      >
        <span class="material-symbols-outlined">delete</span>
      </BaseButton>
    </div>
    <p class="description">{{ note.description }}</p>
    <div class="meta">
      <span class="date">{{ formatDate(note.date) }}</span>
      <span class="category-badge">{{ note.category }}</span>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/BaseButton.vue'
import { mapActions } from 'vuex'

export default {
  name: 'NoteCard',
  components: {
    BaseButton
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDeleting: false
    }
  },
  methods: {
    ...mapActions('notes', ['deleteNote']),
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    async handleDelete() {
      if (this.isDeleting) return;
      
      try {
        this.isDeleting = true;
        await this.deleteNote(this.note.id);
        this.$emit('deleted', this.note.id);
      } catch (error) {
        console.error('Ошибка при удалении заметки:', error);
      } finally {
        this.isDeleting = false;
      }
    }
  }
}
</script>

<style scoped>
.note-card {
  display: block;
  padding: var(--spacing-4);
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-normal);
  cursor: pointer;
  text-decoration: none;
  color: var(--color-gray-800);
}

.note-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.note-card h3 {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.description {
  margin: var(--spacing-2) 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-3);
  font-size: var(--font-size-xs);
}

.date {
  color: var(--color-gray-500);
}

.category-badge {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.delete-button {
  padding: var(--spacing-1) !important;
  min-width: auto !important;
  color: var(--color-gray-500) !important;
  background: transparent !important;
}

.delete-button:hover {
  color: var(--color-error) !important;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.material-symbols-outlined {
  font-size: var(--font-size-xl);
  line-height: 1;
}

@media (max-width: 480px) {
  .note-card {
    padding: var(--spacing-3);
  }

  .note-card h3 {
    font-size: var(--font-size-base);
  }

  .description {
    font-size: var(--font-size-xs);
  }
}
</style> 