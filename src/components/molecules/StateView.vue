<template>
  <div class="state-view">
    <div class="state-content">
      <div class="state-animation">
        <RiveAnimation
          :src="animationSrc"
          :width="animationSize"
          :height="animationSize"
          state-machines="State Machine 1"
        />
      </div>
      <div class="state-message">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RiveAnimation from '@/components/atoms/RiveAnimation.vue'

export default {
  name: 'StateView',
  components: {
    RiveAnimation
  },
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    animationSrc: {
      type: String,
      required: true
    }
  },
  computed: {
    animationSize() {
      return window.innerWidth < 768 ? 300 : 400
    },
  }
}
</script>

<style scoped>
.state-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  text-align: center;
}

.state-animation {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.state-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.state-message h2 {
  font-size: 1.5rem;
  color: var(--text-primary, #2c3e50);
  margin: 0;
}

.state-message p {
  font-size: 1rem;
  color: var(--text-secondary, #666);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .state-view {
    min-height: 50vh;
    padding: 1rem;
  }

  .state-content {
    gap: 1.5rem;
  }

  .state-message h2 {
    font-size: 1.25rem;
  }

  .state-message p {
    font-size: 0.9rem;
  }
}
</style> 