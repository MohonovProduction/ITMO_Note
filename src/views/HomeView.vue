<script>
export default {
  name: 'HomeView',
  data() {
    return {
      openCategories: [], // Массив для хранения открытых категорий
    }
  },
  computed: {
    categories() {
      const allNotes = this.$store.getters.allNotes;

      // Группируем конспекты по категориям
      const categories = allNotes.reduce((acc, note) => {
        // Ищем категорию в аккумуляторе
        const category = acc.find((cat) => cat.name === note.category);

        if (category) {
          // Если категория уже существует, добавляем конспект в неё
          category.notes.push(note);
        } else {
          // Если категории нет, создаём новую
          acc.push({
            name: note.category,
            notes: [note],
          });
        }

        return acc;
      }, []);

      return categories;
    },
  },
  methods: {
    // Переключение состояния категории (открыта/закрыта)
    toggleCategory(index) {
      if (this.isCategoryOpen(index)) {
        this.openCategories = this.openCategories.filter((i) => i !== index);
      } else {
        this.openCategories.push(index);
      }
    },

    // Проверка, открыта ли категория
    isCategoryOpen(index) {
      return this.openCategories.includes(index);
    },

    // Развернуть все категории
    expandAll() {
      this.openCategories = this.categories.map((_, index) => index);
    },

    // Свернуть все категории
    collapseAll() {
      this.openCategories = [];
    },
  }
}
</script>

<template>
  <div class="notes-list">
    <h1>Список конспектов</h1>

    <!-- Кнопки для управления всеми категориями -->
    <div class="controls">
      <button @click="expandAll">Развернуть все</button>
      <button @click="collapseAll">Свернуть все</button>
    </div>

    <!-- Список категорий -->
    <div class="category" v-for="(category, index) in categories" :key="index">
      <div class="category-header" @click="toggleCategory(index)">
        <h2>{{ category.name }}</h2>
        <span class="toggle-icon">{{ isCategoryOpen(index) ? '▼' : '▶' }}</span>
      </div>

      <!-- Список конспектов в категории -->
      <transition name="slide">
        <ul v-if="isCategoryOpen(index)">
          <li v-for="note in category.notes" :key="note.id">
            <router-link class="card" :to="`/note/${note.id}`">
              <h3>{{ note.title }}</h3>
              <p>{{ note.description }}</p>
            </router-link>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.notes-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #4d6bfe;
  margin-bottom: 1.5rem;
}

.controls {
  margin-bottom: 1.5rem;
}

.controls button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4d6bfe;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.controls button:hover {
  background-color: #3a5bff;
}

.category {
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-header:hover {
  background-color: #f0f0f0;
}

.category-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.toggle-icon {
  font-size: 1.2rem;
  color: #666;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.card {
  text-decoration: none;
  color: inherit;
}

.card h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #4d6bfe;
}

.card p {
  margin: 0.5rem 0 0;
  color: #555;
}

/* Анимация для раскрытия/закрытия */
.slide-enter-active {
  transition: max-height 0.5s ease-in;
  overflow: hidden;
}

.slide-leave-active {
  transition: max-height 0.5s ease-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px; /* Максимальная высота для анимации */
}
</style>
