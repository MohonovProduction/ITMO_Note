<template>
  <div class="about">
    <div class="container">
      <!-- Заголовок -->
      <header class="header">
        <h1>ITMO Notes</h1>
        <p class="subtitle">Платформа для создания и хранения учебных конспектов</p>
      </header>

      <!-- Основное описание -->
      <section class="description">
        <p>
          ITMO Notes - это современное веб-приложение для создания, хранения и форматирования учебных конспектов.
          Платформа предоставляет удобный интерфейс для работы с текстом, автоматическое форматирование
          и интеграцию с Telegram для авторизации пользователей.
        </p>
      </section>

      <!-- GitHub виджет -->
      <section class="github-section">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=MohonovProduction&repo=ITMO_Note&type=star&count=true&size=large"
          frameborder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      </section>

      <!-- Основные возможности -->
      <section class="features">
        <h2>Основные возможности</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>Умное форматирование</h3>
            <p>Автоматическое форматирование текста с помощью AI для лучшей читаемости</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>Telegram авторизация</h3>
            <p>Безопасный вход через Telegram без необходимости запоминать пароль</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Адаптивный дизайн</h3>
            <p>Оптимизированный интерфейс для всех устройств</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Быстрая работа</h3>
            <p>Оптимизированная производительность и мгновенное сохранение</p>
          </div>
        </div>
      </section>

      <!-- Технологии -->
      <section class="technologies">
        <h2>Используемые технологии</h2>
        <div class="tech-grid">
          <div class="tech-card">
            <h3>Frontend</h3>
            <ul>
              <li>Vue.js 3 - основной фреймворк</li>
              <li>Vue Router - маршрутизация</li>
              <li>Vuex - управление состоянием</li>
              <li>Vue 3 Composition API</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <div class="tech-card">
            <h3>UI/UX</h3>
            <ul>
              <li>CSS Variables</li>
              <li>Flexbox & Grid</li>
              <li>Responsive Design</li>
              <li>Custom Components</li>
            </ul>
          </div>
          <div class="tech-card">
            <h3>Интеграции</h3>
            <ul>
              <li>Telegram Auth Widget</li>
              <li>Marked.js</li>
              <li>Rive Animations</li>
              <li>GitHub API</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Авторы -->
      <section class="authors">
        <h2>Авторы проекта</h2>
        <div class="authors-grid">
          <div class="author-card">
            <img src="@/assets/images/mohonov.jpg" alt="Михаил Мохонов" class="author-avatar">
            <h3>Михаил Мохонов</h3>
            <p>Frontend Developer</p>
            <div class="author-links">
              <a href="https://t.me/mohonovschannel" target="_blank" class="telegram-link">
                <i class="fab fa-telegram"></i> Telegram
              </a>
              <a href="https://github.com/MohonovProduction" target="_blank" class="github-link">
                <i class="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
          <div class="author-card">
            <img src="@/assets/images/tor4narek.jpg" alt="Тор4нарек" class="author-avatar">
            <h3>Тор4нарек</h3>
            <p>Backend Developer</p>
            <div class="author-links">
              <a href="https://t.me/tor4narek" target="_blank" class="telegram-link">
                <i class="fab fa-telegram"></i> Telegram
              </a>
              <a href="https://github.com/tor4narek" target="_blank" class="github-link">
                <i class="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Лицензия -->
      <section class="license">
        <h2>Лицензия</h2>
        <p>Этот проект распространяется под лицензией MIT. Подробности см. в файле <a href="https://github.com/MohonovProduction/ITMO_Note/blob/main/LICENSE" target="_blank">LICENSE</a>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: var(--spacing-6);
  background-color: var(--color-background);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

h1 {
  font-size: var(--font-size-4xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
}

.description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-8);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--color-gray-700);
}

.github-section {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.features {
  margin-bottom: var(--spacing-8);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
}

.feature-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-4);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
}

.tech-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.tech-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.tech-card ul {
  list-style: none;
  padding: 0;
}

.tech-card li {
  margin-bottom: var(--spacing-2);
  padding-left: var(--spacing-4);
  position: relative;
}

.tech-card li::before {
  content: "•";
  color: var(--color-primary);
  position: absolute;
  left: 0;
}

.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
}

.author-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: var(--spacing-4);
  object-fit: cover;
}

.author-links {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  margin-top: var(--spacing-4);
}

.author-links a {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.telegram-link {
  background-color: var(--color-primary);
  color: white;
}

.github-link {
  background-color: var(--color-gray-800);
  color: white;
}

.license {
  text-align: center;
  margin-top: var(--spacing-8);
  padding: var(--spacing-6);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .about {
    padding: var(--spacing-4);
  }

  h1 {
    font-size: var(--font-size-3xl);
  }

  .subtitle {
    font-size: var(--font-size-lg);
  }

  .description {
    font-size: var(--font-size-base);
  }

  .features-grid,
  .tech-grid,
  .authors-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about {
    padding: var(--spacing-3);
  }

  h1 {
    font-size: var(--font-size-2xl);
  }

  .feature-card,
  .tech-card,
  .author-card {
    padding: var(--spacing-4);
  }

  .author-links {
    flex-direction: column;
  }
}
</style>

<script setup lang="ts">
</script>