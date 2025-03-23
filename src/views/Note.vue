<script>
import marked from 'marked';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    note() {
      return this.$store.getters.allNotes.find(note => note.id === this.id);
    },
  },
  async created() {
    marked = await import('marked')
    console.log(marked)
    this.content = marked.parse(this.note.content);
  },
  data() {
    return {
      content: null,
    }
  }
};
</script>

<template>
  <div class="container">
    <h1><code>File_name.md &#171;{{ note.title }}&#187;</code></h1>
    <div v-html="content"></div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
}

h1 {
  font-size: 0.8rem;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #d63384;
}
</style>