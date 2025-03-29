<template>
  <div class="notes-list">
    <h1>Список конспектов</h1>

    <div class="controls">
      <button @click="expandAll">Развернуть все</button>
      <button @click="collapseAll">Свернуть все</button>
      <button @click="refreshNotes">Обновить</button>
      <span v-if="isLoading" class="loading-status">Загрузка...</span>
    </div>

    <div v-if="error" class="error-message">
      Ошибка загрузки данных: {{ error }}
    </div>

    <template v-if="!isLoading && !error">
      <div class="category" v-for="(category, index) in groupedNotes" :key="category.name">
        <div class="category-header" @click="toggleCategory(index)">
          <h2>{{ category.name || 'Без категории' }}</h2>
          <span class="toggle-icon">{{ isCategoryOpen(index) ? '▼' : '▶' }}</span>
          <span class="note-count">({{ category.notes.length }})</span>
        </div>

        <transition name="slide">
          <ul v-if="isCategoryOpen(index)" class="notes-container">
            <li v-for="note in category.notes" :key="note.id">
              <router-link
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
            </li>
          </ul>
        </transition>
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
/* Основные стили остаются прежними, добавляем новые */
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.controls button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button:hover {
  background-color: var(--primary-dark-color);
  transform: translateY(-1px);
}

.category-badge {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.retry-button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
</style>