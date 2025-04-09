<template>
  <canvas
      ref="canvas"
      :style="`width: ${width}px; height: ${height}px`"
  ></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Rive, Fit, Alignment, Layout } from '@rive-app/canvas';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    stateMachines: {
      type: [String, Array],
      default: () => [],
    }
  },
  setup(props) {
    const canvas = ref(null);
    let riveInstance = null;

    onMounted(() => {
      if (canvas.value) {
        // Инициализация Rive
        riveInstance = new Rive({
          src: process.env.NODE_ENV === 'production' ? `/ITMO_Note/${props.src}` : props.src, // Путь к .riv файлу
          canvas: canvas.value,
          autoplay: props.autoplay, // Исправлено: используем props вместо this
          stateMachines: props.stateMachines, // Исправлено: используем props вместо this
          layout: new Layout({
            fit: Fit.ScaleDown,
            alignment: Alignment.Center,
            // layoutScaleFactor: 2, // 2x scale of the layout, when using `Fit.Layout`. This allows you to resize the layout as needed.
          }),
          onLoad: () => {
            riveInstance.resizeDrawingSurfaceToCanvas();
          },
          onError: (error) => {
            console.error('Rive error: ', error);
          },
        });
      }
    });

    onUnmounted(() => {
      // Очистка при уничтожении компонента
      if (riveInstance) {
        riveInstance.stop();
        riveInstance.cleanup(); // Добавлено: правильный метод для очистки
      }
    });

    return {
      canvas,
    };
  },
};
</script>

<style scoped>
canvas {
  display: block; /* Добавлено: чтобы избежать лишних отступов */
}
</style>