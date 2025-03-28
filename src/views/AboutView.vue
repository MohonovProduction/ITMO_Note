<template>
  <div class="about">
    <div class="home">
      <div class="container">
        <h1>ITMO Notes</h1>
        <p>
          Это веб-приложение для создания и хранения конспектов, написанных в формате Markdown.
          Оно позволяет легко организовывать учебные материалы, автоматически генерирует оглавление
          и поддерживает адаптивный дизайн для удобного использования на любых устройствах.
        </p>

        <h2>Особенности</h2>
        <ul>
          <li>📝 <strong>Поддержка Markdown</strong>: Конспекты пишутся в Markdown и отображаются в виде чистого HTML.</li>
          <li>📚 <strong>Автоматическое оглавление</strong>: Оглавление генерируется автоматически на основе заголовков.</li>
          <li>🎨 <strong>Светлая тема</strong>: Чистый и минималистичный дизайн для комфортного чтения.</li>
          <li>📱 <strong>Адаптивность</strong>: Оптимизировано для работы на компьютерах, планшетах и смартфонах.</li>
          <li>🚀 <strong>Простое развертывание</strong>: Готово к публикации на GitHub Pages или любом другом хостинге.</li>
        </ul>

        <h2>Технологии</h2>
        <ul>
          <li><strong>Vue.js</strong>: Основной фреймворк для создания приложения.</li>
          <li><strong>Vuex</strong>: Управление состоянием приложения.</li>
          <li><strong>Vue Router</strong>: Навигация между страницами.</li>
          <li><strong>Marked.js</strong>: Преобразование Markdown в HTML.</li>
          <li><strong>CSS-переменные</strong>: Гибкая настройка стилей.</li>
        </ul>

        <h2>Как это работает</h2>
        <ol>
          <li>Конспекты хранятся в виде Markdown-файлов в папке <code>src/markdown/</code>.</li>
          <li>Приложение динамически загружает и отображает эти файлы как отдельные страницы.</li>
          <li>Оглавление генерируется автоматически на основе доступных конспектов.</li>
          <li>Пользователи могут переходить между конспектами через боковое меню или прямые ссылки.</li>
        </ol>

        <h2>Установка и запуск</h2>
        <ol>
          <li>Клонируйте репозиторий:
            <pre><code>git clone https://github.com/ваш-username/study-notes-app.git</code></pre>
          </li>
          <li>Установите зависимости:
            <pre><code>npm install</code></pre>
          </li>
          <li>Запустите сервер для разработки:
            <pre><code>npm run serve</code></pre>
          </li>
          <li>Соберите проект для production:
            <pre><code>npm run build</code></pre>
          </li>
          <li>Опубликуйте на GitHub Pages:
            <pre><code>npm run deploy</code></pre>
          </li>
        </ol>

        <h2>Настройка</h2>
        <ul>
          <li>Добавьте свои конспекты в папку <code>src/markdown/</code>.</li>
          <li>Обновите файл <code>index.json</code>, чтобы добавить метаданные для каждого конспекта.</li>
          <li>Настройте тему, изменив CSS-переменные в <code>src/styles/main.css</code>.</li>
        </ul>

        <h2>Демо</h2>
        <p>
          Посмотрите живой пример на GitHub Pages:
          <a href="https://mohonovproduction.github.io/ITMO_note/" target="_blank">Конспекты</a>.
        </p>

        <h2>Лицензия</h2>
        <p>Этот проект распространяется под лицензией MIT. Подробности см. в файле <code>LICENSE</code>.</p>

        <h2>Автор</h2>
        <p>
          Разработано с ❤️ Михаилом Мохоновым.
          <br>
          Подписывайтесь на мой Telegram-канал:
          <a href="https://t.me/mohonovschannel" target="_blank">@mohonovschannel</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.home {
  max-width: 800px;
  margin: 0 auto;
}

.container {
  padding: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #4d6bfe;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 2rem;
  color: #4d6bfe;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

ul, ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #d63384;
}

pre {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
}

pre code {
  background: inherit;
  color: inherit;
}

a {
  color: #4d6bfe;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #3a5bff;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  p, li {
    font-size: 1rem;
  }
}
</style>

<script setup lang="ts">
</script>