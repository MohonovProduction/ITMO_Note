<template>
  <div class="notes-list">
    <div class="header-container">
      <h1>Список конспектов</h1>

      <div class="controls">
        <button @click="expandAll">Развернуть все</button>
        <button @click="collapseAll">Свернуть все</button>
        <button @click="refreshNotes">Обновить</button>
        <span v-if="isLoading" class="loading-status">Загрузка...</span>
      </div>
    </div>

    <div v-if="error" class="error-message">
      Ошибка загрузки данных: {{ error }}
    </div>

    <template v-if="!isLoading && !error">
      <div class="categories-grid">
        <div class="category-card" v-for="(category, index) in groupedNotes" :key="category.name">
          <div class="category-header" @click="toggleCategory(index)">
            <h2>{{ category.name || 'Без категории' }}</h2>
            <div class="header-right">
              <span class="note-count">{{ category.notes.length }}</span>
              <span class="toggle-icon">{{ isCategoryOpen(index) ? '▼' : '▶' }}</span>
            </div>
          </div>

          <transition name="slide">
            <div v-if="isCategoryOpen(index)" class="notes-grid">
              <router-link
                  v-for="note in category.notes"
                  :key="note.id"
                  :to="{ name: 'note', params: { id: note.id } }"
                  class="note-card"
              >
                <h3>{{ note.title }}</h3>
                <p class="description">{{ note.description }}</p>
                <div class="meta">
                  <span class="date">{{ formatDate(note.date) }}</span>
                  <span class="category-badge">{{ note.category }}</span>
                </div>
              </router-link>
            </div>
          </transition>
        </div>
      </div>
    </template>

    <div v-if="!isLoading && !groupedNotes.length" class="empty-state">
      Нет доступных конспектов
      <button @click="refreshNotes" class="retry-button">Попробовать снова</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',

  data() {
    return {
      openCategories: []
    }
  },

  computed: {
    ...mapState('notes', ['error']),
    ...mapGetters('notes', ['isLoading', 'allNotes', 'getCategories']),

    groupedNotes() {
      const categoriesMap = {}
      const categoriesOrder = []

      try {
        this.allNotes.forEach(note => {
          const categoryName = note.category || 'Без категории'

          if (!categoriesMap[categoryName]) {
            categoriesMap[categoryName] = []
            categoriesOrder.push(categoryName)
          }

          categoriesMap[categoryName].push(note)
        })
      } catch (error) {
        console.error(error)
      }

      return categoriesOrder.map(name => ({
        name,
        notes: categoriesMap[name].sort((a, b) => new Date(b.date) - new Date(a.date))
      }))
    }
  },

  methods: {
    ...mapActions('notes', ['fetchAllNotes']),

    async refreshNotes() {
      try {
        await this.fetchAllNotes()
        if (this.groupedNotes.length > 0 && this.openCategories.length === 0) {
          this.openCategories = [0]
        }
      } catch (error) {
        console.error('Ошибка обновления:', error)
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

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  },

  async created() {
    await this.refreshNotes()
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
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  gap: 0.75rem;
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
}

.controls button:hover {
  background-color: var(--color-link-hover);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-status {
  color: #666;
  font-style: italic;
  display: flex;
  align-items: center;
}

.error-message {
  color: #d32f2f;
  background-color: #fde8e8;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.category-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-header:hover {
  background-color: #ebeff5;
}

.category-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.note-count {
  background-color: var(--color-primary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.toggle-icon {
  font-size: 0.9rem;
  color: #666;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.note-card {
  display: block;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  transition: all 0.2s;
  text-decoration: none;
  color: var(--color-text);
}

.note-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.note-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--color-primary);
}

.description {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.8rem;
}

.date {
  color: #666;
}

.category-badge {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-button:hover {
  background-color: var(--color-link-hover);
}

/* Анимации */
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    width: 100%;
  }

  .controls button {
    flex: 1;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .notes-list {
    padding: 0.75rem;
  }

  .notes-grid {
    grid-template-columns: 1fr;
  }

  .controls button {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>