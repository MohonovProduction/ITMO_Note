<template>
  <div class="notes-list">
    <h1>Список конспектов</h1>

    <!-- Управление категориями и статус загрузки -->
    <div class="controls">
      <button @click="expandAll">Развернуть все</button>
      <button @click="collapseAll">Свернуть все</button>
      <span v-if="loading" class="loading-status">Загрузка...</span>
    </div>

    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error-message">
      Ошибка загрузки данных: {{ error }}
    </div>

    <!-- Список категорий -->
    <template v-if="!loading && !error">
      <div class="category" v-for="(category, index) in groupedNotes" :key="category.name">
        <div class="category-header" @click="toggleCategory(index)">
          <h2>{{ category.name || 'Без категории' }}</h2>
          <span class="toggle-icon">{{ isCategoryOpen(index) ? '▼' : '▶' }}</span>
          <span class="note-count">({{ category.notes.length }})</span>
        </div>

        <!-- Анимированный список заметок -->
        <transition name="slide">
          <ul v-if="isCategoryOpen(index)" class="notes-container">
            <li v-for="note in category.notes" :key="note.id">
              <router-link :to="{ name: 'note', params: { id: note.id } }" class="note-card">
                <h3>{{ note.title }}</h3>
                <p class="description">{{ note.description }}</p>
                <div class="meta">
                  <span class="date">{{ formatDate(note.date) }}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </transition>
      </div>
    </template>

    <!-- Пустое состояние -->
    <div v-if="!loading && groupedNotes.length === 0" class="empty-state">
      Нет доступных конспектов
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      openCategories: [],
      loading: false,
      error: null
    }
  },
  computed: {
    allNotes() {
      return this.$store.getters.allNotes
    },
    groupedNotes() {
      // Группировка по категориям с сохранением порядка из API
      const categoriesMap = {}
      const categoriesOrder = []

      this.allNotes.forEach(note => {
        const categoryName = note.category || 'Без категории'

        if (!categoriesMap[categoryName]) {
          categoriesMap[categoryName] = []
          categoriesOrder.push(categoryName)
        }

        categoriesMap[categoryName].push(note)
      })

      // Сортируем заметки внутри категории по дате (новые сверху)
      return categoriesOrder.map(name => ({
        name,
        notes: categoriesMap[name].sort((a, b) => new Date(b.date) - new Date(a.date))
      }))
    }
  },
  methods: {
    async loadNotes() {
      this.loading = true
      this.error = null

      try {
        await this.$store.dispatch('fetchNotes')
        // Автоматически раскрываем первую категорию
        if (this.groupedNotes.length > 0 && this.openCategories.length === 0) {
          this.openCategories = [0]
        }
      } catch (err) {
        console.error('Ошибка загрузки заметок:', err)
        this.error = err.message || 'Неизвестная ошибка'
      } finally {
        this.loading = false
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
  created() {
    this.loadNotes()
  },
  watch: {
    '$route.query.category'(newCategory) {
      if (newCategory) {
        // При фильтрации по категории раскрываем только нужную
        const index = this.groupedNotes.findIndex(c => c.name === newCategory)
        if (index >= 0) {
          this.openCategories = [index]
        }
      }
    }
  }
}
</script>

<style scoped>
.notes-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  align-items: center;
}

.controls button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: var(--primary-dark-color);
}

.loading-status {
  color: #666;
  margin-left: auto;
}

.error-message {
  color: #d32f2f;
  padding: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.category {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-header:hover {
  background-color: #eeeeee;
}

.category-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  flex-grow: 1;
}

.toggle-icon {
  font-size: 0.9rem;
  color: #666;
  margin: 0 8px;
}

.note-count {
  color: #666;
  font-size: 0.9rem;
}

.notes-container {
  background-color: white;
}

.note-card {
  display: block;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;
}

.note-card:hover {
  background-color: #fafafa;
}

.note-card h3 {
  margin: 0 0 8px 0;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.note-card .description {
  margin: 0 0 8px 0;
  color: #555;
  font-size: 0.95rem;
}

.note-card .meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* Анимации */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>