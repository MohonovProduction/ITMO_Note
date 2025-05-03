<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Основная информация -->
      <div class="footer-section">
        <h3>ITMO Notes</h3>
        <p>Платформа для создания и хранения учебных конспектов</p>
        <div class="social-links">
          <a href="https://t.me/mohonovproduction" target="_blank" class="social-link" aria-label="Telegram">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="https://github.com/MohonovProduction/ITMO_Note" target="_blank" class="social-link" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>

      <!-- Навигация -->
      <div class="footer-section">
        <h3>Навигация</h3>
        <nav class="footer-nav">
          <router-link to="/" class="nav-link">
            <span class="material-symbols-outlined">archive</span>
            <span>Архив</span>
          </router-link>
          <router-link to="/generator" class="nav-link">
            <span class="material-symbols-outlined">note_add</span>
            <span>Записать</span>
          </router-link>
          <router-link to="/about" class="nav-link">
            <span class="material-symbols-outlined">info</span>
            <span>О проекте</span>
          </router-link>
        </nav>
      </div>

      <!-- Репозитории -->
      <div class="footer-section">
        <h3>Репозитории</h3>
        <div class="repositories">
          <a href="https://github.com/MohonovProduction/ITMO_Note" target="_blank" class="repository-link">
            <i class="fab fa-github"></i>
            <span>Frontend</span>
          </a>
          <a href="https://github.com/Tor4narek/ItmoNoteApi" target="_blank" class="repository-link">
            <i class="fab fa-github"></i>
            <span>Backend</span>
          </a>
        </div>
      </div>

      <!-- Авторы -->
      <div class="footer-section">
        <h3>Авторы</h3>
        <div class="authors">
          <a href="https://t.me/mohonovproduction" target="_blank" class="author">
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
        <a href="https://github.com/MohonovProduction/ITMO_Note/blob/main/LICENSE" target="_blank">
          <span class="material-symbols-outlined">gavel</span>
          <span>Лицензия</span>
        </a>
        <a href="https://github.com/MohonovProduction/ITMO_Note/issues" target="_blank">
          <span class="material-symbols-outlined">bug_report</span>
          <span>Сообщить об ошибке</span>
        </a>
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
  box-shadow: var(--shadow-lg);
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
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}

.footer-section p {
  color: var(--color-gray-400);
  line-height: var(--line-height-base);
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
  border-radius: var(--radius-full);
  color: var(--color-white);
  transition: all var(--transition-normal);
  background-color: var(--color-gray-800);
}

.social-link:hover {
  background-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  color: var(--color-gray-400);
  text-decoration: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  color: var(--color-gray-100);
  background-color: var(--color-gray-800);
}

.nav-link .material-symbols-outlined {
  font-size: var(--font-size-lg);
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
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  background-color: var(--color-gray-800);
  border: 1px solid var(--color-gray-700);
}

.author:hover {
  background-color: var(--color-gray-700);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--color-gray-600);
  transition: border-color var(--transition-normal);
}

.author:hover .author-avatar {
  border-color: var(--color-primary);
}

.author-info h4 {
  font-size: var(--font-size-sm);
  color: var(--color-gray-100);
  margin-bottom: 2px;
  font-weight: var(--font-weight-medium);
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
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-gray-400);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
}

.footer-links a:hover {
  color: var(--color-gray-100);
  background-color: var(--color-gray-800);
}

.footer-links .material-symbols-outlined {
  font-size: var(--font-size-lg);
}

.repositories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.repository-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  color: var(--color-gray-400);
  text-decoration: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  background-color: var(--color-gray-800);
  transition: all var(--transition-normal);
}

.repository-link:hover {
  color: var(--color-gray-100);
  background-color: var(--color-gray-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.repository-link i {
  font-size: var(--font-size-lg);
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