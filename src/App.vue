<template>
  <Navigation />

  <Breadcrumbs />

  <router-view v-slot="{ Component }">
    <transition name="m-fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <Footer />

  <transition name="m-fade">
    <Loader v-if="loader" />
  </transition>

  <!-- Глобальные компоненты -->
  <Teleport to="body">
    <AuthModal
      :is-open="isAuthModalOpen"
      :props="authModalProps"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />
  </Teleport>

  <Teleport to="body">
    <NotificationContainer />
  </Teleport>
</template>

<script>
import Navigation from "@/components/organisms/Navigation.vue";
import Breadcrumbs from "@/components/atoms/Breadcrumbs.vue";
import Loader from "@/components/atoms/Loader.vue";
import Footer from "@/components/molecules/Footer.vue";
import AuthModal from "@/components/molecules/AuthModal.vue";
import NotificationContainer from "@/components/atoms/NotificationContainer.vue";
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Loader,
    Navigation,
    Breadcrumbs,
    Footer,
    AuthModal,
    NotificationContainer
  },
  computed: {
    ...mapState('ui', ['authModal']),
    isAuthModalOpen() {
      return this.authModal?.isOpen || false;
    },
    authModalProps() {
      return this.authModal?.props || {};
    }
  },
  methods: {
    ...mapActions('ui', ['closeAuthModal']),
    handleAuthSuccess(user) {
      this.closeAuthModal();
      // Дополнительная логика после успешной авторизации
    }
  },
  created() {
    console.log("App created");
    console.log(process.env.VUE_APP_API_BASE_URL);
    setTimeout(() => this.loader = false, 2000)
  },
  data() {
    return {
      loader: true,
    }
  }
}
</script>

<style>
@import '@/assets/styles/variables.css';

/* Подключение шрифта Roboto */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

html {
  scroll-behavior: smooth;
}

/* Базовые стили */
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-gray-800);
  background-color: var(--color-white);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Заголовки */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  margin-top: 0;
  margin-bottom: var(--spacing-4);
}

h1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  color: var(--color-primary);
}

h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-5);
  margin-bottom: var(--spacing-3);
  color: var(--color-primary);
}

h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-4);
  margin-bottom: var(--spacing-2);
  color: var(--color-primary);
}

h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-3);
  margin-bottom: var(--spacing-2);
}

/* Параграфы */
p {
  margin-top: var(--spacing-3);
  margin-bottom: var(--spacing-3);
}

/* Списки */
ul {
  margin-top: var(--spacing-3);
  margin-bottom: var(--spacing-3);
  padding-left: var(--spacing-6);
}

li {
  margin-bottom: var(--spacing-2);
}

/* Изображения */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: var(--spacing-4) auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* Ссылки */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

/* Центрирование содержимого на широких экранах */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-5);
}

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-4);
  }

  h1 {
    font-size: var(--font-size-2xl);
  }

  h2 {
    font-size: var(--font-size-xl);
  }

  h3 {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 480px) {
  .container {
    padding: var(--spacing-3);
  }

  h1 {
    font-size: var(--font-size-xl);
  }

  h2 {
    font-size: var(--font-size-lg);
  }

  h3 {
    font-size: var(--font-size-base);
  }
}

/* Стили для анимации */
.m-fade-enter-active {
  transition: opacity var(--transition-normal);
}
.m-fade-leave-active {
  transition: opacity var(--transition-normal);
}

.m-fade-enter-from,
.m-fade-leave-to{
  opacity: 0;
}

.m-fade-enter-to,
.m-fade-leave-from {
  opacity: 1;
}

* {
  box-sizing: border-box;
}
</style>