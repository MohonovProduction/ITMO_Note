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

      <!-- Основные возможности -->
      <section class="features">
        <h2>Основные возможности</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">wand_stars</span>
            </div>
            <h3>Умное форматирование</h3>
            <p>Автоматическое форматирование текста с помощью AI для лучшей читаемости</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">security</span>
            </div>
            <h3>Telegram авторизация</h3>
            <p>Безопасный вход через Telegram без необходимости запоминать пароль</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">devices</span>
            </div>
            <h3>Адаптивный дизайн</h3>
            <p>Оптимизированный интерфейс для всех устройств</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">bolt</span>
            </div>
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
            <div class="tech-icon">
              <span class="material-symbols-outlined">web</span>
            </div>
            <h3>Frontend</h3>
            <ul>
              <li>Vue.js 3 - основной фреймворк</li>
              <li>Vue Router - маршрутизация</li>
              <li>Vuex - управление состоянием</li>
              <li>Vue 3 Composition API</li>
              <li>Rive Animations</li>
            </ul>
          </div>
          <div class="tech-card">
            <div class="tech-icon">
              <span class="material-symbols-outlined">storage</span>
            </div>
            <h3>Backend</h3>
            <ul>
              <li>C# - основной язык программирования</li>
              <li>.NET Core - платформа разработки</li>
              <li>Docker - контейнеризация</li>
              <li>GitHub Actions - CI/CD</li>
              <li>REST API - архитектура</li>
            </ul>
          </div>
          <div class="tech-card">
            <div class="tech-icon">
              <span class="material-symbols-outlined">design_services</span>
            </div>
            <h3>UI/UX</h3>
            <ul>
              <li>CSS Variables</li>
              <li>Flexbox & Grid</li>
              <li>Responsive Design</li>
              <li>Custom Components</li>
              <li>Transitions & Animations</li>
            </ul>
          </div>
          <div class="tech-card">
            <div class="tech-icon">
              <span class="material-symbols-outlined">api</span>
            </div>
            <h3>Интеграции</h3>
            <ul>
              <li>Telegram Auth API</li>
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
            <img src="@/assets/images/tor4narek.jpg" alt="Егор Кречетов" class="author-avatar">
            <h3>Егор Кречетов</h3>
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

      <!-- Репозитории -->
      <section class="repositories">
        <h2>Репозитории проекта</h2>
        <div class="repositories-grid">
          <div class="repository-card">
            <div class="repository-icon">
              <span class="material-symbols-outlined">code</span>
            </div>
            <h3>Frontend</h3>
            <p class="repository-description">Клиентская часть приложения на Vue.js 3</p>
            <div class="repository-widgets">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=MohonovProduction&repo=ITMO_Note&type=star&count=true&size=large"
                frameborder="0"
                scrolling="0"
                width="170"
                height="30"
                title="GitHub"
              ></iframe>
            </div>
            <a href="https://github.com/MohonovProduction/ITMO_Note" target="_blank" class="github-link">
              <i class="fab fa-github"></i> Перейти в репозиторий
            </a>
          </div>
          <div class="repository-card">
            <div class="repository-icon">
              <span class="material-symbols-outlined">settings</span>
            </div>
            <h3>Backend</h3>
            <p class="repository-description">Серверная часть приложения</p>
            <div class="repository-widgets">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=Tor4narek&repo=ItmoNoteApi&type=star&count=true&size=large"
                frameborder="0"
                scrolling="0"
                width="170"
                height="30"
                title="GitHub"
              ></iframe>
            </div>
            <a href="https://github.com/Tor4narek/ItmoNoteApi" target="_blank" class="github-link">
              <i class="fab fa-github"></i> Перейти в репозиторий
            </a>
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
  padding: var(--spacing-8);
  background-color: var(--color-background);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

h1 {
  font-size: var(--font-size-4xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-weight-bold);
}

h2 {
  text-align: center;
  color: var(--color-gray-800);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-8);
}

.subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  font-weight: var(--font-weight-medium);
}

.description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-12);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-base);
  color: var(--color-gray-700);
}

.github-section {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.features {
  margin-bottom: var(--spacing-12);
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
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-4);
  color: var(--color-primary);
}

.feature-icon .material-symbols-outlined {
  font-size: 2.5rem;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-12);
}

.tech-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow);
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-4);
  color: var(--color-primary);
  text-align: center;
}

.tech-icon .material-symbols-outlined {
  font-size: 2.5rem;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.tech-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.tech-card ul {
  list-style: none;
  padding: 0;
}

.tech-card li {
  margin-bottom: var(--spacing-2);
  padding-left: var(--spacing-4);
  position: relative;
  color: var(--color-gray-700);
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
  margin-bottom: var(--spacing-12);
}

.author-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: var(--spacing-4);
  object-fit: cover;
  border: 3px solid var(--color-primary-light);
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
  font-weight: var(--font-weight-medium);
}

.telegram-link {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.telegram-link:hover {
  background-color: var(--color-primary-hover);
}

.github-link {
  background-color: var(--color-gray-800);
  color: var(--color-white);
}

.github-link:hover {
  background-color: var(--color-gray-900);
}

.repositories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-6);
}

.repository-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.repository-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-semibold);
}

.repository-card .github-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  background-color: var(--color-gray-800);
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
}

.repository-card .github-link:hover {
  background-color: var(--color-gray-900);
  transform: scale(1.05);
}

.repository-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-4);
  color: var(--color-primary);
}

.repository-icon .material-symbols-outlined {
  font-size: 2.5rem;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.repository-description {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-base);
}

.repository-widgets {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.repository-widgets iframe {
  border: none;
  overflow: hidden;
}

.license {
  text-align: center;
  margin-top: var(--spacing-12);
  padding: var(--spacing-6);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow);
}

.license a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.license a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about {
    padding: var(--spacing-6);
  }
  
  .header {
    margin-bottom: var(--spacing-8);
  }
  
  .description {
    margin-bottom: var(--spacing-8);
  }
  
  .github-section {
    margin-bottom: var(--spacing-12);
  }
  
  .features {
    margin-bottom: var(--spacing-12);
  }
  
  .license {
    margin-top: var(--spacing-8);
  }

  h1 {
    font-size: var(--font-size-3xl);
  }

  .subtitle {
    font-size: var(--font-size-lg);
  }

  .features-grid,
  .tech-grid,
  .authors-grid {
    grid-template-columns: 1fr;
  }

  .repositories-grid {
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