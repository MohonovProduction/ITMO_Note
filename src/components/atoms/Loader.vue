<script>
import RiveAnimation from "@/components/atoms/RiveAnimation.vue";

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
    <RiveAnimation
        src="/assets/animations/loader.riv"
        :width="205"
        :height="205"
        :autoplay="true"
    />
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-primary);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity var(--transition-normal);
}

.loader.fade-enter-active,
.loader.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.loader.fade-enter-from,
.loader.fade-leave-to {
  opacity: 0;
}
</style>