<script>
import Notification from '@/components/Notification.vue';

export default {
  name: 'GeneratorView',
  components: {
    Notification,
  },
  data() {
    return {
      inputText: '', // Введённый текст
      baseFileName: '', // Базовое название файлов
      startFileNumber: 0,
      category: '',
      code: 'Здесь будет код для вставки в markdown/index.js',
      errors: {
        inputText: false,
        baseFileName: false,
        startFileNumber: false,
        category: false,
      },
    };
  },
  methods: {
    saveFiles() {
      // Сбрасываем ошибки
      this.resetErrors();

      // Проверка наличия текста Markdown
      if (this.inputText.trim() === '') {
        this.errors.inputText = true;
        this.$refs.notification.addNotification('Добавьте текст в формате Markdown', 'error');
        return;
      }

      // Проверка названия файлов
      if (this.baseFileName.trim() === '') {
        this.errors.baseFileName = true;
        this.$refs.notification.addNotification('Введите название файлов', 'error');
        return;
      }

      // Проверка номера файла
      if (this.startFileNumber === null || this.startFileNumber === '') {
        this.errors.startFileNumber = true;
        this.$refs.notification.addNotification('Введите начальный номер файла', 'error');
        return;
      }

      // Проверка категории
      if (this.category.trim() === '') {
        this.errors.category = true;
        this.$refs.notification.addNotification('Введите категорию', 'error');
        return;
      }

      // Разделяем текст по символу //end
      const parts = this.inputText.split('//end').filter(part => part.trim());

      // Очищаем переменную для кода
      this.code = '';

      // Сохраняем каждый кусок как отдельный файл
      parts.forEach((part, index) => {
        const fileName = `${this.baseFileName}_${this.startFileNumber + index}.md`;
        this.saveFile(fileName, part.trim());

        // Извлекаем заголовок первого уровня
        const heading = this.extractFirstLevelHeading(part);

        // Формируем JSON-структуру
        this.code += index === 0 ? '\n' : ',\n'; // Добавляем запятую перед каждым объектом, кроме первого
        this.code += `  {
    "id": "${fileName}",
    "title": "${heading || fileName}",
    "description": "${this.extractFirstParagraphPreview(part)}",
    "file": "${fileName}",
    "category": "${this.category}"
  }`;
      });


      // Уведомление об успешном сохранении
      this.$refs.notification.addNotification('Файлы успешно сохранены!', 'success');
    },

    saveFile(fileName, content) {
      // Создаём Blob с содержимым
      const blob = new Blob([content], { type: 'text/markdown' });

      // Создаём ссылку для скачивания
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Программно нажимаем на ссылку
      link.click();

      // Освобождаем память
      URL.revokeObjectURL(link.href);
    },

    extractFirstLevelHeading(markdownText) {
      const headingRegex = /^#\s+(.+)$/m;

      const match = markdownText.match(headingRegex);

      if (match && match[1]) {
        return match[1].trim(); // Убираем лишние пробелы
      }

      return '';
    },

    extractFirstParagraphPreview(markdownText) {
      // Убираем заголовки, списки и другие элементы Markdown
      const plainText = markdownText
          .replace(/^#+\s+.+$/gm, '') // Убираем заголовки
          .replace(/^\s*[-*]\s+.+$/gm, '') // Убираем маркированные списки
          .replace(/^\s*\d+\.\s+.+$/gm, '') // Убираем нумерованные списки
          .replace(/`{3}[\s\S]*?`{3}/g, '') // Убираем блоки кода
          .replace(/`[^`]+`/g, '') // Убираем встроенный код
          .replace(/\s+/g, ' ') // Убираем лишние пробелы
          .trim();

      // Находим первый абзац
      const firstParagraph = plainText.split('\n\n')[0] || plainText;

      // Обрезаем до 100 символов и добавляем троеточие, если текст длиннее
      return firstParagraph.length > 100
          ? firstParagraph.slice(0, 100).trim() + '...'
          : firstParagraph;
    },
    copyToClipboard() {
      // Создаём временный textarea для копирования
      const textarea = document.createElement('textarea');
      textarea.value = this.code;
      textarea.setAttribute('readonly', ''); // Делаем textarea недоступной для редактирования
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px'; // Выносим за пределы экрана
      document.body.appendChild(textarea);

      // Выделяем текст в textarea
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length); // Для мобильных устройств

      // Копируем текст
      try {
        const success = document.execCommand('copy');
        if (success) {
          console.log('Текст скопирован в буфер обмена:', this.code);
          this.$refs.notification.addNotification('Текст скопирован в буфер обмена', 'success');
        } else {
          throw new Error('Не удалось скопировать текст');
        }
      } catch (err) {
        console.error('Не удалось скопировать текст:', err);
        this.$refs.notification.addNotification('Не удалось скопировать текст\n' + err, 'error');
      } finally {
        // Удаляем textarea
        document.body.removeChild(textarea);
      }
    },

  },

    // Сброс ошибок
    resetErrors() {
      this.errors = {
        inputText: false,
        baseFileName: false,
        startFileNumber: false,
        category: false,
      };
    },

    // Остальные методы (saveFile, extractFirstLevelHeading, extractFirstParagraphPreview, copyToClipboard) остаются без изменений
  },
};
</script>

<template>
  <div>
    <Notification ref="notification" />
    <div class="editor">
      <h1>Онлайн редактор Markdown</h1>
      <div class="editor-container">
        <!-- Секция ввода данных -->
        <div class="input-group">
          <div class="input-section">
            <label for="base-name">Название файлов:</label>
            <input
                id="base-name"
                v-model="baseFileName"
                placeholder="Motion_design"
                :class="['input-field', { 'error': errors.baseFileName }]"
            />
          </div>
          <div class="input-section">
            <label for="start-file-number">Первый номер файла:</label>
            <input
                type="number"
                id="start-file-number"
                v-model="startFileNumber"
                placeholder="4"
                :class="['input-field', { 'error': errors.startFileNumber }]"
            />
          </div>
          <div class="input-section">
            <label for="category">Категория:</label>
            <input
                id="category"
                v-model="category"
                placeholder="Motion Design"
                :class="['input-field', { 'error': errors.category }]"
            />
          </div>
        </div>

        <!-- Пример имени файла -->
        <p class="file-name-example">
          Пример имени файла: <code>{{`${baseFileName}_${startFileNumber}.md`}}</code>
        </p>

        <!-- Текстовое поле для ввода Markdown -->
        <textarea
            v-model="inputText"
            placeholder="Введите текст в формате Markdown, разделяя части с помощью //end"
            :class="['markdown-input', { 'error': errors.inputText }]"
        ></textarea>

        <!-- Кнопка сохранения файлов -->
        <button @click="saveFiles" class="save-button">Сохранить файлы</button>

        <!-- Секция с примером кода -->
        <div class="code-section">
          <div class="code-header">
            <p>JavaScript</p>
            <button @click="copyToClipboard" class="copy-button">Скопировать код</button>
          </div>
          <pre class="code-block">{{ code }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2rem;
  color: #4d6bfe;
  margin-bottom: 1.5rem;
}

.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-section {
  flex: 1;
  min-width: 200px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4d6bfe;
  outline: none;
}

.file-name-example {
  margin: 1.5rem 0;
  font-size: 0.9rem;
  color: #555;
}

.file-name-example code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #d63384;
}

.markdown-input {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.markdown-input:focus {
  border-color: #4d6bfe;
  outline: none;
}

.save-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4d6bfe;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #3a5bff;
}

.code-section {
  margin-top: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.code-header p {
  margin: 0;
  font-weight: bold;
  color: #333;
}

.copy-button {
  padding: 0.5rem 1rem;
  background-color: #4d6bfe;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.copy-button:hover {
  background-color: #3a5bff;
}

.code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  .input-section {
    width: 100%;
  }
}

.error {
  border-color: #f44336 !important; /* Красная граница */
  background-color: #ffebee; /* Светло-красный фон */
  transition: border-color 0.3s ease;
}
</style>