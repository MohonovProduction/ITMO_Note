<template>
  <transition name="slide-fade">
    <div v-if="isOpen" class="slide-out-menu">
      <div class="menu-header">
        <h2>Меню</h2>
        <BaseButton 
          class="close-button" 
          @click="closeMenu" 
          icon="close" 
          iconOnly 
          variant="clear"
        />
      </div>

      <nav class="menu-nav">
        <router-link to="/" class="nav-link" @click="closeMenu">
          <span class="material-symbols-outlined">archive</span>
          Архив
        </router-link>
        <router-link to="/personal" class="nav-link" @click="closeMenu">
          <span class="material-symbols-outlined">person</span>
          Личное
        </router-link>
        <router-link to="/teams" class="nav-link" @click="closeMenu">
          <span class="material-symbols-outlined">groups</span>
          Группы
        </router-link>
        <router-link to="/about" class="nav-link" @click="closeMenu">
          <span class="material-symbols-outlined">dashboard</span>
          Стенд
        </router-link>
      </nav>

      <div class="auth-section">
        <div v-if="isAuthenticated" class="user-info">
          <div class="user-name">Иванов Иван</div>
          <div class="user-telegram">@ivanov</div>
        </div>
        <button v-else class="auth-button" @click="handleAuthClick">
          <span class="material-symbols-outlined">login</span>
          Войти
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseButton from '@/components/atoms/BaseButton.vue'

export default {
  name: 'SlideOutMenu',
  components: {
    BaseButton
  },
  computed: {
    ...mapGetters('ui', ['isSlideOutMenuOpen']),
    ...mapGetters('auth', ['isAuthenticated']),
    isOpen() {
      return this.isSlideOutMenuOpen;
    }
  },
  methods: {
    ...mapActions('ui', ['closeSlideOutMenu', 'openAuthModal']),
    closeMenu() {
      this.closeSlideOutMenu();
    },
    handleAuthClick() {
      this.closeMenu();
      this.openAuthModal();
    }
  }
};
</script>

<style scoped>
.slide-out-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: var(--color-white);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  z-index: 1000;

  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
}

.menu-header h2 {
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  margin: 0;
}

.menu-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-4);
  gap: var(--spacing-2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-gray-700);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}

.nav-link.router-link-active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.auth-section {
  padding: var(--spacing-4);
  border-top: 1px solid var(--color-gray-200);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
}

.user-telegram {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.auth-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.auth-button:hover {
  background-color: var(--color-primary-hover);
}

@media (max-width: 480px) {
  .slide-out-menu {
    width: 85%;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
}
</style> 