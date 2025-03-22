<template>
  <div class="notes-list">
    <h1>Список конспектов</h1>
    <ul>
      <li v-for="note in notes" :key="note.id">
          <router-link class="card" :to="`/note/${note.id}`">
            <h2>{{ note.title }}</h2>
            <p>{{ note.description }}</p>
          </router-link>
      </li>
    </ul>
  </div>
</template>

<style>
.notes-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #4d6bfe;
  margin-bottom: 1.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

.card {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4d6bfe;
  text-decoration: none;
  transition: color 0.3s ease;
}

p {
  margin-top: 0.5rem;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}
</style>

<script>
export default {
  name: 'HomeView',
  computed: {
    notes() {
      return this.$store.getters.allNotes;
    }
  }
}
</script>
