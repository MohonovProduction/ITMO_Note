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
    <h1>{{ note.title }}</h1>
    <div v-html="content"></div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 5rem;
}
</style>