<template>
  <Navigation />

  <Breadcrumbs />

  <router-view v-slot="{ Component }">
    <transition name="m-fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  name: 'App',
  components: {
    Navigation,
    Breadcrumbs
  },
  methods: {
    restScroll() {
      window.scrollTo({
        top: 0, // Позиция, до которой нужно прокрутить
        behavior: 'smooth' // Включает плавный скролл
      });
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* Переменные для цветов и шрифтов */
:root {
  --font-family: 'Roboto', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  --color-primary: #4d6bfe; /* Акцентный цвет */
  --color-text: #333333; /* Основной цвет текста */
  --color-background: #ffffff; /* Цвет фона */
  --color-border: #e0e0e0; /* Цвет границ */
  --color-link: var(--color-primary); /* Цвет ссылок */
  --color-link-hover: #3a5bff; /* Цвет ссылок при наведении */
}

/* Базовые стили */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
}

/* Центрирование содержимого на широких экранах */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Заголовки */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
}

h3 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

/* Параграфы */
p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

/* Списки */
ul {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

/* Изображения */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Ссылки */
a {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }
}

/* Стили для анимации */
.m-fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}
.m-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.m-fade-enter-from,
.m-fade-leave-to{
  opacity: 0;
}

.m-fade-enter-to,
.m-fade-leave-from {
  opacity: 1;
}
</style>