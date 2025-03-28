<template>
  <div class="container">
    <template v-if="loading">
      <div class="loading">Loading note...</div>
    </template>
    <template v-else-if="note">
      <h1><code>File_name.md &#171;{{ note.title }}&#187;</code></h1>
      <div class="markdown-content" v-html="compiledMarkdown"></div>
      <div class="note-meta">
        <span class="category">Category: {{ note.category }}</span>
        <span class="date">Last updated: {{ formattedDate }}</span>
      </div>
    </template>
    <template v-else>
      <div class="error">Note not found</div>
    </template>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      markdownContent: '',
      markedInstance: null
    }
  },
  computed: {
    note() {
      return this.$store.getters.currentNote;
    },
    compiledMarkdown() {
      if (!this.markdownContent || !this.markedInstance) return '';
      return this.markedInstance.parse(this.markdownContent);
    },
    formattedDate() {
      return this.note ? new Date(this.note.date).toLocaleString() : '';
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.fetchNoteData();
      }
    }
  },
  async created() {
    // Настройка marked
    this.markedInstance = marked;
    this.markedInstance.setOptions({
      sanitize: true, // Безопасный рендеринг
      breaks: true,  // Переносы строк как <br>
      gfm: true      // GitHub Flavored Markdown
    });
  },
  methods: {
    async fetchNoteData() {
      this.loading = true;
      try {
        // 1. Загружаем метаданные заметки
        await this.$store.dispatch('fetchNoteById', this.id);

        // 2. Если заметка найдена, загружаем содержимое MD файла
        if (this.note) {
          const response = await fetch(this.note.file);
          if (response.ok) {
            this.markdownContent = await response.text();
          } else {
            console.error('Failed to load markdown content');
            this.markdownContent = '# Error loading content\nCould not load the markdown file.';
          }
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        this.markdownContent = '# Error\nFailed to load note data.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
}

h1 {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #d63384;
}

.markdown-content {
  margin-bottom: 2rem;
}

.note-meta {
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.error {
  color: #dc3545;
}
</style>