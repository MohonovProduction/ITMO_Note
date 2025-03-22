<script>
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
    <router-link
        v-for="(crumb, index) in crumbs"
        :key="index"
        :to="crumb.path"
        class="breadcrumb"
    >
      {{ crumb.name }}
    </router-link>
  </div>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.breadcrumb {
  color: #4d6bfe;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.breadcrumb:hover {
  color: #3a5bff;
  text-decoration: underline;
}

.breadcrumb::after {
  content: '›';
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb:last-child::after {
  content: '';
  margin: 0;
}

.breadcrumb:last-child {
  color: #333;
  pointer-events: none;
}
</style>