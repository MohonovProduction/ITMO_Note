<script>
import { mapActions } from 'vuex';

export default {
  name: 'Breadcrumbs',
  computed: {
    crumbs() {
      const crumbs = [];
      const route = this.$route;

      // Разбиваем путь на части
      const pathArray = route.path.split('/').filter(path => path);

      // Строим хлебные крошки
      pathArray.reduce((prev, curr, index) => {
        const path = `${prev}/${curr}`;
        const name = this.formatCrumbName(curr);
        crumbs.push({ path, name });
        return path;
      }, '');

      // Добавляем главную страницу
      if (route.path !== '/') {
        crumbs.unshift({ path: '/', name: 'Home' });
      }

      if (pathArray.length == 0) {
        crumbs.push({ path: '/', name: 'Home' });
      }

      return crumbs;
    }
  },
  methods: {
    ...mapActions('ui', ['openSlideOutMenu']),
    formatCrumbName(name) {
      // Форматируем имя для отображения (например, убираем дефисы)
      return name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    }
  }
}
</script>

<template>
  <div class="breadcrumbs">
    <button class="burger-button" @click="openSlideOutMenu">
      <span class="material-symbols-outlined">menu</span>
    </button>
    <transition-group name="m-fade">
      <router-link
          v-for="(crumb, index) in crumbs"
          :key="index"
          :to="crumb.path"
          class="breadcrumb"
      >
        {{ crumb.name }}
      </router-link>
    </transition-group>
  </div>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: var(--spacing-4);
  background-color: var(--color-white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-4);
}

.burger-button {
  background: none;
  border: none;
  padding: var(--spacing-2);
  margin-right: var(--spacing-4);
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s ease-in-out;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-button:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary-hover);
}

.burger-button:active {
  transform: scale(0.95);
}

.breadcrumb {
  color: var(--color-primary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease-in-out;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius);
}

.breadcrumb:hover {
  color: var(--color-primary-hover);
  background-color: var(--color-primary-light);
}

.breadcrumb::after {
  content: '›';
  margin: 0 var(--spacing-2);
  color: var(--color-gray-400);
}

.breadcrumb:last-child::after {
  content: '';
  margin: 0;
}

.breadcrumb:last-child {
  color: var(--color-gray-700);
  pointer-events: none;
  background-color: transparent;
}

/* Анимация для transition-group */
.m-fade-enter-active,
.m-fade-leave-active {
  transition: opacity 0.3s ease;
}

.m-fade-enter-from,
.m-fade-leave-to {
  opacity: 0;
}
</style>