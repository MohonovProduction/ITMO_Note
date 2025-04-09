<template>
  <transition name="slide-fade">
    <div v-if="isOpen" class="slide-out-menu-wrapper">
      <div class="backdrop" @click="closeMenu"></div>
      <div class="slide-out-menu">
        <button class="close-button" @click="closeMenu">
          <i class="fas fa-times"></i>
        </button>
        <nav class="menu-nav">
          <router-link to="/" class="nav-link" @click="closeMenu">Архив</router-link>
          <router-link to="/generator" class="nav-link" @click="closeMenu">Записать</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">Стенд</router-link>
          <!-- Добавьте другие ссылки при необходимости -->
        </nav>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SlideOutMenu',
  computed: {
    ...mapState('ui', {
      isOpen: 'isSlideOutMenuOpen'
    })
  },
  methods: {
    ...mapActions('ui', ['closeSlideOutMenu']),
    closeMenu() {
      this.closeSlideOutMenu();
    }
  }
};
</script>

<style scoped>
.slide-out-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000; /* Выше чем у Navigation */
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity var(--transition-slow);
}

.slide-out-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px; /* Или другая ширина по дизайну */
  height: 100%;
  background-color: var(--color-background);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-8) var(--spacing-6);
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform var(--transition-slow) ease-in-out;
}

.close-button {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  padding: var(--spacing-2);
  transition: color var(--transition-normal);
}

.close-button:hover {
  color: var(--color-text-primary);
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-top: var(--spacing-8); /* Отступ от верха/кнопки */
}

.nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: var(--font-size-lg);
  padding: var(--spacing-3) 0;
  transition: color var(--transition-normal), transform var(--transition-normal);
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, color var(--transition-normal);
}

.nav-link:hover {
  color: var(--color-primary);
  transform: translateX(5px);
}

.nav-link.router-link-exact-active {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

/* Анимации появления/исчезновения */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity var(--transition-slow);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active .slide-out-menu,
.slide-fade-leave-active .slide-out-menu {
  transition: transform var(--transition-slow) ease-in-out;
}

.slide-fade-enter-from .slide-out-menu,
.slide-fade-leave-to .slide-out-menu {
  transform: translateX(-100%);
}

.slide-fade-enter-to .slide-out-menu {
  transform: translateX(0);
}

/* Анимация для ссылок при открытии меню */
.slide-fade-enter-active .nav-link {
  opacity: 1;
  transform: translateX(0);
}

/* Задержка для анимации ссылок */
.slide-fade-enter-active .nav-link:nth-child(1) { transition-delay: 0.1s; }
.slide-fade-enter-active .nav-link:nth-child(2) { transition-delay: 0.15s; }
.slide-fade-enter-active .nav-link:nth-child(3) { transition-delay: 0.2s; }
/* Добавьте задержки для других ссылок */

@media (max-width: 480px) {
  .slide-out-menu {
    width: 85%; /* Шире на маленьких экранах */
  }
}
</style> 