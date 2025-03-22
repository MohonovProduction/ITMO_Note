<script>

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style scoped>
/* Основные стили для навигации */
nav {
  background-color: #4d6bfe; /* Акцентный цвет */
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Стили для ссылок */
nav a {
  color: #ffffff; /* Белый цвет текста */
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Стили для активной ссылки */
nav a.router-link-exact-active {
  background-color: #3a5bff; /* Более тёмный оттенок для активной ссылки */
  color: #ffffff;
}

/* Стили для ссылок при наведении */
nav a:hover {
  background-color: #3a5bff; /* Более тёмный оттенок при наведении */
  color: #ffffff;
}
</style>