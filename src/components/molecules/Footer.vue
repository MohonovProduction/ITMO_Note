<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Основная информация -->
      <div class="footer-section">
        <h3>ITMO Notes</h3>
        <p>Платформа для создания и хранения учебных конспектов</p>
        <div class="social-links">
          <a href="https://t.me/mohonovschannel" target="_blank" class="social-link telegram">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="https://github.com/MohonovProduction/ITMO_Note" target="_blank" class="social-link github">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>

      <!-- Навигация -->
      <div class="footer-section">
        <h3>Навигация</h3>
        <nav class="footer-nav">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/generator" class="nav-link">Генератор</router-link>
          <router-link to="/about" class="nav-link">О проекте</router-link>
        </nav>
      </div>

      <!-- Авторы -->
      <div class="footer-section">
        <h3>Авторы</h3>
        <div class="authors">
          <a href="https://t.me/mohonovschannel" target="_blank" class="author">
            <img src="@/assets/images/mohonov.jpg" alt="Михаил Мохонов" class="author-avatar">
            <div class="author-info">
              <h4>Михаил Мохонов</h4>
              <p>Frontend Developer</p>
            </div>
          </a>
          <a href="https://t.me/tor4narek" target="_blank" class="author">
            <img src="@/assets/images/tor4narek.jpg" alt="Егор Кречетов" class="author-avatar">
            <div class="author-info">
              <h4>Егор Кречетов</h4>
              <p>Backend Developer</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Нижняя часть -->
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} ITMO Notes. Все права защищены.</p>
      <div class="footer-links">
        <a href="https://github.com/MohonovProduction/ITMO_Note/blob/main/LICENSE" target="_blank">Лицензия</a>
        <a href="https://github.com/MohonovProduction/ITMO_Note/issues" target="_blank">Сообщить об ошибке</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: var(--color-gray-900);
  padding: var(--spacing-8) 0 var(--spacing-4);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: var(--spacing-8);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.footer-section h3 {
  color: var(--color-gray-100);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2);
}

.footer-section p {
  color: var(--color-gray-400);
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: var(--spacing-4);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-white);
  transition: opacity var(--transition-normal);
  background-color: var(--color-gray-800);
}

.social-link:hover {
  opacity: 0.8;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.nav-link {
  color: var(--color-gray-400);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.nav-link:hover {
  color: var(--color-gray-100);
}

.authors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

.author {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-2);
  text-decoration: none;
  padding: var(--spacing-3);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  background-color: var(--color-gray-800);
  border: 1px solid var(--color-gray-700);
}

.author:hover {
  background-color: var(--color-gray-700);
  border-color: var(--color-gray-600);
  transform: translateY(-2px);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gray-600);
  transition: border-color var(--transition-normal);
}

.author:hover .author-avatar {
  border-color: var(--color-gray-400);
}

.author-info h4 {
  font-size: var(--font-size-sm);
  color: var(--color-gray-100);
  margin-bottom: 2px;
}

.author-info p {
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
}

.footer-bottom {
  max-width: 1200px;
  margin: var(--spacing-8) auto 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-gray-800);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.footer-bottom p {
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
}

.footer-links {
  display: flex;
  gap: var(--spacing-4);
}

.footer-links a {
  color: var(--color-gray-400);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-normal);
}

.footer-links a:hover {
  color: var(--color-gray-100);
}

@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-6) 0 var(--spacing-3);
  }

  .footer-content {
    padding: 0 var(--spacing-4);
    gap: var(--spacing-6);
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-2);
  }

  .footer-links {
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .authors {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--spacing-4) 0 var(--spacing-2);
  }

  .footer-content {
    padding: 0 var(--spacing-3);
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style> 