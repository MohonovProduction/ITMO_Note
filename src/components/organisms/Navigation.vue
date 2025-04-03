<script>

</script>

<template>
  <span class="version">Beta β</span>
  <nav>
    <router-link to="/">Архив</router-link>
    <router-link to="/generator">Записать</router-link>
    <router-link to="/about">Стенд</router-link>
  </nav>
</template>

<style scoped>
/* Основные стили для навигации */
nav {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  text-align: center;
  box-shadow: var(--shadow);
}

/* Стили для ссылок */
nav a {
  color: var(--color-white);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin: 0 var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius);
  transition: all var(--transition-normal);
}

/* Стили для активной ссылки */
nav a.router-link-exact-active {
  background-color: var(--color-primary-hover);
  color: var(--color-white);
}

/* Стили для ссылок при наведении */
nav a:hover {
  background-color: var(--color-primary-hover);
  color: var(--color-white);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.version {
  display: block;
  width: 100%;
  background-color: var(--color-primary);
  text-align: left;
  color: var(--color-white);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  padding: var(--spacing-2) var(--spacing-4);
}

/* Адаптивность */
@media (max-width: 768px) {
  nav {
    padding: var(--spacing-3);
  }

  nav a {
    font-size: var(--font-size-base);
    padding: var(--spacing-2) var(--spacing-3);
  }

  .version {
    font-size: var(--font-size-base);
    padding: var(--spacing-2) var(--spacing-3);
  }
}
</style>