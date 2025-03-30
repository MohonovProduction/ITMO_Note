<script>
import RiveAnimation from "@/components/RiveAnimation.vue";

export default {
  name: 'Loader',
  components: {RiveAnimation},
  props: {
    show: Boolean,
  }
}
</script>

<template>
  <div class="loader">
    <RiveAnimation src="./loader.riv" :width="206" :height="206" />
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #4d6bfe;

  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>