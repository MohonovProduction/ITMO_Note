<template>
  <div class="notes-list">
    <div class="header-container">
      <h1>Список конспектов</h1>

      <div class="controls">
        <BaseButton @click="expandAll" icon="expand_more">
          Развернуть все
        </BaseButton>
        <BaseButton @click="collapseAll" icon="expand_less">
          Свернуть все
        </BaseButton>
        <BaseButton @click="refreshNotes" icon="refresh">
          Обновить
        </BaseButton>
        <span v-if="loading" class="loading-status">Загрузка...</span>
      </div>
    </div>

    <CategoryFilter
      v-if="categories.length"
      @category-change="handleCategorySelect"
    />

    <div v-if="error" class="error-message">
      Ошибка загрузки данных: {{ error }}
    </div>

    <template v-if="!loading && !error">
      <div class="categories-list">
        <CategoryCard
          v-for="(category, index) in groupedNotes"
          :key="category.name"
          :category="category"
          :is-open="isCategoryOpen(index)"
          @toggle="toggleCategory(index)"
          @note-click="handleNoteClick"
        />
      </div>
    </template>

    <div v-if="!loading && !groupedNotes.length" class="empty-state">
      Нет доступных конспектов
      <BaseButton @click="refreshNotes" icon="refresh">Попробовать снова</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BaseButton from '@/components/atoms/BaseButton.vue'
import CategoryCard from '@/components/molecules/CategoryCard.vue'
import CategoryFilter from '@/components/molecules/CategoryFilter.vue'

export default {
  name: 'HomeView',
  components: {
    BaseButton,
    CategoryCard,
    CategoryFilter
  },

  data() {
    return {
      openCategories: [],
      isAuthModalOpen: false
    }
  },

  computed: {
    ...mapState('notes', ['error', 'loading']),
    ...mapGetters('notes', ['publicNotes', 'categories']),
    ...mapGetters('auth', ['isAuthenticated']),

    groupedNotes() {
      const categoriesMap = {};
      const categoriesOrder = [];

      this.publicNotes.forEach(note => {
        const categoryName = note.category || 'Без категории';

        if (!categoriesMap[categoryName]) {
          categoriesMap[categoryName] = [];
          categoriesOrder.push(categoryName);
        }

        categoriesMap[categoryName].push(note);
      });

      return categoriesOrder.map(name => ({
        name,
        notes: categoriesMap[name].sort((a, b) => new Date(b.date) - new Date(a.date))
      }));
    }
  },

  methods: {
    ...mapActions('notes', ['fetchPublicNotes', 'searchNotesByCategory', 'fetchCategories']),

    async refreshNotes() {
      try {
        await this.fetchPublicNotes();
        if (this.groupedNotes.length > 0 && this.openCategories.length === 0) {
          this.openCategories = [0];
        }
      } catch (error) {
        console.error('Ошибка обновления:', error);
      }
    },

    toggleCategory(index) {
      if (this.isCategoryOpen(index)) {
        this.openCategories = this.openCategories.filter(i => i !== index)
      } else {
        this.openCategories.push(index)
      }
    },

    isCategoryOpen(index) {
      return this.openCategories.includes(index)
    },

    expandAll() {
      this.openCategories = this.groupedNotes.map((_, index) => index)
    },

    collapseAll() {
      this.openCategories = []
    },

    handleNoteClick(note) {
      this.$router.push({ name: 'note', params: { id: note.id } })
    },

    async handleCategorySelect(category) {
      if (category) {
        await this.searchNotesByCategory(category);
      } else {
        await this.fetchPublicNotes();
      }
    },
    
    handleAuthSuccess() {
      this.isAuthModalOpen = false;
    }
  },

  async created() {
    await Promise.all([
      this.fetchPublicNotes(),
      this.fetchCategories()
    ]);
  },

  watch: {
    '$route.query.category'(newCategory) {
      if (newCategory) {
        const index = this.groupedNotes.findIndex(c => c.name === newCategory)
        if (index >= 0) this.openCategories = [index]
      }
    }
  }
}
</script>

<style scoped>
.notes-list {
  padding: var(--spacing-4);
  max-width: 1200px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.controls {
  display: flex;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.controls button {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls button:hover {
  background-color: var(--color-link-hover);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls button .material-symbols-outlined {
  font-size: 1.2rem;
}

.loading-status {
  color: var(--color-gray-500);
  font-style: italic;
  display: flex;
  align-items: center;
}

.error-message {
  color: var(--color-danger);
  background-color: var(--color-danger-light);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-6);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-8);
  color: var(--color-gray-500);
  font-size: var(--font-size-lg);
}

/* Адаптивность */
@media (max-width: 768px) {
  .notes-list {
    padding: var(--spacing-3);
  }

  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .controls {
    width: 100%;
    justify-content: space-between;
  }

  .controls button {
    flex: 1;
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .notes-list {
    padding: var(--spacing-2);
  }

  .controls {
    flex-direction: column;
  }

  .controls button {
    width: 100%;
  }

  .empty-state {
    padding: var(--spacing-4);
    font-size: var(--font-size-base);
  }
}
</style>