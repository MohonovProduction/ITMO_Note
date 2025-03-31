<template>
  <div class="generator-container">
    <Notification ref="notification" />
    <h1>Отправка конспектов</h1>

    <div class="upload-section">
      <!-- Drag and Drop область -->
      <div
          class="drop-area"
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="handleDrop"
          :class="{ 'drag-over': dragOver }"
      >
        <div class="drop-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="var(--color-primary)"/>
          </svg>
          <p>Перетащите файлы сюда или кликните для выбора</p>
          <input
              type="file"
              id="file-input"
              @change="handleFileSelect"
              multiple
              accept=".md,.markdown,.txt"
              style="display: none"
          >
          <button @click="triggerFileInput" class="select-button">Выбрать файлы</button>
        </div>
      </div>

      <div class="selected-files" v-if="selectedFiles.length > 0">
        <h3>Выбранные файлы:</h3>
        <ul>
          <li v-for="(file, index) in selectedFiles" :key="index">
            {{ file.name }}
            <button @click="removeFile(index)" class="remove-file-btn">×</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Форма для ввода данных -->
    <div class="input-group">
      <div class="input-section">
        <label for="title">Название:</label>
        <input
            id="title"
            v-model="noteData.title"
            placeholder="Например: Motion_design"
            :class="['input-field', { 'error': errors.title }]"
            @input="saveToLocalStorage"
        />
      </div>
      <div class="input-section">
        <label for="category">Категория:</label>
        <input
            id="category"
            v-model="noteData.category"
            placeholder="Например: Motion Design"
            :class="['input-field', { 'error': errors.category }]"
            @input="saveToLocalStorage"
        />
      </div>
    </div>

    <!-- Textarea для ввода Markdown -->
    <div class="markdown-section">
      <label for="markdown-content">Контент (Markdown):</label>
      <textarea
          id="markdown-content"
          v-model="noteData.content"
          placeholder="Введите текст в формате Markdown"
          :class="['markdown-input', { 'error': errors.content }]"
          @input="saveToLocalStorage"
      ></textarea>
    </div>

    <!-- Кнопки действий -->
    <div class="action-buttons">
      <button @click="submitNote" class="submit-button" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Отправить на сервер</span>
        <span v-else>Отправка...</span>
      </button>
      <button @click="clearForm" class="clear-button">Очистить форму</button>
    </div>

    <div class="status-message" v-if="statusMessage">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import notesApi from '@/api/notes';
import axios from "axios";

export default {

  name: 'GeneratorView',
  components: {
    Notification,
  },
  data() {
    return {
      dragOver: false,
      selectedFiles: [],
      isSubmitting: false,
      statusMessage: '',
      noteData: {
        title: '',
        category: '',
        content: '',
      },
      errors: {
        title: false,
        category: false,
        content: false,
      }
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    triggerFileInput() {
      document.getElementById('file-input').click();
    },
    handleFileSelect(event) {
      this.addFiles(Array.from(event.target.files));
      event.target.value = ''; // Сбрасываем значение input
    },
    handleDrop(event) {
      this.dragOver = false;
      this.addFiles(Array.from(event.dataTransfer.files));
    },
    addFiles(files) {
      const validFiles = files.filter(file =>
          file.type === 'text/markdown' ||
          file.type === 'text/plain' ||
          file.name.endsWith('.md') ||
          file.name.endsWith('.markdown')
      );

      if (validFiles.length === 0) {
        this.$refs.notification.addNotification('Пожалуйста, выберите файлы Markdown (.md, .markdown)', 'error');
        return;
      }

      // Читаем содержимое файлов
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.noteData.content += e.target.result + '\n\n';
          this.saveToLocalStorage();
        };
        reader.readAsText(file);
      });

      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    async submitNote() {
      // Валидация
      this.resetErrors();
      let hasError = false;

      if (!this.noteData.title.trim()) {
        this.errors.title = true;
        hasError = true;
      }

      if (!this.noteData.category.trim()) {
        this.errors.category = true;
        hasError = true;
      }

      if (!this.extractFirstParagraphPreview(this.noteData.content).trim() && this.selectedFiles.length === 0) {
        this.errors.content = true;
        hasError = true;
      }

      if (hasError) {
        this.$refs.notification.addNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
      }

      this.isSubmitting = true;
      this.statusMessage = '';

      // Подготовка данных для отправки
      const params = {
        title: this.noteData.title,
        category: this.noteData.category,
        description: this.extractFirstParagraphPreview(this.noteData.content)
      };

      let bodyContent = '';

      // Обработка файлов (если они есть)
      if (this.selectedFiles.length > 0) {
        try {
          // Читаем содержимое всех файлов и объединяем в одну строку
          const fileContents = await this.readFileAsText(this.selectedFiles)
          bodyContent = fileContents.join('\n\n');
        } catch (error) {
          console.error('Ошибка чтения файлов:', error);
          this.$refs.notification.addNotification('Ошибка при чтении файлов', 'error');
          return;
        }
      } else {
        // Используем текст из textarea, если файлов нет
        bodyContent = this.noteData.content;
      }

      // Отправка на сервер
      try {
        const response = await notesApi.create(bodyContent, { params });

        this.statusMessage = 'Конспект успешно отправлен на сервер!';
        this.$refs.notification.addNotification('Конспект успешно отправлен', 'success');
        this.clearForm();
        console.log('Ответ сервера:', response.data);
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        this.statusMessage = 'Ошибка при отправке конспекта';
        this.$refs.notification.addNotification('Ошибка при отправке конспекта', 'error');
      } finally {
        this.isSubmitting = false;
      }
    },
    clearForm() {
      this.noteData = {
        title: '',
        category: '',
        content: '',
      };
      this.selectedFiles = [];
      this.resetErrors();
      localStorage.removeItem('generatorFormData');
      this.statusMessage = '';
    },
    saveToLocalStorage() {
      localStorage.setItem('generatorFormData', JSON.stringify(this.noteData));
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem('generatorFormData');
      if (savedData) {
        this.noteData = JSON.parse(savedData);
      }
    },
    resetErrors() {
      this.errors = {
        title: false,
        category: false,
        content: false,
      };
    },
    extractFirstParagraphPreview(text) {
      const plainText = text
          .replace(/^#+\s+.+$/gm, '')
          .replace(/^\s*[-*]\s+.+$/gm, '')
          .replace(/^\s*\d+\.\s+.+$/gm, '')
          .replace(/`{3}[\s\S]*?`{3}/g, '')
          .replace(/`[^`]+`/g, '')
          .replace(/\s+/g, ' ')
          .trim();

      const firstParagraph = plainText.split('\n\n')[0] || plainText;
      return firstParagraph.length > 100
          ? firstParagraph.slice(0, 100).trim() + '...'
          : firstParagraph;
    },
    async readFileAsText(files) {
      // Обещаем, что преобразуем все файлы в текст
      const fileReadPromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);

          reader.readAsText(file); // Читаем файл как текст
        });
      });

      try {
        // Ждем, пока все файлы будут прочитаны
        const fileContents = await Promise.all(fileReadPromises);
        // Объединяем содержимое файлов через два переноса строки
        return fileContents.join('\n\n');
      } catch (error) {
        console.error('Ошибка чтения файлов:', error);
        throw new Error('Не удалось прочитать файлы');
      }
    }
  }
};
</script>

<style scoped>
.generator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(--font-family);
}

h1 {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.upload-section {
  margin-bottom: 2rem;
}

.drop-area {
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.drop-area.drag-over {
  border-color: var(--color-primary);
  background-color: rgba(77, 107, 254, 0.05);
}

.drop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.drop-content p {
  margin: 0;
  color: #555;
}

.select-button {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background-color: var(--color-link-hover);
}

.selected-files {
  margin-top: 1rem;
}

.selected-files h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #555;
}

.selected-files ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selected-files li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #f44336;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
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
  color: var(--color-text);
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: var(--color-primary);
  outline: none;
}

.markdown-section {
  margin-bottom: 1.5rem;
}

.markdown-input {
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-family);
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.markdown-input:focus {
  border-color: var(--color-primary);
  outline: none;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.submit-button, .clear-button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  background-color: var(--color-primary);
  color: white;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-link-hover);
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.clear-button {
  background-color: #f5f5f5;
  color: #555;
}

.clear-button:hover {
  background-color: #e0e0e0;
}

.status-message {
  padding: 1rem;
  border-radius: 4px;
  background-color: #f5f7fa;
  text-align: center;
  color: #555;
}

.error {
  border-color: #f44336 !important;
  background-color: #ffebee;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  .input-section {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .generator-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.75rem;
  }
}
</style>