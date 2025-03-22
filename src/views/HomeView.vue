<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <ul>
      <li v-for="note in notes">
        <router-link :to="`/note/${note.id}`"> {{ note.title }} </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NoteMeta from '@/markdown/index.json'


export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    notes() {
      return this.$store.getters.allNotes;
    }
  }
}
</script>
