<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Rive, Fit, Alignment } from '@rive-app/canvas';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 600,
    },
  },
  // setup(props) {
  //   const canvas = ref(null);
  //   let riveInstance = null;
  //
  //   onMounted(() => {
  //     if (canvas.value) {
  //       // Инициализация Rive
  //       riveInstance = new Rive({
  //         src: props.src, // Путь к .riv файлу
  //         canvas: canvas.value,
  //         autoplay: true,
  //         fit: Fit.Cover,
  //         alignment: Alignment.Center,
  //         onLoad: () => {
  //           console.log('Анимация загружена!');
  //         },
  //         onError: (error) => {
  //           console.error('Ошибка загрузки анимации:', error);
  //         },
  //       });
  //     }
  //   });
  //
  //   onUnmounted(() => {
  //     // Очистка при уничтожении компонента
  //     if (riveInstance) {
  //       riveInstance.stop();
  //       //riveInstance.unload();
  //     }
  //   });
  //
  //   return {
  //     canvas,
  //   };
  // },
};
</script>

<style scoped>

</style>