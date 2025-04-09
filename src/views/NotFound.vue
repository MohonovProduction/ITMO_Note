<script>
import StateView from '@/components/molecules/StateView.vue'

export default {
  name: 'NotFound',
  components: {
    StateView
  }
}
</script>

<template>
  <StateView
    title="Страница не найдена"
    message="Мы пока сами не знаем, то ли мы что-то забыли, то ли так и должно быть"
    animation-src="/assets/animations/loader_2.riv"
  />
</template>

<style scoped>

</style>